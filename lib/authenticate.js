const LocalStrategy = require("passport-local").Strategy;
const pool = require("../db/pool");
const bcrypt = require("bcryptjs");

function usePassport(passport) {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const { rows } = await pool.query(
          "SELECT * FROM users WHERE email = $1",
          [username],
        );
        const user = rows[0];
        if (!user) {
          return done(null, false, { message: "user dont exist" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false, { message: "incorrect password" });
        }
        return done(null, user);
      } catch (err) {
        done(err);
      }
    }),
  );

  passport.serializeUser((user, done) => {
    done(null, user.u_id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const { rows } = await pool.query("SELECT * FROM users WHERE u_id = $1", [
        id,
      ]);
      const user = rows[0];
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
  return;
}

module.exports = { usePassport };
