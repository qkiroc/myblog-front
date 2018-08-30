const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const request = require('./util/request');


const app = new Koa();


async function index(){
	let body = await request.get('http://127.0.0.1:9090',{data:123});
	body = body.replace(/\/index/g,"http://127.0.0.1:9090/index");
	return body;
}

app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

router.get("/", async (ctx, next) => {
    let body = await index();
	ctx.response.type = 'text/html';
	ctx.response.body = body;
});
router.get("/about", async (ctx, next) => {
    let body = await index();
	ctx.response.type = 'text/html';
	ctx.response.body = body;
});
router.get("/technology*", async (ctx, next) => {
    let body = await index();
	ctx.response.type = 'text/html';
	ctx.response.body = body;
});
router.get("/editor", async (ctx, next) => {
    let body = await index();
	ctx.response.type = 'text/html';
	ctx.response.body = body;
});

router.get('/static/*', async(ctx, next) => {
	let body = await request.get('http://127.0.0.1:9090/'+ctx.request.url);
	ctx.response.type = 'image/png';
	ctx.response.length = Buffer.byteLength(body);
	ctx.response.body = body;
})

router.get('/getHomeMessage', async(ctx, next) => {
	let body = await request.get('http://127.0.0.1:8080/getHomeMessage');
	ctx.response.body = JSON.parse(body);
})
router.get('/getTechnologyMessage', async(ctx, next) => {
	let body = await request.get('http://127.0.0.1:8080/getTechnologyMessage');
	ctx.response.body = JSON.parse(body);
})
router.get('/getAboutMessage', async(ctx, next) => {
	let body = await request.get('http://127.0.0.1:8080/getAboutMessage');
	ctx.response.body = JSON.parse(body);
})

router.get(/\/getArticle$/, async(ctx, next) => {
	let params = {
		type:ctx.request.query.type
	}
	if(ctx.request.query.subtype){
		params.subtype = ctx.request.query.subtype
	}
	let body = await request.get('http://127.0.0.1:8080/getArticle', params);
	ctx.response.body = JSON.parse(body);
})

router.get('/getClassify', async(ctx, next) => {
	let body = await request.get('http://127.0.0.1:8080/getClassify');
	ctx.response.body = JSON.parse(body);
})

router.get('/getArticleDetail', async(ctx, next) => {
	let body = await request.get('http://127.0.0.1:8080/getArticleDetail',{id:ctx.request.query.id});
	ctx.response.body = JSON.parse(body);
})

router.get('/getComment', async(ctx, next) => {
	let body = await request.get('http://127.0.0.1:8080/getComment',{id:ctx.request.query.id});
	ctx.response.body = JSON.parse(body);
})

router.post('/comment', async(ctx, next) => {
	let body = await request.post('http://127.0.0.1:8080/comment',{id:ctx.request.body.id,comment:ctx.request.body.comment});
	ctx.response.body = JSON.parse(body);
})

router.post('/commentLike', async(ctx, next) => {
	let body = await request.post('http://127.0.0.1:8080/commentLike',{id:ctx.request.body.id,type:ctx.request.body.type});
	ctx.response.body = JSON.parse(body);
})

router.post('/like', async(ctx, next) => {
	let body = await request.post('http://127.0.0.1:8080/like',{id:ctx.request.body.id,type:ctx.request.body.type});
	ctx.response.body = JSON.parse(body);
})

router.post('/collect', async(ctx, next) => {
	let body = await request.post('http://127.0.0.1:8080/collect',{id:ctx.request.body.id,type:ctx.request.body.type});
	ctx.response.body = JSON.parse(body);
})

router.post('/publish', async(ctx, next) => {
	let body = await request.post('http://127.0.0.1:8080/publish',{title:ctx.request.body.title,type:ctx.request.body.type,abstract:ctx.request.body.abstract,text:ctx.request.body.text});
	ctx.response.body = JSON.parse(body);
})

function timeout(){
	return new Promise((resolve,reject)=>{
		setTimeout(function(){resolve()}, 10000)
	})
}

app.use(bodyParser());
app.use(router.routes());
app.listen(8090);
console.log("server on 127.0.0.1:8090");