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
        state.list.splice(payload.index, 1)
    },
    update(state, payload) {
        Vue.set(state.list, payload.index, payload.value)
    },
    updateCalls(state, payload) {
        Vue.set(state.list[payload.callsIndex].calls, payload.index, payload.value)
    },
}