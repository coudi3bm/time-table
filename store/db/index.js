export const actions = {
    async fetch(context, payload) {
        const db = await this.$axios.$get(`/api/${encodeURI(payload)}/db`)
        context.commit('lessons/set', db.lessons)
        context.commit('teachers/set', db.teachers)
        context.commit('lunchTimes/set', db.lunchTimes)
        context.commit('callTimes/set', db.callTimes)
        context.commit('timeTable/set', db.timeTable)
        context.commit('replacements/set', db.replacements)
    },
}