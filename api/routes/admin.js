import { Router } from 'express'
import { SubDivisions } from "../db"

const router = Router()

router.get('/', async function (req, res) {
    const subDivisions = await SubDivisions.findAll()
    res.json(subDivisions)
})

router.post('/', async function (req, res) {
    const subDivision = await SubDivisions.create({
        name: req.body.name,
        password: req.body.password,
        data: { lessons: [], teachers: [], lunchTimes: [], callTimes: [] }
    })
    res.status(200).json(subDivision)
})

router.put('/:id', async function (req, res) {
    const subDivision = await SubDivisions.findByPk(req.params.id)
    await subDivision.update({ name: req.body.name, password: req.body.password })
    res.json(subDivision)
})

router.delete('/:id', async function (req, res) {
    const subDivision = await SubDivisions.destroy({
        where: {
            id: req.params.id,
        }
    });
    if (subDivision) {
        res.status(200).json({ status: 200, message: 'subDivision removed' })
    } else {
        res.status(500).json({ status: 500, message: 'delete error' })
    }
})

export default router