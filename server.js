const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();

app.use(bodyParser.urlencoded({
    extended : false
}));

app.use(bodyParser.json());
app.use(passport.initialize());

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
     if (request.method === 'OPTIONS') {
         response.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
         return response.status(200).json({});
     }
     next();
});

app.use((err, request, response, next) => {
    if(err.name === 'UnauthorizedError') {
        response.status(401).send('No se encontro el token de authorizacion');
    }else {
        next(err);
    }
});


//Rutas de acceso y callbacks

app.use('/', (request, response) => {
    response.send('Holaaa');
});

app.listen(3000, () => console.log('Server ejecutandose en el puerto 3000'));




