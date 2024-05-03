const express = require("express");
const { expressJwt } = require("express-jwt");
const jwt = require("jsonwebtoken");
const compose = require("composable-middleware");
const validateJwt = expressJwt({
  secret: config.secretOrKey,
  algorithms: ["HS256"],
});
const User = require("../Users/User.model");

const autenticado = () => {
  return compose()
    .use((request, response, next) => {
      validateJwt(request, response, next);
      request.query.hasOwnProperty("access_token")
        ? (request.header.authorization = request.query.access_token)
        : response.status(400);
    })
    .use((request, response, next) => {
      const user = User.findById(request.auth.id);
      user ? (request.user = user) : response.status(401);
      next();
    });
};
