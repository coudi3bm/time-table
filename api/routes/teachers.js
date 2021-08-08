import { Router } from 'express'
import { Teachers } from "../db"

const router = Router()

router.get('/', async function (req, res) {
    let data = {}
    if (req.query.onlyNames === 'true') {
        const teachers = await Teachers.findAll({
            where: { subDivisionId: res.locals.subDivision.id },
            attributes: ['name'],
            raw: true
        })
        data = teachers.map(teacher => teacher.name)
    } else {
        const teachers = await Teachers.findAll({
            where: { subDivisionId: res.locals.subDivision.id },
        })
        for (let teacher of teachers) {
            data[teacher.name] = { timeTable: teacher.timeTable, replacements: teacher.replacements, lastUpdatedAt: teacher.lastUpdatedAt }
        }
    }
    res.json(data)
})

router.get('/:name', async function (req, res) {
    const teacher = await Teachers.findOne({
        where: { name: req.params.name, subDivisionId: res.locals.subDivision.id },
    })
    if (teacher) {
        res.json({ timeTable: teacher.timeTable, replacements: teacher.replacements, lastUpdatedAt: teacher.lastUpdatedAt })
    } else {
        res.status(404).json({ status: 404, message: 'teacher not found' })
    }
})

export default router