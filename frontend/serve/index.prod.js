const Koa = require('koa')
// middlewares
const catchError = require('./middlewares/catchError')
const responseTime = require('./middlewares/responseTime')
const cookie = require('./middlewares/cookie')
const useRouter = require('./middlewares/useRouter')
const useProdSSR = require('./middlewares/useSSR.prod')

const app = new Koa()
async function startApp(port) {
	app.use(catchError)
	app.use(responseTime)
	app.use(cookie)	
	await useRouter(app)
	await useProdSSR(app)
	
	app.listen(port, () => {
		console.log(`server is listening in http://localhost:${port}`)
	})
}

startApp(9000)