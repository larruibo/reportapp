LocalStrategy = require("passport-local").Strategy;

async function initialize(passport, getUserByEmail) {
  const authenticateUser = (email, password, done) => {
    const usuario = getUserByEmail(email).then(arreglo => {
      const user = arreglo[0];

      if (user == null) {
        return done(null, false);
      }
      if (user.password === password) {
        console.log("holiii", user);
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  };

  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser((user, done) => {});
  passport.deserializeUser((id, done) => {});
}

module.exports = initialize;
