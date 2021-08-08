export default {
    daysOfWeek: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
    months: [
        'января', 'февраля', 'марта', 'аперля', 'мая', 'июня',
        'июля', 'августа', 'сентября', 'октября', 'ноября',
        'декабря'
    ],

    getClearDate(date) {
        date.setHours(0, 0, 0, 0)
        return date
    },

    getPairtyOfWeek(date) {
        return this.getWeekNumber(this.getWeekStartEndDays(date).start) % 2 === 0 ? 'Четная' : 'Нечетная'
    },

    getDaysOfWeekTo(day) {
        const index = this.daysOfWeek.findIndex((item) => item === day)
        return this.daysOfWeek.slice(0, index + 1)
    },

    getMonthName(date) {
        return this.months[date.getMonth()]
    },

    getWeekNumber(date) {
        let d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
        let dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
        return Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
    },

    getWeekStartEndDays(date) {
        let first = date.getDate() - date.getDay() + 1
        let last = first + 6

        let firstDay = new Date(date.setDate(first))
        let lastDay = new Date(date.setDate(last))
        return { start: firstDay, end: lastDay }
    }
}