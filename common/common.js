var common = {

	setResultInfo: function (code, message, record) {
		var response = '{"messageInfo": {"code":"' + code + '", "message":"' + message + '"}';
		if (record === "") {
			return response + '}';
		}
		return response + ', "record":' + JSON.stringify(record) + '}';
	},
	
	sleep: function(ms){
		return new Promise(resolve => setTimeout(resolve, ms));
	},

	setReturnInfo: function (code, message, record) {
		var response = '{"result": {"code":"' + code + '", "message":"' + message + '"}';
		if (record === "") {
			return response + '}';
		}
		return response + ', "record":' + JSON.stringify(record) + '}';
	},

}
module.exports = common;
