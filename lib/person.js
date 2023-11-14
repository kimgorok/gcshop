// 201935250 김현중

const db = require("./db");

module.exports = {
  view: (req, res) => {
    var context;
    db.query("select * from person", (error, results) => {
      db.query("select * from boardtype", (err, boardtyperesult) => {
        if (error) {
          throw error;
        }
        var result = "";
        results.forEach((data) => {
          result += `<tr><td>${data.loginid}</td><td>${data.password}</td><td>${data.name}</td>
          <td>${data.address}</td><td>${data.tel}</td><td>${data.birth}</td><td>${data.class}</td><td>${data.point}</td><tr>`;
        });
        result += "</td>";
        context = {
          menu: "menuForManager.ejs",
          who: req.session.name,
          body: "person.ejs",
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
    });
  },
  view_u: (req, res) => {
    var context;
    db.query("select * from person", (error, results) => {
      db.query("select * from boardtype", (err, boardtyperesult) => {
        if (error) {
          throw error;
        }
        var result = "";
        results.forEach((data) => {
          result += `<tr>
          <td>${data.loginid}</td>
          <td>${data.password}</td>
          <td>${data.name}</td>
          <td>${data.address}</td>
          <td>${data.tel}</td>
          <td>${data.birth}</td>
          <td>${data.class}</td>
          <td>${data.point}</td>
          <td><a href="/person/update/${data.loginid}">수정</a></td>
            <td><a href="/person/delete/${data.loginid}" onclick="return confirm('정말로 삭제하시겠습니까?')">삭제</a></td>
          <tr>`;
        });
        result += "</td>";
        context = {
          menu: "menuForManager.ejs",
          who: req.session.name,
          body: "person.ejs",
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
    });
  },
  create: (req, res) => {
    db.query(`SELECT * FROM person`, (err, results) => {
      db.query("select * from boardtype", (boarderr, boardtyperesult) => {
        var context = {
          menu: "menuForManager.ejs",
          who: req.session.name,
          body: "personCU.ejs",
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
          boardtypes: boardtyperesult,
        };
        res.render("home", context);
      });
    });
  },
  create_process: (req, res) => {
    const body = req.body;
    db.query(
      "INSERT INTO person (loginid, password, name, address, tel, birth, class, point) VALUES (?,?,?, ?, ?, ?, ?, ?)",
      [
        body.loginid,
        body.password,
        body.name,
        body.address,
        body.tel,
        body.birth,
        body.class,
        body.point,
      ],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.writeHead(302, { Location: "/person/view/v" }); // /person로 리디렉션
        res.end();
      }
    );
  },
  update: (req, res) => {
    const loginid = req.params.loginid;
    console.log(loginid);
    db.query(
      "SELECT * FROM person WHERE loginid = ?",
      [loginid],
      (error, result) => {
        db.query("select * from boardtype", (err, boardtyperesult) => {
          if (error) {
            throw error;
          }

          var context = {
            menu: "menuForManager.ejs",
            who: req.session.name,
            results: result,
            body: "personCU.ejs",
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
    const loginid = req.params.loginid; // main_id를 req.params에서 가져와야 함

    db.query(
      "UPDATE person SET loginid=?, password=?, name=?, address = ?, tel=?, birth=?, class=?, point=? WHERE loginid = ?",
      [
        body.loginid,
        body.password,
        body.name,
        body.address,
        body.tel,
        body.birth,
        body.class,
        body.point,
        body.loginid,
      ],
      (error, results) => {
        if (error) {
          throw error;
        }

        res.writeHead(302, { Location: "/person/view/v" });
        res.end();
      }
    );
  },

  delete_process: (req, res) => {
    const loginid = req.params.loginid;

    db.query(
      "DELETE FROM person WHERE loginid = ?",
      [loginid],
      (error, results) => {
        if (error) {
          throw error;
        }

        res.writeHead(302, { Location: "/person/view/v" });
        res.end();
      }
    );
  },
};
