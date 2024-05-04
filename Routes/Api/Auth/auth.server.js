const { expressJwt } = require("express-jwt");
const compose = require("composable-middleware");
const User = require("../Users/User.model");
const config = require("../../../config");
const validateJwt = expressJwt({
  secret: config.jwtSecret,
  algorithms: ["HS256"],
});

/**
 * funcion middleware de authenticacion
 * Valida el JWT y lo define en el objeto user dentro del request
 * @returns {Function} funcion middleware.
 */
const autenticado = () => {
  return compose()
    .use((request, response, next) => {
      validateJwt(request, response, next);
      Object.prototype.hasOwnProperty.call(request.query, "access_token")
        ? (request.header.authorization = request.query.access_token)
        : response.status(400);
    })
    .use((request, response, next) => {
      const user = User.findById(request.auth.id);
      user ? (request.user = user) : response.status(401);
      next();
    });
};

/**
 * Function para verificar si cumple con un rol minimo
 * @param {string} roleRequerido Role minimo requerido
 * @returns {Function} retorna una funcion middleware que verifica el rol del usuario
 */
const hasRole = (roleRequerido) => {
  if (!roleRequerido) throw new Error("Role requerido");

  return compose()
    .use(autenticado())
    .use((request, response, next) => {
      if (
        config.userRoles.indexOf(request.user.role) >=
        config.userRoles.indexOf(roleRequerido)
      ) {
        next();
      } else {
        response.send(403);
      }
    });
};

exports.autenticado = autenticado;
exports.hasRole = hasRole;
