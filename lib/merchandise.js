// 201935250 김현중

const db = require("./db");

module.exports = {
  view: (req, res) => {
    var context;
    db.query("select * from merchandise", (error, results) => {
      db.query("select * from boardtype", (err, boardresult) => {
        if (error) {
          throw error;
        }
        var result = "";
        if (results.length < 1) {
          var result = "<tr><td>자료없음</td></tr>";
        } else {
          results.forEach((data) => {
            result += `
          <tr>
            <td><img src="${data.image}" style="width: 100px; height: 100px" /></td>
            <td>${data.name}</td>
            <td>${data.price}</td>
            <td>${data.brand}</td>
          </tr>`;
          });
        }

        context = {
          menu: "menuForManager.ejs",
          who: req.session.name,
          body: "merchandise.ejs",
          logined:
            req.session.class === "00" // 경영진
              ? "00"
              : req.session.class === "01" // 관리자
              ? "01"
              : req.session.class === "02" // 일반
              ? "02"
              : "",
          result: result,
          boardtypes: boardresult,
        };
        res.render("home", context);
      });
    });
  },
  view_u: (req, res) => {
    var context;
    db.query(
      "SELECT merchandise.*, code_tbl.* FROM merchandise LEFT JOIN code_tbl ON merchandise.category = code_tbl.sub_id",
      (error, results) => {
        db.query("select * from boardtype", (err, boardtyperesult) => {
          if (error) {
            throw error;
          }
          var result = "";
          if (results.length < 1) {
            var result = "<tr><td>자료없음</td></tr>";
          } else {
            results.forEach((data) => {
              result += `
          <tr>
            <td><img src="${data.image}" style="width: 100px; height: 100px" /></td>
            <td>${data.name}</td>
            <td>${data.price}</td>
            <td>${data.brand}</td>
            <td><a href="/merchandise/update/${data.mer_id}">수정</a></td>
            <td><a href="/merchandise/delete/${data.mer_id}" onclick="return confirm('정말로 삭제하시겠습니까?')">삭제</a></td>
          </tr>`;
            });
          }

          context = {
            menu: "menuForManager.ejs",
            who: req.session.name,
            body: "merchandise.ejs",
            logined:
              req.session.class === "00" // 경영진
                ? "00"
                : req.session.class === "01" // 관리자
                ? "01"
                : req.session.class === "02" // 일반
                ? "02"
                : "",
            result: result,
            boardtypes: boardtyperesult,
          };
          res.render("home", context);
        });
      }
    );
  },
  create: (req, res) => {
    db.query(`SELECT * FROM code_tbl`, (error, results) => {
      db.query("select * from boardtype", (err, boardtyperesult) => {
        var context;
        if (error) {
          throw error;
        }
        var result = "";
        var options = "";
        results.forEach((data) => {
          options += `<option value="${data.sub_id}">${data.sub_name}</option>`;
        });
        console.log(options);

        var context = {
          menu: "menuForManager.ejs",
          who: req.session.name,
          body: "merchandiseCU.ejs",
          logined:
            req.session.class === "00" // 경영진
              ? "00"
              : req.session.class === "01" // 관리자
              ? "01"
              : req.session.class === "02" // 일반
              ? "02"
              : "",
          options: options,
          result: "",
          coderesult: results,
          create: "yes",
          boardtypes: boardtyperesult,
        };
        res.render("home", context);
      });
    });
  },
  create_process: (req, res, file) => {
    const body = req.body;
    db.query(
      "insert into merchandise(category, name, price, stock, brand, supplier, image, sale_yn, sale_price) values(?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        body.category,
        body.name,
        body.price,
        body.stock,
        body.brand,
        body.supplier,
        file,
        body.sale_yn,
        body.sale_price,
      ],
      (err, results) => {
        if (err) {
          throw err;
        }
        res.writeHead(302, { Location: `/` });
        res.end();
      }
    );
  },
  update: (req, res) => {
    var options = "";
    db.query("select * from code_tbl", (err, coderesult) => {
      db.query("select * from boardtype", (boarderr, boardtyperesult) => {
        db.query(
          "select * from merchandise where mer_id =?",
          [req.params.merId],
          (err, result) => {
            var context = {
              menu: "menuForManager.ejs",
              who: req.session.name,
              body: "merchandiseCU.ejs",
              logined:
                req.session.class === "00" // 경영진
                  ? "00"
                  : req.session.class === "01" // 관리자
                  ? "01"
                  : req.session.class === "02" // 일반
                  ? "02"
                  : "",
              options: options,
              result: result,
              coderesult: coderesult,
              create: "",
              boardtypes: boardtyperesult,
            };
            res.render("home", context);
          }
        );
      });
      coderesult.forEach((data) => {
        options += `<option value="${data.sub_id}">${data.sub_name}</option>`;
      });
    });
  },
  update_process: (req, res, file) => {
    var body = req.body;
    console.log(body);
    db.query(
      "update merchandise set category=?, name=?, price=?, stock=?, brand=?, supplier=?, image=?, sale_yn=?, sale_price=? where mer_id = ?",
      [
        body.category,
        body.name,
        body.price,
        body.stock,
        body.brand,
        body.supplier,
        file,
        body.sale_yn,
        body.sale_price,
        body.mer_id,
      ],
      (err, results) => {
        if (err) {
          throw err;
        }

        res.writeHead(302, { Location: `/merchandise/view/u` });
        res.end();
      }
    );
  },
  delete_process: (req, res) => {
    var merId = req.params.merId;
    db.query(
      "delete from merchandise where mer_id = ?",
      [merId],
      (err, results) => {
        if (res) res.writeHead(302, { Location: `/merchandise/view/u` });
        res.end();
      }
    );
  },
};
