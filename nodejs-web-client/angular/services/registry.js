var services = angular.module("ngregisgen.registry-services", ["ngResource"]);

services.factory("RegistryFactory", function ($resource) {
  return $resource("/registry", {}, {
    query: { method: "GET", isArray: true }
  })
});

services.factory("NoteFactory", function ($resource) {
  return {
    note: $resource("/note/:id/:data", {}, {
      create: { method: "POST", params: { data: "@data" } },
      read: { method: "GET", params: { id: "@id" } },
      update: { method: "PUT", params: { data: "@data" } },
      delete: { method: "DELETE", params: { id: "@id" } }
    }),
    file: $resource("/file/download/:file", {}, {
      download: { method: "GET", params: { file: "@file" } }
    }),
    files: $resource("/files/:id/:data", {}, {
      list: { method: "GET", params: { id: "@id" } },
      upload: { method: "POST", params: { data: "@data" } },
      clear: { method: "PUT", params: { data: "@data" } }
    })
  };
});

services.factory("RegistryScroll", function ($resource) {
  var RegistryScroll = function(count) {
    this.items = [];
    this.busy = false;
    this.after = count;
    this.count = 0;
  };

  RegistryScroll.prototype.nextPage = function() {
    if (this.busy) { return; }
    this.busy = true;

    var RegistryScrollFactory = $resource("/registry/scroll/:after/:count", {}, {
      scroll: { method: "GET", params: { after: "@after", count: "@count"}, isArray: true }
    });

    var items = RegistryScrollFactory.scroll({ after: this.after, count: this.count }, function(res, headers) {
      for (var i=0; i<items.length; i++) {
        this.items.push(items[i]);
      }
      if (items.length > 0) {
        this.count += this.after;
        this.after = 1;
      }
      this.busy = false;
    }.bind(this));
  };

  RegistryScroll.prototype.refreshPage = function() {
    this.items = [];
    this.after = this.count;
    this.count = 0;
    if (this.busy) { return; }
    this.busy = true;

    var RegistryScrollFactory = $resource("/registry/scroll/:after/:count", {}, {
      scroll: { method: "GET", params: { after: "@after", count: "@count"}, isArray: true }
    });

    var items = RegistryScrollFactory.scroll({ after: this.after, count: this.count }, function(res, headers) {
      for (var i=0; i<items.length; i++) {
        this.items.push(items[i]);
      }
      if (items.length > 0) {
        this.count += this.after;
        this.after = 1;
      }
      this.busy = false;
    }.bind(this));
  };

  return RegistryScroll;
});
