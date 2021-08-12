<template>
  <div class="login">
    <div class="login-wrapper">
      <ACLogin @submitLogin="loginUser" :title="title" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"

import AircallService from "@/services/AircallService"
import ACLogin from '@/components/ACLogin.vue'

@Component({
  components: {
    ACLogin
  },
  data() {
    return {
      title: 'Sign in to ACPhone',
    }
  },
  methods: {
    loginUser: async function({username, password}) {
      console.log('[Login] log in')
      //
      const authResponse = await AircallService.login(username, password)
      //
      await this.$store.dispatch('login', { token: authResponse.access_token, user: authResponse.user })
      await this.$router.push({ name: 'home' })
    },
  },
})
export default class Login extends Vue {}
</script>

<style scoped>
.login {
  height: 100%;
  padding-top: 150px;
}
</style>
