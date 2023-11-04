const db = require("./db");

module.exports = {
  view: (req, res) => {
    var context;
    db.query("select * from merchandise", (error, results) => {
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
        logined: "YES",
        result: result,
      };
      res.render("home", context);
    });
  },
  create: (req, res) => {
    db.query(`SELECT * FROM code_tbl`, (error, results) => {
      var context;
      if (error) {
        throw error;
      }
      var result = "";
      var options = "";
      results.forEach((data) => {
        options += `<option value="${data.sub_id}">${data.sub_name}</option>`;
      });

      var context = {
        menu: "menuForManager.ejs",
        who: req.session.name,
        body: "merchandiseCU.ejs",
        logined: "YES",
        options: options,
      };
      res.render("home", context);
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
    db.query("select * from code_tbl", (err, results) => {
      results.forEach((data) => {
        options += `<option value="${data.sub_id}">${data.sub_name}</option>`;
      });
      db.query(
        "select * from merchandise where mer_id =?",
        [req.params.merId],
        (err, result) => {
          var context = {
            menu: "menuForManager.ejs",
            who: req.session.name,
            body: "merchandiseCU.ejs",
            logined: "YES",
            options: options,
            result: result,
          };
          res.render("home", context);
        }
      );
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
        res.writeHead(302, { Location: `/merchandise/view/u` });
        res.end();
      }
    );
  },
};