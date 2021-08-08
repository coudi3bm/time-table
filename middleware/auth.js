export default function ({ $auth, store, $cookies }) {
    store.commit('auth/setNeedAuth', { needAuth: true })
    if (store.state.auth.loggedIn === false && $cookies.get('auth.password')) {
        return $auth.login({ password: $cookies.get('auth.password') })
            .then(() => { })
            .catch((err) => { })
    }
}