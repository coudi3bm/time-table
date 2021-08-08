export const state = () => ({
    loggedIn: false,
    needAuth: false,
})

export const mutations = {
    set(state, payload) {
        state.loggedIn = payload.loggedIn
    },
    setNeedAuth(state, payload) {
        state.needAuth = payload.needAuth
    }
}

export const actions = {}