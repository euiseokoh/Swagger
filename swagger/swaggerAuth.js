const swaggereJsdoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        info: {
            title: 'Swagger-Sample API',
            version: '1.0.0',
            description: `인증 API`,
        },
        host: "http://localhost:3000",
        basePath: "/v1"
        
    },
    apis: ['./routes/*.js', './swagger/authSwagger.yaml']
};

const specstest = swaggereJsdoc(options);

module.exports = specstest