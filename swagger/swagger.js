const swaggerUi = require('swagger-ui-express');
const swaggereJsdoc = require('swagger-jsdoc');
//const swaggereCustomJs = require('swaggerCustom');

var serverUrl = ""
if(process.env.NODE_ENV === 'local'){
    serverUrl = "http://" + process.env.SERVERDOMAIN
}else{
    serverUrl = "https://" + process.env.SERVERDOMAIN
}

const options = {
    swaggerDefinition: {
        info: {
            title: 'Swagger-Sample API',
            version: '1.0.0',
            description: `Swagget-Sample API
                          <br/>
                          - API 문서 분리 Test : http://localhost:3000/v1/api-doc/login/
                          - API 문서 분리 Test : http://localhost:3000/v1/api-doc/auth/
                          <br/>
                          `,
            termsOfService: "",
            contact: {email: "esc.corp.test@gmail.com"}

        },
        host: process.env.SERVERDOMAIN,
        basePath: "/v1"
        
    },
    apis: ['./routes/*.js', './swagger/*.yaml']
};

const specs = swaggereJsdoc(options);

/**
    swaggerDoc?: JsonObject,
    opts?: SwaggerUiOptions,
    options?: SwaggerOptions,
    customCss?: string,
    customfavIcon?: string,
    swaggerUrl?: string,
    customSiteTitle?: string,
 */
var customOptions = {
    customCss: '.topbar {display:none;}',
    customfavIcon: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FHFHGp%2Fbtq6eGgZ6BJ%2FFT0lDq0hrrgU1rPaV6Yoi1%2Fimg.png',
    customSiteTitle : "Swagget-Sample Docs",
}


module.exports = {
    swaggerUi,
    specs,
    customOptions,
};