const bcrypt = require("bcryptjs");
const User = require("../Users/User.model");
const jwt = require("jsonwebtoken");
const keys = require("../../../config");

/**
 * Registrar un usuario nuevo.
 * @param {Object} request - objeto request.
 * @param {Object} response - objeto response.
 */
exports.signUpUser = (request, response) => {
  const user = User.findOne({ email: request.body.email });
  if (user) return response.status(400).json({ error: "el usuario ya existe" });
  const newUser = new User(request.body);
  // Hash password
  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser
        .save()
        .then((response) => response.json())
        .catch((err) => console.log(err));
    });
  });
};

/**
 * Iniciar sesion.
 * @param {Object} request - objeto request.
 * @param {Object} response - objeto response.
 */
exports.loginUser = (request, response) => {
  const email = request.body.email;
  const password = request.body.password;

  try {
    User.findOne({ email }).then((user) => {
      if (!user) return response.status(404).json({ error: "email no existe" });

      bcrypt.compare(password, user.password).then((match) => {
        if (match) {
          const payload = {
            id: user.id,
            name: user.nombre,
          };

          jwt.sign(
            payload,
            keys.jwtSecret,
            { expires: 12345 },
            (err, token) => {
              if (err) throw err;
              response.json({
                status: true,
                token: token,
              });
            },
          );
        } else {
          return response.status(400).json({ error: "Contraseña incorrecta" });
        }
      });
    });
  } catch (error) {
    console.log(error);
    return response.status(400).json({ error });
  }
};
