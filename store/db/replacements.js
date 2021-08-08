import Vue from 'vue'

export const state = () => ({
    groups: []
})

export const mutations = {
    set(state, payload) {
        state.groups = payload
    },
    add(state, payload) {
        if (payload.groupName in state.groups === false) {
            Vue.set(state.groups, payload.groupName, {})
        }
        for (const date of payload.dates) {
            Vue.set(state.groups[payload.groupName], date, payload.groupReplacements)
        }
    },
    remove(state, payload) {
        for (const date of payload.dates) {
            Vue.delete(state.groups[payload.groupName], date)
        }
        if (Object.keys(state.groups[payload.groupName]).length === 0) {
            Vue.delete(state.groups, payload.groupName)
        }
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