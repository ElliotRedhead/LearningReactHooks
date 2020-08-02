const express = require("express");
const next = require("next");

var passport = require("passport");
var Strategy = require("passport-local").Strategy;

const dev = process.env.NODE_ENV !== "production";
const app1 = next({dev});
const handle = app1.getRequestHandler();

passport.use(
  new Strategy(function(username, password, done) {
    function validateUser(username, password) {
      return username === password;
    }
    return validateUser(username, password)
      ? done(null, {email:username})
      : done(false, false);
  })
);

passport.serializeUser(function(userInfo, done) {
  done(null, userInfo);
});

passport.deserializeUser(function(userInfo, cb) {
  cb(null, userInfo);
});

app1
  .prepare()
  .then(() => {
    const app = express();

    app.use(require("cookie-parser")());
    app.use(require("body-parser").urlencoded({extended:true}));
    app.use(
      require("express-session")({
        secret:"keyboard cat",
        resave: false,
        saveUninitialized: false
      })
    );

    // Initialize passport and restore authentication state from session.
    app.use(passport.initialize());
    app.use(passport.session());

    app.post(
      "/login",
      passport.authenticate("local", {failureRedirect: "/login"}),
      function(req, res) {
        res.redirect("/");
      }
    );

    app.get("/logout", (req, res) => {
      req.logout();
      res.redirect("/");
    });

    app.get("*", (req,res) => {
      return handle(req, res);
    });

    app.listen(3000, err => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });


