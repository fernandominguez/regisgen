var app = angular.module("ngregisgen.registry-controllers", []);

app.controller("RegistryListCtrl", [
  "$rootScope",
  "$scope",
  "RegistryFactory",
  "RegistryScroll",
  "NoteFactory",
  "AppFactory",
  "ThirdpartiesFactory",
  "ThirdpartyFactory",
  "DepartmentsFactory",
  "DepartmentFactory",
  "Upload",
  "$location",
  "$window",
  "$timeout",
  function(
    $rootScope,
    $scope,
    RegistryFactory,
    RegistryScroll,
    NoteFactory,
    AppFactory,
    ThirdpartiesFactory,
    ThirdpartyFactory,
    DepartmentsFactory,
    DepartmentFactory,
    Upload,
    $location,
    $window,
    $timeout
  ) {
    $scope.scrollitems = 13;
    $scope.registry = new RegistryScroll($scope.scrollitems);
    $scope.menuCrude = $rootScope.menuCrude;
    $scope.channels = AppFactory.channels;
    $scope.tags = AppFactory.tags;
    $scope.states = AppFactory.states;
    $scope.allIdsSelected = false;
    $scope.anyIdsSelected = false;
    $scope.filteredItems = $scope.registry.length;
    $scope.totalItems = $scope.registry.length;
    $scope.newNote = function() {
      $scope.thirdparties = ThirdpartiesFactory.query({}, function(
        res,
        headers
      ) {
        $scope.departments = DepartmentsFactory.query({}, function(
          res,
          headers
        ) {
          loadSelect("#selectInOr", $scope.departments, {
            value: "id",
            option: "name"
          });
          loadSelect("#selectInDe", $scope.departments, {
            value: "id",
            option: "name"
          });
        });
        loadSelect("#selectExOr", $scope.thirdparties, {
          value: "id",
          option: "name"
        });
        loadSelect("#selectExDe", $scope.thirdparties, {
          value: "id",
          option: "name"
        });
      });
      loadSelect("#selectChannel", $scope.channels, {
        value: "value",
        option: "name",
        icon: "icon"
      });
      loadSelect("#selectTag", $scope.tags, {
        value: "value",
        option: "name",
        icon: "icon"
      });
      loadSelect(
        "#selectState",
        $scope.states,
        {
          value: "value",
          option: "name",
          icon: "icon"
        },
        "p"
      );
      $scope.note = {};
      $scope.note.state = "p";
      $scope.isNew = true;
      $scope.isView = false;
      $scope.isCreated = false;
      $scope.flashMessage = null;
      $scope.saving = null;
      $scope.noteForm.$setPristine();
      $scope.droppedFiles = false;
      $scope.files = [];
      $scope.tmpFiles = null;
      $scope.errFiles = null;
    };
    $scope.viewNote = function(noteId) {
      $scope.noteForm.$setPristine();
      $scope.note = NoteFactory.note.read(
        { id: noteId },
        function(res, headers) {
          var tmpFiles = NoteFactory.files.list(
            { id: noteId },
            function(res, headers) {
              $scope.tmpFiles = tmpFiles.data;
              loadSelect(
                "#selectChannel",
                $scope.channels,
                {
                  value: "value",
                  option: "name",
                  icon: "icon"
                },
                $scope.note.channel
              );
              loadSelect(
                "#selectTag",
                $scope.tags,
                {
                  value: "value",
                  option: "name",
                  icon: "icon"
                },
                $scope.note.tag
              );
              loadSelect(
                "#selectState",
                $scope.states,
                {
                  value: "value",
                  option: "name",
                  icon: "icon"
                },
                $scope.note.state
              );
              $scope.isNew = false;
              $scope.isView = true;
              $scope.isCreated = false;
              $scope.flashMessage = null;
              $scope.saving = null;
            },
            function(err) {
              $scope.flashMessage = err;
            }
          );
        },
        function(err) {
          $scope.flashMessage = err;
        }
      );
    };
    $scope.editNote = function(noteId) {
      $scope.noteForm.$setPristine();
      $scope.note = NoteFactory.note.read({ id: noteId }, function(
        res,
        headers
      ) {
        var tmpFiles = NoteFactory.files.list(
          { id: noteId },
          function(res, headers) {
            $scope.tmpFiles = tmpFiles.data;
            loadSelect(
              "#selectChannel",
              $scope.channels,
              {
                value: "value",
                option: "name",
                icon: "icon"
              },
              $scope.note.channel
            );
            loadSelect(
              "#selectTag",
              $scope.tags,
              {
                value: "value",
                option: "name",
                icon: "icon"
              },
              $scope.note.tag
            );
            loadSelect(
              "#selectState",
              $scope.states,
              {
                value: "value",
                option: "name",
                icon: "icon"
              },
              $scope.note.state
            );
            $scope.isNew = false;
            $scope.isView = false;
            $scope.isCreated = false;
            $scope.flashMessage = null;
            $scope.saving = null;
          },
          function(err) {
            $scope.flashMessage = err;
          }
        );
      });
    };
    $scope.addNote = function(valid) {
      if (valid) {
        if ($scope.note.exor) {
          $scope.note.origin = $scope.note.exor[0];
        }
        if ($scope.note.inor) {
          $scope.note.origin = $scope.note.inor[0];
        }
        if ($scope.note.exde) {
          $scope.note.destiny = $scope.note.exde[0];
        }
        if ($scope.note.inde) {
          $scope.note.destiny = $scope.note.inde[0];
        }
        var noteData = JSON.stringify($scope.note);
        $scope.saving = "Guardando ...";
        $scope.noteId = NoteFactory.note.create(
          { data: noteData },
          function(res, headers) {
            var filesData = JSON.stringify({
              id: $scope.noteId.insertId,
              files: $scope.files
            });
            NoteFactory.files.upload(
              {
                data: filesData
              },
              function(res, headers) {
                $scope.isCreated = true;
                $scope.saving = "¡¡ Anotación Creada !!";
                $scope.note = NoteFactory.note.read(
                  { id: $scope.noteId.insertId },
                  function(res, headers) {
                    $timeout(function() {
                      $scope.registry.refreshPage();
                      $scope.filteredItems = $scope.registry.length;
                      $scope.totalItems = $scope.registry.length;
                    }, 500);
                  }
                );
              },
              function(err) {
                $scope.saving = null;
                $scope.flashMessage = err.data.error.error;
              }
            );
          },
          function(err) {
            $scope.saving = null;
            $scope.flashMessage = err.data.error.error;
          }
        );
      }
    };
    $scope.updateNote = function(valid) {
      if (valid) {
        noteData = JSON.stringify($scope.note);
        $scope.saving = "Guardando ...";
        NoteFactory.note.update(
          { data: noteData },
          function(res, headers) {
            $scope.saving = "¡¡ Guardada !!";
            $timeout(function() {
              $("#noteModal").modal("hide");
              $scope.flashMessage = null;
              $scope.registry = RegistryFactory.query({}, function(
                res,
                headers
              ) {
                $scope.allIdsSelected = false;
                $scope.anyIdsSelected = false;
                $scope.filteredItems = $scope.registry.length;
                $scope.totalItems = $scope.registry.length;
                $("#selectPages").selectpicker("show");
              });
            }, 500);
          },
          function(err) {
            $scope.saving = null;
            $scope.flashMessage = err.data.error.error;
          }
        );
      }
    };
    $scope.newDepartment = function() {
      var wmodal = angular.element("#departmentModal");
      wmodal.css({ left: "1em", top: "-1em", width: "75%" });
      $scope.fromModal = true;
    };
    $scope.newThirdparty = function() {
      var wmodal = angular.element("#thirdpartyModal");
      wmodal.css({ left: "1em", top: "-1em", width: "75%" });
      $scope.fromModal = true;
    };
    $scope.addDepartment = function(valid) {
      if (valid) {
        departmentData = JSON.stringify($scope.department);
        $scope.modalSaving = "Guardando ...";
        DepartmentFactory.departments.create(
          { data: departmentData },
          function(res, headers) {
            $scope.modalSaving = "¡¡ Departamento Creado !!";
            $timeout(function() {
              $scope.departments = DepartmentsFactory.query({}, function(
                res,
                headers
              ) {
                loadSelect(
                  "#selectInOr",
                  $scope.departments,
                  {
                    value: "id",
                    option: "name"
                  },
                  $scope.note.origin
                );
                $scope.note.inor = $scope.note.origin;
                loadSelect(
                  "#selectInDe",
                  $scope.departments,
                  {
                    value: "id",
                    option: "name"
                  },
                  $scope.note.destiny
                );
                $scope.note.inde = $scope.note.destiny;
                $("#departmentModal").modal("hide");
              });
            }, 500);
          },
          function(err) {
            $scope.modalSaving = null;
            $scope.modalFlashMessage = err.data.error.error;
          }
        );
      }
    };
    $scope.addThirdparty = function(valid) {
      if (valid) {
        thirdpartyData = JSON.stringify($scope.thirdparty);
        $scope.modalSaving = "Guardando ...";
        ThirdpartyFactory.thirdparty.create(
          { data: thirdpartyData },
          function(res, headers) {
            $scope.modalSaving = "¡¡ Tercero Creado !!";
            $timeout(function() {
              $scope.thirdparties = ThirdpartiesFactory.query({}, function(
                res,
                headers
              ) {
                loadSelect(
                  "#selectExOr",
                  $scope.thirdparties,
                  {
                    value: "id",
                    option: "name"
                  },
                  $scope.note.origin
                );
                $scope.note.exor = $scope.note.origin;
                loadSelect(
                  "#selectExDe",
                  $scope.thirdparties,
                  {
                    value: "id",
                    option: "name"
                  },
                  $scope.note.destiny
                );
                $scope.note.exde = $scope.note.destiny;
                $("#thirdpartyModal").modal("hide");
              });
            }, 500);
          },
          function(err) {
            $scope.modalSaving = null;
            $scope.modalFlashMessage = err.data.error.error;
          }
        );
      }
    };
    $scope.closeModal = function(modal) {
      $("#" + modal).modal("hide");
      $scope.fromModal = false;
    };
    $scope.filter = function() {
      $timeout(function() {
        $scope.filteredItems = $scope.filtered.length;
      }, 10);
    };
    $scope.sort_by = function(predicate) {
      $scope.predicate = predicate;
      $scope.reverse = !$scope.reverse;
    };
    $scope.downloadFile = function(file, noteId) {
      file.download = NoteFactory.file.download(
        {
          file: JSON.stringify({
            id: file.id,
            noteId: noteId,
            name: file.name
          })
        },
        function(res) {
          $timeout(() => {
            window.open(file.download.file);
          });
        }
      );
    };
    $scope.uploadFiles = function(files, errFiles) {
      $scope.tmpFiles = files;
      $scope.errFiles = errFiles;
      angular.forEach(files, function(file) {
        file.upload = Upload.upload({
          url: "/file/upload",
          data: { file: file }
        });
        file.upload.then(
          function(res) {
            $timeout(() => {
              file = res.data;
              $scope.files.push(file);
            });
          },
          function(res) {
            if (res.status > 200) {
              $scope.flashMessage = res.data;
            }
          },
          function(event) {
            file.progress = Math.min(
              100,
              parseInt((100.0 * event.loaded) / event.total)
            );
          }
        );
        $scope.droppedFiles = true;
      });
    };
    angular.element(window).bind("dragover", function(e) {
      e.preventDefault();
    });
    angular.element(window).bind("drop", function(e) {
      e.preventDefault();
    });
    function loadSelect(id, data, options, selected) {
      angular
        .element(id)
        .find("option")
        .remove()
        .end();
      for (var i = 0; i < data.length; i++) {
        angular
          .element(id)
          .append(
            "<option" +
              (data[i][options["icon"]]
                ? " data-icon='fa fa-" + data[i][options["icon"]] + "'"
                : "") +
              " value='" +
              data[i][options["value"]] +
              "'" +
              ">" +
              data[i][options["option"]] +
              "</option>"
          );
      }
      if (selected) {
        angular.element(id).val(selected);
      }
      angular.element(id).selectpicker("render");
      angular.element(id).selectpicker("show");
      angular.element(id).selectpicker("refresh");
    }
  }
]);
