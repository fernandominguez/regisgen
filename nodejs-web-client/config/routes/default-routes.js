const lang = require("../services/lang");
const passport = require("passport");

module.exports = function(app) {
  // Display Login Page
  app.get("/", (req, res) => {
    var locale = req.cookies.lang ? req.cookies.lang : res.getLocale();
    var urlLocale = locale == "es" ? "en" : "es";
    res.render("index", {
      title: lang.message("App Title", locale, res),
      language: lang.message("Language", locale, res),
      register: lang.message("Signup", locale, res),
      phUsername: lang.message("phUsername", locale, res),
      phPassword: lang.message("phPassword", locale, res),
      btnSignin: lang.message("Signin", locale, res),
      userName: req.user ? req.user.username : undefined,
      name: req.user ? req.user.name : undefined,
      surname: req.user ? req.user.surname : undefined,
      locale: urlLocale,
      flashMessage: req.flash("flashMessage")
    });
  });
  // Change App language to English
  app.get("/en", (req, res) => {
    res.cookie("lang", "en");
    res.redirect("/");
  });
  // Change App language to Spanish
  app.get("/es", (req, res) => {
    res.cookie("lang", "es");
    res.redirect("/");
  });
  // Display Authenticated Username
  app.get("/username", passport.authenticationMiddleware(), (req, res) => {
    res.status(200).json({
      userName: req.user ? req.user.username : undefined,
      name: req.user ? req.user.name : undefined,
      surname: req.user ? req.user.surname : undefined
    });
  });
  // Display Rolename for the Authenticated User
  app.get("/rolename", passport.authenticationMiddleware(), (req, res) => {
    res.status(200).json({
      roleid: req.user ? req.user.roleId : undefined,
      rolename: req.user ? req.user.roleName : undefined
    });
  });
  // Display Registry Templates
  app.get(
    "/v/registry/:view",
    passport.authenticationMiddleware(),
    (req, res) => {
      res.render("registry/list/" + req.params.view, {
        btnAdd: lang.message("btnAdd", req, res),
        btnClose: lang.message("btnClose", req, res),
        btnDelete: lang.message("btnDelete", req, res),
        btnFilter: lang.message("btnFilter", req, res),
        btnPrint: lang.message("btnPrint", req, res),
        btnPrintStamp: lang.message("btnPrintStamp", req, res),
        btnReturn: lang.message("btnReturn", req, res),
        btnSave: lang.message("btnSave", req, res),
        lblAddress: lang.message("lblAddress", req, res),
        lblChannel: lang.message("lblChannel", req, res),
        lblContent: lang.message("lblContent", req, res),
        lblDepartmentOfDestiny: lang.message(
          "lblDepartmentOfDestiny",
          req,
          res
        ),
        lblDepartmentOfOrigin: lang.message("lblDepartmentOfOrigin", req, res),
        lblDocuments: lang.message("lblDocuments", req, res),
        lblDone: lang.message("lblDone", req, res),
        lblEmail: lang.message("lblEmail", req, res),
        lblEntry: lang.message("lblEntry", req, res),
        lblExit: lang.message("lblExit", req, res),
        lblExternal: lang.message("lblExternal", req, res),
        lblFromTheDate: lang.message("lblFromTheDate", req, res),
        lblFromTheNumber: lang.message("lblFromTheNumber", req, res),
        lblInternal: lang.message("lblInternal", req, res),
        lblName: lang.message("lblName", req, res),
        lblNIFCIFNIE: lang.message("lblNIFCIFNIE", req, res),
        lblOffice: lang.message("lblOffice", req, res),
        lblPending: lang.message("lblPending", req, res),
        lblPerson: lang.message("lblPerson", req, res),
        lblPhone: lang.message("lblPhone", req, res),
        lblStatus: lang.message("lblStatus", req, res),
        lblSubtype: lang.message("lblSubtype", req, res),
        lblTag: lang.message("lblTag", req, res),
        lblThirdpartyOfDestiny: lang.message(
          "lblThirdpartyOfDestiny",
          req,
          res
        ),
        lblThirdpartyOfOrigin: lang.message("lblThirdpartyOfOrigin", req, res),
        lblTitle: lang.message("lblTitle", req, res),
        lblToTheDate: lang.message("lblToTheDate", req, res),
        lblToTheNumber: lang.message("lblToTheNumber", req, res),
        lblType: lang.message("lblType", req, res),
        lblVoided: lang.message("lblVoided", req, res),
        msgFileTypeNotAllowed: lang.message("msgFileTypeNotAllowed", req, res),
        msgFilterNotes: lang.message("msgFilterNotes", req, res),
        msgLoading: lang.message("msgLoading", req, res),
        msgNewDepartment: lang.message("msgNewDepartment", req, res),
        msgNewNote: lang.message("msgNewNote", req, res),
        msgNewThirdparty: lang.message("msgNewThirdparty", req, res),
        msgNoteData: lang.message("msgNoteData", req, res),
        msNothingSelected: lang.message("msgNothingSelected", req, res),
        msgNoNotesFound: lang.message("msgNoNotesFound", req, res),
        msgOrDrop: lang.message("msgOrDrop", req, res),
        msgSelect: lang.message("msgSelect", req, res),
        msgSelectDestiny: lang.message("msgSelectDestiny", req, res),
        msgSelectOrigin: lang.message("msgSelectOrigin", req, res),
        msgTheFiles: lang.message("msgTheFiles", req, res),
        phSearch: lang.message("phSearch", req, res),
        stampExternalEntry: lang.message("stampExternalEntry", req, res),
        stampExternalExit: lang.message("stampExternalExit", req, res),
        stampInternalEntry: lang.message("stampInternalEntry", req, res),
        stampInternalExit: lang.message("stampInternalExit", req, res),
        stampRegistryDate: lang.message("stampRegistryDate", req, res),
        stampRegistryNumber: lang.message("stampRegistryNumber", req, res),
        stampSubtitle: lang.message("stampSubtitle", req, res),
        stampTitle: lang.message("stampTitle", req, res),
        thDate: lang.message("thDate", req, res),
        thDestiny: lang.message("thDestiny", req, res),
        thNumber: lang.message("thNumber", req, res),
        thOrigin: lang.message("thOrigin", req, res),
        thStatus: lang.message("thStatus", req, res),
        thSubtype: lang.message("thSubtype", req, res),
        thTitle: lang.message("thTitle", req, res),
        thType: lang.message("thType", req, res),
        titleClickToShortByThisColumn: lang.message(
          "titleClickToShortByThisColumn",
          req,
          res
        ),
        titleDocument: lang.message("titleDocument", req, res),
        titleDownloadDocument: lang.message("titleDownloadDocument", req, res),
        titleFilterNotes: lang.message("titleFilterNotes", req, res),
        titleModifyData: lang.message("titleModifyData", req, res),
        titleNewDepartment: lang.message("titleNewDepartment", req, res),
        titleNewNote: lang.message("titleNewNote", req, res),
        titleNewThirdparty: lang.message("titleNewThirdparty", req, res),
        titlePrintDivNotes: lang.message("titlePrintDivNotes", req, res),
        titlePrintList: lang.message("titlePrintList", req, res),
        titleRefreshList: lang.message("titleRefreshList", req, res),
        titleShowData: lang.message("titleShowData", req, res)
      });
    }
  );
  // Display Departments Templates
  app.get(
    "/v/departments/:view",
    passport.authenticationMiddleware(),
    (req, res) => {
      res.render("registry/list/" + req.params.view, {
        btnAdd: lang.message("btnAdd", req, res),
        btnClose: lang.message("btnClose", req, res),
        btnDelete: lang.message("btnDelete", req, res),
        btnFilter: lang.message("btnFilter", req, res),
        btnPrint: lang.message("btnPrint", req, res),
        btnPrintStamp: lang.message("btnPrintStamp", req, res),
        btnReturn: lang.message("btnReturn", req, res),
        btnSave: lang.message("btnSave", req, res),
        lblAddress: lang.message("lblAddress", req, res),
        lblEmail: lang.message("lblEmail", req, res),
        lblName: lang.message("lblName", req, res),
        lblOffice: lang.message("lblOffice", req, res),
        lblPhone: lang.message("lblPhone", req, res),
        msgDepartment: lang.message("msgDepartment", req, res),
        msgDepartmentsPerPage: lang.message("msgDepartmentsPerPage", req, res),
        msgFirst: lang.message("msgFirst", req, res),
        msgLast: lang.message("msgLast", req, res),
        msgListing: lang.message("msgListing", req, res),
        msgNext: lang.message("msgNext", req, res),
        msgNewDepartment: lang.message("msgNewDepartment", req, res),
        msgNoDepartmentsFound: lang.message("msgNoDepartmentsFound", req, res),
        msgOf: lang.message("msgOf", req, res),
        msgPrevious: lang.message("msgPrevious", req, res),
        phSearch: lang.message("phSearch", req, res),
        thAddress: lang.message("thAddress", req, res),
        thEmail: lang.message("thEmail", req, res),
        thId: lang.message("thId", req, res),
        thName: lang.message("thName", req, res),
        thOffice: lang.message("thOffice", req, res),
        thPhone: lang.message("thPhone", req, res),
        titleClickToShortByThisColumn: lang.message(
          "titleClickToShortByThisColumn",
          req,
          res
        ),
        titleDeleteDepartment: lang.message("titleDeleteDepartment", req, res),
        titleDeleteSelected: lang.message("titleDeleteSelected", req, res),
        titleDepartmentsPerPage: lang.message(
          "titleDepartmentsPerPage:",
          req,
          res
        ),
        titleModifyData: lang.message("titleModifyData", req, res),
        titleNewDepartment: lang.message("titleNewDepartment", req, res),
        titlePrintDivDepartments: lang.message(
          "titlePrintDivDepartments",
          req,
          res
        ),
        titlePrintList: lang.message("titlePrintList", req, res),
        titleShowData: lang.message("titleShowData", req, res)
      });
    }
  );
  // Display Thirdparties Templates
  app.get(
    "/v/thirdparties/:view",
    passport.authenticationMiddleware(),
    (req, res) => {
      res.render("registry/list/" + req.params.view, {
        btnAdd: lang.message("btnAdd", req, res),
        btnClose: lang.message("btnClose", req, res),
        btnDelete: lang.message("btnDelete", req, res),
        btnFilter: lang.message("btnFilter", req, res),
        btnPrint: lang.message("btnPrint", req, res),
        btnPrintStamp: lang.message("btnPrintStamp", req, res),
        btnReturn: lang.message("btnReturn", req, res),
        btnSave: lang.message("btnSave", req, res),
        lblAddress: lang.message("lblAddress", req, res),
        lblEmail: lang.message("lblEmail", req, res),
        lblName: lang.message("lblName", req, res),
        lblNIFCIFNIE: lang.message("lblNIFCIFNIE", req, res),
        lblPerson: lang.message("lblPerson", req, res),
        lblPhone: lang.message("lblPhone", req, res),
        msgFirst: lang.message("msgFirst", req, res),
        msgLast: lang.message("msgLast", req, res),
        msgListing: lang.message("msgListing", req, res),
        msgNext: lang.message("msgNext", req, res),
        msgNewThirdparty: lang.message("msgNewThirdparty", req, res),
        msgNoDepartmentsFound: lang.message("msgNoDepartmentsFound", req, res),
        msgOf: lang.message("msgOf", req, res),
        msgPrevious: lang.message("msgPrevious", req, res),
        msgThirdpartiesPerPage: lang.message(
          "msgThirdpartiesPerPage",
          req,
          res
        ),
        msgThirdparty: lang.message("msgThirdparty", req, res),
        phSearch: lang.message("phSearch", req, res),
        thAddress: lang.message("thAddress", req, res),
        thEmail: lang.message("thEmail", req, res),
        thId: lang.message("thId", req, res),
        thIdentification: lang.message("thIdentification", req, res),
        thName: lang.message("thName", req, res),
        thPhone: lang.message("thPhone", req, res),
        titleClickToShortByThisColumn: lang.message(
          "titleClickToShortByThisColumn",
          req,
          res
        ),
        titleDeleteSelected: lang.message("titleDeleteSelected", req, res),
        titleDeleteThirdparty: lang.message("titleDeleteThirdparty", req, res),
        titleModifyData: lang.message("titleModifyData", req, res),
        titleNewThirdparty: lang.message("titleNewThirdparty", req, res),
        titlePrintList: lang.message("titlePrintList", req, res),
        titlePrintDivThirdparties: lang.message(
          "titlePrintDivThirdparties",
          req,
          res
        ),
        titleShowData: lang.message("titleShowData", req, res),
        titleThirdpartiesPerPage: lang.message(
          "titleThirdpartiesPerPage:",
          req,
          res
        )
      });
    }
  );
  // Display Config Templates
  app.get(
    "/v/config/:view",
    passport.authenticationMiddleware(),
    (req, res) => {
      res.render("config/list/" + req.params.view, {
        btnAdd: lang.message("btnAdd", req, res),
        btnClose: lang.message("btnClose", req, res),
        btnDelete: lang.message("btnDelete", req, res),
        btnPrint: lang.message("btnPrint", req, res),
        btnReturn: lang.message("btnReturn", req, res),
        btnSave: lang.message("btnSave", req, res),
        lblAddress: lang.message("lblAddress", req, res),
        lblBirthday: lang.message("lblBirthday", req, res),
        lblEmail: lang.message("lblEmail", req, res),
        lblHref: lang.message("lblHref", req, res),
        lblIcon: lang.message("lblIcon", req, res),
        lblMobile: lang.message("lblMobile", req, res),
        lblMenuName: lang.message("lblMenuName", req, res),
        lblMenuParent: lang.message("lblMenuParent", req, res),
        lblName: lang.message("lblName", req, res),
        lblOrder: lang.message("lblOrder", req, res),
        lblPassword: lang.message("lblPassword", req, res),
        lblPermissionName: lang.message("lblPermissionName", req, res),
        lblPhone: lang.message("lblPhone", req, res),
        lblRePassword: lang.message("lblRePassword", req, res),
        lblSurname: lang.message("lblSurname", req, res),
        lblUserName: lang.message("lblUserName", req, res),
        msgFirst: lang.message("msgFirst", req, res),
        msgLast: lang.message("msgLast", req, res),
        msgListing: lang.message("msgListing", req, res),
        msgMenu: lang.message("msgMenu", req, res),
        msgMenuPermissions: lang.message("msgMenuPermissions", req, res),
        msgMenuPerPage: lang.message("msgMenuPerPage", req, res),
        msgNext: lang.message("msgNext", req, res),
        msgNewMenu: lang.message("msgNewMenu", req, res),
        msgNewPermission: lang.message("msgNewPermission", req, res),
        msgNewUser: lang.message("msgNewUser", req, res),
        msgNoMenuFound: lang.message("msgNoMenuFound", req, res),
        msgNoPermissionsFound: lang.message("msgNoPermissionsFound", req, res),
        msgNoUsersFound: lang.message("msgNoUsersFound", req, res),
        msgOf: lang.message("msgOf", req, res),
        msgPermission: lang.message("msgPermission", req, res),
        msgPermissionsOf: lang.message("msgPermissionsOf", req, res),
        msgPermissionsPerPage: lang.message("msgPermissionsPerPage", req, res),
        msgPrevious: lang.message("msgPrevious", req, res),
        msgUser: lang.message("msgUser", req, res),
        msgUsersPerPage: lang.message("msgUsersPerPage", req, res),
        phSearch: lang.message("phSearch", req, res),
        thCreate: lang.message("thCreate", req, res),
        thDelete: lang.message("thDelete", req, res),
        thEmail: lang.message("thEmail", req, res),
        thExecute: lang.message("thExecute", req, res),
        thHref: lang.message("thHref", req, res),
        thIcon: lang.message("thIcon", req, res),
        thId: lang.message("thId", req, res),
        thMenu: lang.message("thMenu", req, res),
        thMobile: lang.message("thMobile", req, res),
        thName: lang.message("thName", req, res),
        thOrder: lang.message("thOrder", req, res),
        thParent: lang.message("thParent", req, res),
        thRead: lang.message("thRead", req, res),
        thSurname: lang.message("thSurname", req, res),
        thUpdate: lang.message("thUpdate", req, res),
        titleClickToShortByThisColumn: lang.message(
          "titleClickToShortByThisColumn",
          req,
          res
        ),
        titleDeleteMenu: lang.message("titleDeleteMenu", req, res),
        titleDeletePermission: lang.message("titleDeletePermission", req, res),
        titleDeleteSelected: lang.message("titleDeleteSelected", req, res),
        titleDeleteUser: lang.message("titleDeleteUser", req, res),
        titleFilterUsers: lang.message("titleFilterUsers", req, res),
        titleModifyData: lang.message("titleModifyData", req, res),
        titleMenuPerPage: lang.message("titleMenuPerPage", req, res),
        titleNewMenu: lang.message("titleNewMenu", req, res),
        titleNewPermission: lang.message("titleNewPermission", req, res),
        titleNewUser: lang.message("titleNewUser", req, res),
        titlePermissionsPerPage: lang.message(
          "titlePermissionsPerPage",
          req,
          res
        ),
        titlePrintDivMenu: lang.message("titlePrintDivMenu", req, res),
        titlePrintDivPermissions: lang.message(
          "titlePrintDivPermissions",
          req,
          res
        ),
        titlePrintDivUsers: lang.message("titlePrintDivUsers", req, res),
        titlePrintList: lang.message("titlePrintList", req, res),
        titleShowData: lang.message("titleShowData", req, res),
        titleUserPermissions: lang.message("titleUserPermissions", req, res),
        titleUsersPerPage: lang.message("titleUsersPerPage", req, res)
      });
    }
  );
  // Display Navbar Templates
  app.get(
    "/v/layouts/navbars/:view",
    passport.authenticationMiddleware(),
    (req, res) => {
      res.render("layouts/navbars/" + req.params.view);
    }
  );
};
