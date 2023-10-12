const config = require("config");

const express = require("express");
const session = require("express-session");
const passport = require("passport");
require("./authentication");

const app = express();
app.use(session({ secret: "pets", resave: false, saveUninitialized: true }));
// setup passport
app.use(passport.initialize());
app.use(passport.session());

// login url - http://localhost:5000/
app.get("/", (req, res) => {
  //console.log("showing index page");
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/auth/failure"
  })
);

app.get("/protected", isLoggedIn, (req, res) => {
  //console.log("showing protected route");
  res.send(`Hello ${req.user.displayName}.<br/><a href="/logout">Logout</a>`);
});

app.get("/auth/failure", (req, res) => {
  //console.log("unauthorized user. invalid access");
  res.send("Authentication failed");
});

app.get("/logout", (req, res) => {
  //console.log("logging out");
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy();
    res.send('Thanks for visiting.<br/><a href="/">Login</a>');
  });
});

const port = config.get("port");
app.listen(port, () => console.log(`App listening on port ${port}`));

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}
