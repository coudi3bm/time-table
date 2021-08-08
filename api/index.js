import express from 'express'
import cookieParser from 'cookie-parser'
import { middleware } from "./utils"
import { SubDivisions } from "./db"
import auth from './routes/auth'
import db from './routes/db'
import admin from './routes/admin'
import groups from './routes/groups'
import teachers from './routes/teachers'

const app = express()
app.disable('x-powered-by')
app.use(express.json({ limit: '10mb' }))
app.use(cookieParser())

app.use('/auth', auth)
app.use('/admin', middleware.requireAuthenticationAdmin, admin)
app.use('/:subDivision/db', [middleware.subDivisionExist, middleware.requireAuthentication], db)
app.use('/:subDivision/groups', middleware.subDivisionExist, groups)
app.use('/:subDivision/teachers', middleware.subDivisionExist, teachers)
app.get('/subDivisions', async function (req, res) {
    const subDivisions = await SubDivisions.findAll({
        attributes: ['name'],
    })
    res.json(subDivisions.map(subDivision => subDivision.name))
})

app.get('/test', function (req, res) {
    res.send("message: hello world")
})
app.get('/testAuth', [middleware.requireAuthentication], function (req, res) {
    res.send("secure message: hello world")
})
app.get('/testAdminAuth', middleware.requireAuthenticationAdmin, function (req, res) {
    res.send("secure message: hello admin")
})
app.get('/:subDivision/testEditorAuth', [middleware.subDivisionExist, middleware.requireAuthenticationEditor], function (req, res) {
    res.send("secure message: hello editor")
})

export default {
    path: '/api',
    handler: app
}