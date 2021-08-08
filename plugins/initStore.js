function extend(app, mixin) {
    if (!app.mixins) {
        app.mixins = []
    }
    app.mixins.push(mixin)
}

export default async function ({ app, store, $cookies, isDev }) {
    extend(app, {
        beforeCreate() {
            const settings = $cookies.get('settings')
            if (settings) {
                store.commit('settings/set', settings)
            }
        }
    })
}