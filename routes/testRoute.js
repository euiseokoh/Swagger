var express = require('express');
var common = require('../common/common');
var logger = require('../common/logger');
var router = express.Router();
const { check, validationResult } = require('express-validator/check');
const response = require('../config/response');

let jwt = require("jsonwebtoken");
let secretObj = require("../config/jwt-key");


// push user info api list
// DB에 저장된 사용자 파이어 베이스 정보 조회
router.post('/login', testLogin);
router.post('/authApi', testAPI);

/*
 login Test
 **/
async function testLogin(req, res, next) {
	
	// default : HMAC SHA256
	// 비밀번호는 우선 맞다고 판단
	// pw : 1234
	
	// 로그인 완료시
	if(req.body.pw === "1234") {

		let token = jwt.sign({
			id: req.body.id   // 토큰의 내용(payload)
		  },
		  secretObj.secret ,    // 비밀 키
		  {
			expiresIn: '10m'    // 유효 시간은 5분
		});

		res.cookie("jwt_token", token);
		var data = {"token": token};
		res.end(common.setResultInfo(response.Success.code, response.Success.message, data));

	}else{
		res.end(common.setResultInfo(response.Etc.code, response.Etc.message, "Error!"));
	}


}

/*
 login Test
 **/
async function testAPI(req, res, next) {
	
	// 인자값으로 사용
	// 나중에는 헤더에 심거나 여러 방법으로 사용가능
	let token = req.body.jwt_token;

	let decoded = jwt.verify(token, secretObj.secret);
	// decoded 값 설정한 id, 시작(iat), 종료 시간(exp)
	if(decoded){
		res.end(common.setResultInfo(response.Success.code, response.Success.message, {"msg":"토큰이 존재하여 API 이용이 가능합니다."}));
	}
	else{
		res.end(common.setResultInfo(response.AuthError.code, response.AuthError.message, {"msg":"권한이 필요합니다."}));
	}


}

module.exports = router;