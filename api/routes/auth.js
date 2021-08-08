import { Router } from 'express'
import { config } from "../utils"
import { SubDivisions } from "../db"

const router = Router()

router.post('/login', async function (req, res) {
    if (config.api_token === req.body.password) {
        res.status(200).json({ status: 200, message: 'success' })
    } else {
        if (req.query.subDivision) {
            const subDivision = await SubDivisions.findOne({ where: { name: req.query.subDivision } })
            if (req.body.password === subDivision.password) {
                res.status(200).json({ status: 200, message: 'success' })
            } else {
                res.status(403).json({ status: 403, message: 'bad password' })
            }
        } else {
            res.status(403).json({ status: 403, message: 'bad password' })
        }
    }
})

export default router