const config = require("../config/config");
const menus = require("../models/menus");
const chai = require("chai");
const i18n = require("i18n");
const expect = chai.expect;

// Languages
i18n.configure({
  locales: config.LOCALES,
  defaultLocale: config.DEFAULT_LOCALE,
  directory: config.LOCALES_PATH
});
i18n.init;

before(done => {
  console.log(
    "\n\n--------------------\n--\n-- START menus-test\n--\n--------------------"
  );
  done();
});
after(done => {
  console.log(
    "\n\n--------------------\n--\n-- END menus-test\n--\n--------------------"
  );
  done();
});

describe("## Test units for /models/menus.js ##", () => {
/*
  it("Menus.update(data, req, res): Should update the menu data.", done => {
    console.log("\n# Test 001 => Menus.update(data, req, res);");
    let data = {
      id: 10,
      parent: 7,
      name: "Menús",
      icon: "ellipsis-v",
      href: "#/config/menus",
      order: 430
    };
    let req = null;
    let res = null;
    menus.update(data, req, res, (err, result) => {
      if (err) {
        done(err);
        return;
      }
      expect(result.length).equals(1);
      console.log(
        "{\n  Count: %s\n  Result: %s\n}\n",
        result.length,
        JSON.stringify(result)
      );
      done();
    });
  }).timeout(0);
*/
/*
    it("Menus.delete(id, req, res): Should delete the menu.", done => {
      console.log("\n# Test 001 => Menus.delete(id, req, res);");
      let req = null;
      let res = null;
      menus.delete(6, req, res, (err, result) => {
        if (err) {
          done(err);
          return;
        }
        expect(result.length).equals(1);
        console.log(
          "{\n  Count: %s\n  Result: %s\n}\n",
          result.length,
          JSON.stringify(result)
        );
        done();
      });
    }).timeout(0);
*/
});
