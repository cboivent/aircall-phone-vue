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
})
export default class LoginPage extends Vue {

  private title = 'Sign in to ACPhone'

  async loginUser(authDetails: {username: string, password: string}): Promise<void> {
    console.log('[LoginPage] log in')
    //
    const authResponse = await AircallService.login(authDetails.username, authDetails.password)
    //
    await this.$store.dispatch('login', { token: authResponse.access_token, user: authResponse.user })
    await this.$router.push({ name: 'home' })
  }

}
</script>

<style scoped>
.login {
  height: 100%;
  padding-top: 150px;
}
</style>
