const swaggereJsdoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        info: {
            title: 'Swagger-Sample API',
            version: '1.0.0',
            description: `Login API`,
        },
        host: "http://localhost:3000",
        basePath: "/v1"
        
    },
    apis: ['./routes/*.js', './swagger/loginSwagger.yaml']
};

const specstest = swaggereJsdoc(options);

module.exports = specstest