import Vue from 'vue'

export const state = () => ({
    list: []
})

export const mutations = {
    set(state, payload) {
        state.list = payload
    },
    add(state, payload) {
        state.list.push(payload)
    },
    remove(state, payload) {
        const index = state.list.findIndex((item) => item === payload)
        state.list.splice(index, 1)
    },
    update(state, payload) {
        const index = state.list.findIndex((item) => item === payload.oldValue)
        Vue.set(state.list, index, payload.newValue)
    }
}