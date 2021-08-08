import { Router } from 'express'
import { Groups, Teachers } from "../db"
import { objIsEmpty, getUnixTime } from '../../utils/index'

const router = Router()

router.get('/', async function (req, res) {
    const groups = await Groups.findAll({
        where: { subDivisionId: res.locals.subDivision.id }
    })
    let data = {
        timeTable: {},
        replacements: {},
        lessons: res.locals.subDivision.data.lessons,
        teachers: res.locals.subDivision.data.teachers,
        lunchTimes: res.locals.subDivision.data.lunchTimes,
        callTimes: res.locals.subDivision.data.callTimes
    }
    for (let group of groups) {
        data.timeTable[group.name] = group.timeTable
        if (!objIsEmpty(group.replacements)) {
            data.replacements[group.name] = group.replacements
        }
    }
    res.json(data)
})

router.post('/', async function (req, res) {
    await Groups.destroy({ where: { subDivisionId: res.locals.subDivision.id } })
    for (let group in req.body.groups.timeTable) {
        await Groups.create({
            name: group,
            subDivisionId: res.locals.subDivision.id,
            timeTable: req.body.groups.timeTable[group],
            replacements: group in req.body.groups.replacements ? req.body.groups.replacements[group] : {},
            lastUpdatedAt: Date.now()
        })
    }
    await Teachers.destroy({ where: { subDivisionId: res.locals.subDivision.id } })
    for (let teacher in req.body.teachers.timeTable) {
        await Teachers.create({
            name: teacher,
            subDivisionId: res.locals.subDivision.id,
            timeTable: req.body.teachers.timeTable[teacher],
            replacements: teacher in req.body.teachers.replacements ? req.body.teachers.replacements[teacher] : {},
            lastUpdatedAt: Date.now()
        })
    }
    res.locals.subDivision.update({
        data: req.body.lists,
    })
    res.json({ status: 200, message: 'success' })
})

export default router