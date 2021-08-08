import { Router } from 'express'
import { Groups } from "../db"

const router = Router()

router.get('/', async function (req, res) {
    let data = {}
    if (req.query.onlyNames === 'true') {
        const groups = await Groups.findAll({
            where: { subDivisionId: res.locals.subDivision.id },
            attributes: ['name'],
            raw: true
        })
        data = groups.map(group => group.name)
    } else {
        const groups = await Groups.findAll({
            where: { subDivisionId: res.locals.subDivision.id },
        })
        for (let group of groups) {
            data[group.name] = { timeTable: group.timeTable, replacements: group.replacements, lastUpdatedAt: group.lastUpdatedAt }
        }
    }
    res.json(data)
})

router.get('/:name', async function (req, res) {
    const group = await Groups.findOne({
        where: { name: req.params.name, subDivisionId: res.locals.subDivision.id },
    })
    if (group) {
        let lunchTimes = res.locals.subDivision.data.lunchTimes.find(item => item.groups.includes(req.params.name))
        if (!lunchTimes)
            lunchTimes = { start: '', end: '' }
        let callTimes = res.locals.subDivision.data.callTimes.find(item => item.groups.includes(req.params.name))
        if (!callTimes)
            callTimes = { calls: [] }
        res.json({
            timeTable: group.timeTable,
            replacements: group.replacements,
            lunchTimes: { start: lunchTimes.start, end: lunchTimes.end },
            callTimes: callTimes.calls,
            lastUpdatedAt: group.lastUpdatedAt
        })
    } else {
        res.status(404).json({ status: 404, message: 'group not found' })
    }
})

export default router