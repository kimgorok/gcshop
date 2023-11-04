// code.js

const db = require("./db");

module.exports = {
  view: (req, res) => {
    var context;
    db.query("select * from code_tbl", (error, results) => {
      if (error) {
        throw error;
      }
      var result = "";
      results.forEach((data) => {
        result += `<tr><td>${data.main_id}</td><td>${data.main_name}</td><td>${data.sub_id}</td>
        <td>${data.sub_name}</td><td>${data.start}</td><td>${data.end}</td><tr>`;
      });
      result += "</td>";
      context = {
        menu: "menuForManager.ejs",
        who: req.session.name,
        body: "code.ejs",
        logined: "YES",
        results: result,
      };
      res.render("home", context);
    });
  },
  create: (req, res) => {},
  create_process: (req, res) => {},
  update: (req, res) => {
    var context;
    db.query("select * from code_tbl", (error, results) => {
      if (error) {
        throw error;
      }
      var result = "";
      results.forEach((data) => {
        result += `<tr><td>${data.main_id}</td><td>${data.main_name}</td><td>${data.sub_id}</td>
        <td>${data.sub_name}</td><td>${data.start}</td><td>${data.end}</td><tr>`;
      });
      result += "</td>";
      context = {
        menu: "menuForManager.ejs",
        who: req.session.name,
        body: "code.ejs",
        logined: "YES",
        results: result,
      };
      res.render("home", context);
    });
  },
  update_process: (req, res) => {},
  delete_process: (req, res) => {},
};
