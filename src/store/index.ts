import { AUTH_TOKEN_NAME, HTTP_TIMER_REFRESH_TOKEN } from "@/constants/settings"
import { User } from "@/models/ACTypes"
import AircallService from "@/services/AircallService"
import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

let timerRefreshToken: number | undefined = undefined

const store = new Vuex.Store({
  state: {
    token: null as string | null,
    authStatus: false,
    user: {} as User,
  },
  getters: {
    token: (state) => state.token,
    isAuthenticated: (state) => !!state.token,
    authStatus: (state) => state.authStatus,
    user: (state) => state.user,
  },
  mutations: {
    REFRESH_TOKEN(state, token) {
      console.log('[Store] mutation REFRESH_TOKEN')
      state.token = token
      // save to storage
      localStorage.setItem(AUTH_TOKEN_NAME, token)
    },
    LOGIN_USER(state, { token, user }) {
      console.log('[Store] mutation LOGIN_USER')
      state.token = token
      state.authStatus = true
      state.user = { ...user } as User
      // save to storage
      localStorage.setItem(AUTH_TOKEN_NAME, token)
    },
    LOGOUT_USER(state) {
      console.log('[Store] mutation LOGOUT_USER')
      state.token = null
      state.authStatus = false
      state.user = {} as User
      // delete on storage
      localStorage.removeItem(AUTH_TOKEN_NAME)
    },
  },
  actions: {
    async login(context, { token, user }) {
      console.log('[Store] action login')
      context.commit('LOGIN_USER', { token, user })
      // start timer to refresh token
      timerRefreshToken = window.setInterval(async () => {
        console.log('[Store] ' + new Date().toLocaleTimeString() + ' - refresh token')
        const { access_token } = await AircallService.refreshToken()
        console.log(`[Store] new token is = ${access_token}`)
        context.commit('REFRESH_TOKEN', access_token)
      }, HTTP_TIMER_REFRESH_TOKEN)
    },
    async logout(context) {
      console.log('[Store] action logout')
      //
      clearInterval(timerRefreshToken)
      //
      await AircallService.clearStore()
      console.log('[Store] store clear!')
      context.commit('LOGOUT_USER')
    },
  },
})

export default store
