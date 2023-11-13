// 201935250 김현중

const db = require("./db");

module.exports = {
  view: (req, res) => {
    var context;
    db.query("select * from boardtype", (error, boardtyperesult) => {
      if (error) {
        throw error;
      }
      var result = "";
      boardtyperesult.forEach((data) => {
        result += `<tr><td>${data.title}</td><td>${data.numPerPage}</td><td>${data.description}</td>
        <td>${data.write_YN}</td><td>${data.re_YN}</td><tr>`;
      });
      result += "</td>";
      context = {
        menu: "menuForManager.ejs",
        who: req.session.name,
        body: "boardtype.ejs",
        logined: "YES",
        results: result,
        boardtypes: boardtyperesult,
        cu: "",
      };
      res.render("home", context);
    });
  },
  view_board: (req, res) => {
    var context;
    const type_id = req.params.type_id;

    db.query(
      "SELECT * FROM board where board.type_id = ?",
      [type_id],
      (error, boardresult) => {
        if (error) {
          throw error;
        }

        var result = "";
        boardresult.forEach((data) => {
          result += `<tr><td>${data.loginid}</td>
          <td><a href="/board/detail/${data.type_id}/1">${data.title}</a></td>
          <td>${data.date}</td></tr>`;
        });

        result += "</td>";
        context = {
          menu: "menuForCustomer",
          who: req.session.name,
          body: "board.ejs",
          logined: "NO",
          results: result,
          boardtypes: boardresult,
        };

        res.render("home", context);
      }
    );
  },
  view_detail: (req, res) => {
    var context;
    const type_id = req.params.type_id;

    db.query(
      "SELECT * FROM board where board.type_id = ?",
      [type_id],
      (error, boardresult) => {
        if (error) {
          throw error;
        }

        var result = "";
        boardresult.forEach((data) => {
          result += `<textarea>${data.title}</textarea>
          <textarea>${data.loginid}</textarea>
          <textarea>${data.date}</textarea>
          <textarea>${data.content}</textarea>
          `;
        });

        context = {
          menu: "menuForCustomer",
          who: req.session.name,
          body: "boarddetail.ejs",
          logined: "NO",
          results: result,
          boardtypes: boardresult,
        };

        res.render("home", context);
      }
    );
  },

  view_u: (req, res) => {
    var context;
    db.query("select * from boardtype", (error, boardtyperesult) => {
      if (error) {
        throw error;
      }
      var result = "";
      boardtyperesult.forEach((data) => {
        result += `<tr>
        <td>${data.title}</td><td>${data.numPerPage}</td><td>${data.description}</td>
        <td>${data.write_YN}</td><td>${data.re_YN}</td>
          <td><a href="/board/type/update/${data.type_id}">수정</a></td>
            <td><a href="/board/type/delete/${data.type_id}" onclick="return confirm('정말로 삭제하시겠습니까?')">삭제</a></td>
          <tr>`;
      });
      result += "</td>";
      context = {
        menu: "menuForManager.ejs",
        who: req.session.name,
        body: "boardtype.ejs",
        logined: "YES",
        results: result,
        boardtypes: boardtyperesult,
      };
      res.render("home", context);
    });
  },
  create: (req, res) => {
    db.query(`SELECT * FROM boardtype`, (err, results) => {
      var context = {
        menu: "menuForManager.ejs",
        who: req.session.name,
        body: "boardtypeCU.ejs",
        logined: "YES",
        results: results,
        create: "yes",
        boardtypes: results,
        cu: "C",
      };
      res.render("home", context);
    });
  },
  create_process: (req, res) => {
    const body = req.body;

    db.query(
      "INSERT INTO boardtype ( title, description, write_YN, re_YN, numPerPage) VALUES (?, ?, ?, ?, ?)  ",
      [
        body.title,
        body.description,
        body.write_YN,
        body.re_YN,
        body.numPerPage,
      ],
      (error, results) => {
        console.log(results);
        if (error) {
          throw error;
        }
        res.writeHead(302, { Location: "/board/type/view" }); // /board로 리디렉션
        res.end();
      }
    );
  },
  update: (req, res) => {
    const type_id = req.params.type_id;
    console.log("타입아이디 : ", type_id);
    db.query(
      "SELECT * FROM boardtype WHERE type_id = ?",
      [type_id],
      (error, result) => {
        db.query("select * from boardtype", (err, boardtyperesult) => {
          if (error) {
            throw error;
          }

          var context = {
            menu: "menuForManager.ejs",
            who: req.session.name,
            results: result,
            body: "boardtypeCU.ejs",
            logined: "YES",
            create: "",
            boardtypes: boardtyperesult,
            cu: "",
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
    const type_id = req.params.type_id; // main_id를 req.params에서 가져와야 함

    db.query(
      "UPDATE boardtype SET type_id =?, title=?, description=?, write_YN=?, re_YN=?, numPerPage=? WHERE type_id = ?",
      [
        body.type_id,
        body.title,
        body.description,
        body.write_YN,
        body.re_YN,
        body.numPerPage,
        body.type_id,
      ],
      (error, results) => {
        if (error) {
          throw error;
        }

        res.writeHead(302, { Location: "/board/type/view" });
        res.end();
      }
    );
  },

  delete_process: (req, res) => {
    const type_id = req.params.type_id;

    db.query(
      "DELETE FROM boardtype WHERE type_id = ?",
      [type_id],
      (error, results) => {
        if (error) {
          throw error;
        }

        res.writeHead(302, { Location: "/board/type/view" });
        res.end();
      }
    );
  },
};
