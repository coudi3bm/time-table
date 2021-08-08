export const state = () => ({
    scheduleFilter: {
        parity: false,
        subgroup: 'all',
    },
    selectedNames: {
        teacher: '',
        group: ''
    }
})

export const mutations = {
    set(state, payload) {
        state.scheduleFilter = payload.scheduleFilter
        state.selectedNames = payload.selectedNames
    },
    setScheduleFilter(state, payload) {
        if (payload.parity !== undefined)
            state.scheduleFilter.parity = payload.parity
        if (payload.subgroup !== undefined)
            state.scheduleFilter.subgroup = payload.subgroup
    },
    setSelectedNames(state, payload) {
        if (payload.teacher !== undefined)
            state.selectedNames.teacher = payload.teacher
        if (payload.group !== undefined)
            state.selectedNames.group = payload.group
    }
}

export const actions = {}