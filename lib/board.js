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
        menu:
          req.session.class === "01"
            ? "menuForManager.ejs"
            : "menuForCustomer.ejs",
        who: req.session.name,
        body: "boardtype.ejs",
        logined:
          req.session.class === "00" // 경영진
            ? "00"
            : req.session.class === "01" // 관리자
            ? "01"
            : req.session.class === "02" // 일반
            ? "02"
            : "",
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

    db.query("select * from boardtype", (boardtypeerr, boardtyperesults) => {
      db.query(
        "SELECT * FROM board where board.type_id = ?",
        [type_id],
        (error, boardresult) => {
          db.query(
            "select * from boardtype where boardtype.type_id =? ",
            [type_id],
            (err, boardtyperesult) => {
              var result = "";
              var write_YN = "";
              boardresult.forEach((data) => {
                result += `<tr><td>${data.p_id}</td>
            <td><a href="/board/detail/${data.board_id}/1">${data.title}</a></td>
            <td>${data.date}</td></tr>`;
              });
              boardtyperesult.forEach((data) => {
                write_YN += `${data.write_YN}`;
              });

              result += "</td>";
              context = {
                menu: "menuForCustomer",
                who: req.session.name,
                body: "board.ejs",
                logined:
                  req.session.class === "00" // 경영진
                    ? "00"
                    : req.session.class === "01" // 관리자
                    ? "01"
                    : req.session.class === "02" // 일반
                    ? "02"
                    : "",
                results: result,
                write_YN: write_YN,
                boardtypes: boardtyperesults,
                boardtyperesults: boardtyperesult,
              };

              res.render("home", context);
            }
          );
        }
      );
    });
  },
  view_detail: (req, res) => {
    var context;
    const board_id = req.params.board_id;

    db.query(
      "SELECT * FROM board where board.board_id = ?",
      [board_id],
      (error, boardresult) => {
        db.query("select * from boardtype", (err, boardtyperesult) => {
          var result_title = "";
          var result_p_id = "";
          var result_date = "";
          var result_content = "";
          var result_board_id = "";
          var same_user = ""; // 로그인한 사용자 일치하는지
          boardresult.map((data) => {
            result_title += `<input value='${data.title}' disabled /></input>`;
            result_p_id += `<input value='${data.p_id}' disabled />`;
            result_date += `<input value='${data.date}' disabled/>`;
            result_content += `<textarea> ${data.content}' </textarea>`;
            result_board_id += `${data.board_id}`;
            if (req.session.name == data.p_id) {
              same_user = "SAME";
            } else {
              same_user = "";
            }
          });
          console.log(result_board_id);

          context = {
            menu: "menuForCustomer",
            who: req.session.name,
            body: "boarddetail.ejs",
            logined:
              req.session.class === "00" // 경영진
                ? "00"
                : req.session.class === "01" // 관리자
                ? "01"
                : req.session.class === "02" // 일반
                ? "02"
                : "",
            result_title: result_title,
            result_p_id: result_p_id,
            result_date: result_date,
            result_content: result_content,
            result_board_id: result_board_id,
            same_user: same_user,
            boardtypes: boardtyperesult,
          };

          res.render("home", context);
        });
      }
    );
  },
  detail_update: (req, res) => {
    var context;
    const board_id = req.params.board_id;
    const type_id = req.params.type_id;

    db.query(
      "select * from board where board.board_id = ?",
      [board_id],
      (boarderror, boardresult) => {
        db.query(
          "select * from boardtype where boardtype.type_id =?",
          [type_id],
          (typeerror, typeresult) => {
            context = {
              menu: "menuForCustomer",
              who: req.session.name,
              body: "boardCRU.ejs",
              logined:
                req.session.class === "00" // 경영진
                  ? "00"
                  : req.session.class === "01" // 관리자
                  ? "01"
                  : req.session.class === "02" // 일반
                  ? "02"
                  : "",
            };
            res.render("home", context);
          }
        );
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
        logined:
          req.session.class === "00" // 경영진
            ? "00"
            : req.session.class === "01" // 관리자
            ? "01"
            : req.session.class === "02" // 일반
            ? "02"
            : "",
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
        logined:
          req.session.class === "00" // 경영진
            ? "00"
            : req.session.class === "01" // 관리자
            ? "01"
            : req.session.class === "02" // 일반
            ? "02"
            : "",
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
            logined:
              req.session.class === "00" // 경영진
                ? "00"
                : req.session.class === "01" // 관리자
                ? "01"
                : req.session.class === "02" // 일반
                ? "02"
                : "",
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
