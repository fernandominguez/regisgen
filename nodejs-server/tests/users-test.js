const config = require("../config/config");
const users = require("../models/users");
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

/* 
let chaiHttp = require("chai-http");
chai.use(chaiHttp);

describe("users.findByUsername: ", () => {
  it('should get the data for the user with the username "fdominguez".', done => {
    chai
      .request(apiUrl)
      .get("/api/user")
      .send({ username: "fdominguez", locale: "es" })
      .end(function(err, res) {
        console.log(res.body);
        expect(res).to.have.status(200);
        done();
      });
  });
});
*/

before(done => {
  console.log(
    "\n\n--------------------\n--\n-- START users-test\n--\n--------------------"
  );
  done();
});
after(done => {
  console.log(
    "\n\n--------------------\n--\n-- END user-test\n--\n--------------------"
  );
  done();
});

describe("## Test units for /models/users.js ##", () => {
  it('Users.findByUsername("fdominguez", callback): Should return only one record.', done => {
    console.log('\n# Test 001 => Users.findByUsername("fdominguez", callback);');
    users.findByUsername("fdominguez", function(err, result) {
      if (err) {
        done(err);
        return;
      }
      expect(result.length).equals(1);
      console.log(
        '{\n  Count: %s\n  Result: %s\n}\n',
        result.length,
        JSON.stringify(result)
      );
      done();
    });
  }).timeout(0);
  it('Users.findByUsername("fdominguez", callback): Should return a record with all the table fields.', done => {
    users.findByUsername("fdominguez", function(err, result) {
      if (err) {
        done(err);
        return;
      }
      expect(result[0]).to.have.any.keys(
        "id",
        "username",
        "password",
        "name",
        "surname",
        "birthday",
        "email",
        "phone",
        "mobile",
        "address"
      );
      done();
    });
  }).timeout(0);
  it('Users.findByUsername("fdominguez", callback): Should return the user data for username = "fdominguez".', done => {
    users.findByUsername("fdominguez", function(err, result) {
      if (err) {
        done(err);
        return;
      }
      expect(JSON.stringify(result[0])).equals(
        '{"id":1,"username":"fdominguez","password":"$2a$10$wENMOiXaNvkXN9BmCbh4ZO64rEz7h/HaSoWC7nVpGwFwH2JMUkOf.","name":"Fernando","surname":"Domínguez Santamaría","birthday":"1977-05-21T00:00:00.000Z","email":"dominguez.fernando@gmail.com","phone":"941500466","mobile":"657062861","address":"C/ Pasadera 3, 1ºA. Logroño (La Rioja)"}'
      );
      done();
    });
  }).timeout(0);
});
