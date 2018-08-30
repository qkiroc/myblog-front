const request = require('request');

function get (url, params) {
	return new Promise((resolve, reject)=>{
		let form = '?';
		for( key in params){
			form += key+"="+params[key]+"&"
		}
		request.get(url+form, (err, res, body)=>{
			console.log(body);
			resolve(body)
		})
	})
}

function post(url, params) {
	return new Promise((resolve, reject)=>{

		request.post(url,{form:params}, (err,res,body)=>{
			resolve(body);
		})
	})
}

module.exports.get = get;
module.exports.post = post;