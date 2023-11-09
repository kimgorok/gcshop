// 201935250 김현중

const db = require("./db");

module.exports = {
  view: (req, res) => {
    var context;
    db.query("select * from code_tbl", (error, results) => {
      db.query("select * from boardtype", (err, boardtyperesult) => {
        console.log(boardtyperesult);
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
          boardtypes: boardtyperesult,
        };
        res.render("home", context);
      });
    });
  },
  view_u: (req, res) => {
    var context;
    db.query("select * from code_tbl", (error, results) => {
      db.query("select * from boardtype", (err, boardtyperesult) => {
        if (error) {
          throw error;
        }
        var result = "";
        results.forEach((data) => {
          result += `<tr>
          <td>${data.main_id}</td>
          <td>${data.main_name}</td>
          <td>${data.sub_id}</td>
          <td>${data.sub_name}</td>
          <td>${data.start}</td>
          <td>${data.end}</td>
          <td><a href="/code/update/${data.main_id}/${data.sub_id}">수정</a></td>
            <td><a href="/code/delete/${data.main_id}/${data.sub_id}" onclick="return confirm('정말로 삭제하시겠습니까?')">삭제</a></td>
          <tr>`;
        });
        result += "</td>";
        context = {
          menu: "menuForManager.ejs",
          who: req.session.name,
          body: "code.ejs",
          logined: "YES",
          results: result,
          boardtypes: boardtyperesult,
        };
        res.render("home", context);
      });
    });
  },
  create: (req, res) => {
    db.query(`SELECT * FROM code_tbl`, (err, results) => {
      db.query("select * from boardtype", (boarderr, boardtyperesult) => {
        var context = {
          menu: "menuForManager.ejs",
          who: req.session.name,
          body: "codeCU.ejs",
          logined: "YES",
          results: results,
          create: "yes",
          boardtypes: boardtyperesult,
        };
        res.render("home", context);
      });
    });
  },
  create_process: (req, res) => {
    const body = req.body;
    db.query(
      "INSERT INTO code_tbl (main_id, main_name, sub_id, sub_name, start, end) VALUES (?, ?, ?, ?, ?, ?)",
      [
        body.main_id,
        body.main_name,
        body.sub_id,
        body.sub_name,
        body.start,
        body.end,
      ],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.writeHead(302, { Location: "/code/view/v" }); // /code로 리디렉션
        res.end();
      }
    );
  },
  update: (req, res) => {
    const main_id = req.params.main;
    const sub_id = req.params.sub;

    db.query(
      "SELECT * FROM code_tbl WHERE main_id = ? AND sub_id = ?",
      [main_id, sub_id],
      (error, result) => {
        db.query("select * from boardtype", (err, boardtyperesult) => {
          if (error) {
            throw error;
          }
          console.log(result);
          var context = {
            menu: "menuForManager.ejs",
            who: req.session.name,
            results: result,
            body: "codeCU.ejs",
            logined: "YES",
            create: "",
            boardtypes: boardtyperesult,
          };
          req.app.render("home", context, (error, html) => {
            res.end(html);
          });
        });
      }
    );
  },

  update_process: (req, res) => {
    const body = req.body;

    db.query(
      "UPDATE code_tbl SET main_name = ?, sub_name = ?, start = ?, end = ? WHERE main_id = ? AND sub_id = ?",
      [
        body.main_name,
        body.sub_name,
        body.start,
        body.end,
        body.main_id,
        body.sub_id,
      ],
      (error, results) => {
        if (error) {
          throw error;
        }

        res.writeHead(302, { Location: "/code/view/v" });
        res.end();
      }
    );
  },

  delete_process: (req, res) => {
    const main_id = req.params.main_id;
    const sub_id = req.params.sub_id;

    db.query(
      "DELETE FROM code_tbl WHERE main_id = ? AND sub_id = ?",
      [main_id, sub_id],
      (error, results) => {
        if (error) {
          throw error;
        }

        res.writeHead(302, { Location: "/code/view/v" });
        res.end();
      }
    );
  },
};
