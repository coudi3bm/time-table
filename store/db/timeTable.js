import Vue from 'vue'

export const state = () => ({
    groups: []
})

export const mutations = {
    set(state, payload) {
        state.groups = payload
    },
    add(state, payload) {
        Vue.set(state.groups, payload.groupName, payload.groupTimeTable)
    },
    remove(state, payload) {
        Vue.delete(state.groups, payload)
    },
    updateLessons(state, payload) {
        Vue.set(state.groups[payload.group][payload.day][payload.index], 'lessons', payload.lessons)
        Vue.set(state.groups[payload.group][payload.day][payload.index], 'type', payload.type)
    }
}

export const getters = {
    getByDay: state => (group, day) => {
        return state.groups[group][day]
    }
}