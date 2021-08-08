import { SubDivisions } from "./db"

export const config = {
    api_token: process.env.API_TOKEN,
}

export const middleware = {
    subDivisionExist: async function (req, res, next) {
        const subDivision = await SubDivisions.findOne({ where: { name: req.params.subDivision } })
        if (subDivision) {
            res.locals.subDivision = subDivision
            next()
        } else {
            res.status(404).json({ status: 404, message: 'subDivision not found' })
        }
    },
    requireAuthenticationAdmin: function (req, res, next) {
        if (req.cookies['auth.password'] === config.api_token) {
            next()
        } else {
            res.status(403).json({ status: 403, message: 'bad password' })
        }
    },
    requireAuthenticationEditor: async function (req, res, next) {
        if (req.cookies['auth.password'] === res.locals.subDivision.password) {
            next()
        } else {
            res.status(403).json({ status: 403, message: 'bad password' })
        }
    },
    requireAuthentication: async function (req, res, next) {
        if (req.cookies['auth.password'] === config.api_token) {
            next()
        } else {
            if (req.params.subDivision) {
                const subDivision = await SubDivisions.findOne({ where: { name: req.params.subDivision } })
                if (req.cookies['auth.password'] === subDivision.password) {
                    next()
                } else {
                    res.status(403).json({ status: 403, message: 'bad password' })
                }
            } else {
                res.status(403).json({ status: 403, message: 'bad password' })
            }
        }
    },
}