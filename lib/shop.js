// 201935250 김현중

var db = require("./db");
function authIsOwner(req, res) {
  if (req.session && req.session.is_logined) {
    return true;
  } else {
    return false;
  }
}
module.exports = {
  home: (req, res) => {
    db.query("select * from merchandise", (error, results) => {
      db.query("select * from boardtype", (err, boardtyperesult) => {
        if (error) {
          throw error;
        }
        var result = "";
        results.forEach((data) => {
          result += `
          <tr>
            <td><img src="${data.image}" style="width: 100px; height: 100px" /></td>
            <td>${data.name}</td>
            <td>${data.price}</td>
            <td>${data.brand}</td>
          </tr>`;
        });

        var isOwner = authIsOwner(req, res);
        if (isOwner) {
          if (req.session.class === "01") {
            var context = {
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
          } else if (req.session.class === "02") {
            var context = {
              menu: "menuForCustomer.ejs",
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
          }
        } else {
          var context = {
            menu: "menuForCustomer.ejs",
            who: "손님",
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
        }
        req.app.render("home", context, (err, html) => {
          res.end(html);
        });
      });
    });
  },
};
