export default ({ store, $axios, $cookies, route }, inject) => {
    inject('auth', {
        async login(loginData) {
            return new Promise((resolve, reject) => {
                const subDivision = route.params.subDivision
                const path = '/api/auth/login' + (subDivision ? `?subDivision=${encodeURI(subDivision)}` : '')
                $axios.$post(path, loginData)
                    .then(async (res) => {
                        store.commit('auth/set', { loggedIn: true })
                        $cookies.set('auth.password', loginData.password, {
                            path: '/',
                            sameSite: 'Lax',
                        })
                        resolve(res)
                    })
                    .catch((err) => {
                        reject(err)
                    })
            })
        },
    })
}