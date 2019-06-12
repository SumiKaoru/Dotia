import Router from 'koa-router'

// 라우터
import auth from './auth'
import post from './post'
import profile from './profile'
import test from './test'

const api = new Router()

api.get('/', (ctx) => {
  ctx.body = 'API 분기점'
})

api.use('/auth', auth.routes())
api.use('/post', post.routes())
api.use('/profile', profile.routes())
api.use('/test', test.routes())

export default api