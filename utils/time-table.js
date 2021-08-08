import DateUtil from "./date-util"

export default {
    pairSplitTypeText: {
        'Одно': 'Simple',                       // 0
        'Группа': 'Group',                      // 1
        'Четность': 'Parity',                   // 2
        'Группа + Четность': 'Group_Parity',    // 3
        'Группа 1 + Четность': 'Parity_Left',   // 4
        'Группа 2 + Четность': 'Parity_Right',  // 5
        'Группа + НЧ': 'Group_Up',              // 6
        'Группа + Ч': 'Group_Down'              // 7
    },
    pairSplitType: [
        'Simple',          // 0
        'Group',           // 1
        'Parity',          // 2
        'Group_Parity',    // 3
        'Parity_Left',     // 4
        'Parity_Right',    // 5
        'Group_Up',        // 6
        'Group_Down'       // 7
    ],
    splitTable: {
        'Simple': [{ group: 'all', parity: 'Каждая' }],
        'Group': [{ group: '1', parity: 'Каждая' }, { group: '2', parity: 'Каждая' }],
        'Parity': [{ group: 'all', parity: 'Нечетная' }, { group: 'all', parity: 'Четная' }],
        'Group_Parity': [{ group: '1', parity: 'Нечетная' }, { group: '2', parity: 'Нечетная' }, { group: '1', parity: 'Четная' }, { group: '2', parity: 'Четная' }],
        'Parity_Left': [{ group: '1', parity: 'Нечетная' }, { group: '1', parity: 'Четная' }, { group: '2', parity: 'Каждая' }],
        'Parity_Right': [{ group: '1', parity: 'Каждая' }, { group: '2', parity: 'Нечетная' }, { group: '2', parity: 'Четная' }],
        'Group_Up': [{ group: '1', parity: 'Нечетная' }, { group: '2', parity: 'Нечетная' }, { group: 'all', parity: 'Четная' }],
        'Group_Down': [{ group: 'all', parity: 'Нечетная' }, { group: '1', parity: 'Четная' }, { group: '2', parity: 'Четная' }],
    },

    getSplitTableFromLesson(lessons) {

    },

    getPairTypeFromNumber(number) {
        return this.pairSplitType[number]
    },

    getPairTypeNumberFromString(string) {
        return this.pairSplitType.findIndex((item) => item === string)
    },

    getLesson(lesson) {
        return `${lesson.name} ${lesson.name || lesson.teacher ? '/' : ''} ${lesson.teacher}`
    },

    createLesson() {
        return {
            name: '',
            teacher: '',
            room: '',
            group: 'all',
            parity: 'Каждая',
        }
    },

    createLessons(type) {
        return [...this.splitTable[type]].map(split => {
            return { ...split, name: '', teacher: '', room: '' }
        })
    },

    createPair() {
        return {
            number: 0,
            type: 0,
            lessons: [
                {
                    name: '',
                    teacher: '',
                    room: '',
                    group: 'all',
                    parity: 'Каждая',
                }
            ]
        }
    },

    createDay(length) {
        let day = []
        for (let i = 0; i < length; i++) {
            let pair = { ...this.createPair() }
            pair.number = i + 1
            day.push(pair)
        }
        return day
    },

    createGroup(days) {
        let group = {}
        for (let day of days) {
            group[day] = this.createDay(5)
        }
        return group
    },

    optimizeTimeTableForParityAndSubGroup(timeTable, parity, group) {
        // ...
        for (const day in timeTable) {
            for (const pair in timeTable[day]) {
                if (timeTable[day][pair].type == 2) {
                    timeTable[day][pair].type = 0
                } else if (timeTable[day][pair].type == 6 && parity === 'Четная') {
                    timeTable[day][pair].type = 0
                } else if (timeTable[day][pair].type == 7 && parity === 'Нечетная') {
                    timeTable[day][pair].type = 0
                } else if (timeTable[day][pair].type >= 3) {
                    timeTable[day][pair].type = 1
                }

                if (group !== 'all') {
                    timeTable[day][pair].type = 0
                }
                for (const lesson in timeTable[day][pair].lessons) {
                    if ((timeTable[day][pair].lessons[lesson].parity !== 'Каждая' && timeTable[day][pair].lessons[lesson].parity !== parity) || (group !== 'all' && timeTable[day][pair].lessons[lesson].group !== 'all' && String(timeTable[day][pair].lessons[lesson].group) !== group)) {
                        timeTable[day][pair].lessons[lesson] = null
                    }
                }
                timeTable[day][pair].lessons = timeTable[day][pair].lessons.filter((item) => item !== null)

                if (timeTable[day][pair].lessons.length == 0) {
                    timeTable[day][pair].lessons.push({
                        name: '',
                        teacher: '',
                        room: '',
                        group: 'all',
                        parity: 'Каждая',
                    })
                }
            }
        }
        return timeTable
    },

    optimizeReplacementsForActualDays(replacements) {
        let items = {}
        let haveActulalDays = false
        let currentDate = DateUtil.getClearDate(new Date())
        let tomorrowDate = DateUtil.getClearDate(new Date())
        tomorrowDate.setDate(tomorrowDate.getDate() + 1)
        for (let day in replacements) {
            const date = DateUtil.getClearDate(new Date(day)).getTime()
            if (date == currentDate.getTime() || date == tomorrowDate.getTime()) {
                haveActulalDays = true
            }
            if (date > currentDate.getTime()) {
                items[day] = replacements[day]
            }
        }
        return { replacements: items, haveActulalDays: haveActulalDays, }
    },

    optimizeDayForTeacher(timeTable, teacher, day) {
        // Здесь мы заполняем массив pairs и pairs[i].lessons всеми
        // уроками у которых teacher соответствует заданному
        let empty = true
        let pairs = []
        for (let group in timeTable) {
            if (!(day in timeTable[group]))
                continue
            for (let [i, pair] of timeTable[group][day].entries()) {
                let lessons = []
                for (let [j, lesson] of pair.lessons.entries()) {
                    if (lesson.teacher === teacher) {
                        empty = false
                        lesson.teacher = group
                        lessons.push(lesson)
                    }
                }
                if (pairs.length - 1 < i) {
                    pairs.push({ ...this.createPair(), number: pair.number, lessons: [] })
                }
                if (lessons.length > 0) {
                    pairs[i].lessons = [...pairs[i].lessons, ...lessons]
                }
            }
        }
        if (empty) {
            return null
        } else {
            //console.log(pairs)
            let typedPairs = JSON.parse(JSON.stringify(pairs))
            // Далее мы должны найти соотнести this.splitTable и pair.lessons
            for (let pair of typedPairs) {
                for (let splitType in this.splitTable) {
                    let count = 0
                    const splitTypeNumber = this.getPairTypeNumberFromString(splitType)
                    const lessons = [this.createLesson(), this.createLesson(), this.createLesson(), this.createLesson()]
                    for (let lesson of pair.lessons) {
                        for (let [i, split] of this.splitTable[splitType].entries()) {
                            if (split.group === String(lesson.group) && split.parity === String(lesson.parity)) {
                                lessons[i] = { ...lesson, group: split.group, parity: split.parity }
                                count++
                            } else {
                                lessons[i].group = split.group
                                lessons[i].parity = split.parity
                            }
                        }
                    }
                    if (count === pair.lessons.length) {
                        lessons.splice(this.splitTable[splitType].length)
                        pair.type = this.getPairTypeNumberFromString(splitType)
                        pair.lessons = lessons
                    }
                }
            }
            //console.log(typedPairs)
            return typedPairs
        }
    }
}