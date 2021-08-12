<template>
  <div id="app">
    <header id="nav" v-if="authStatus">
      <div class="app-logo">ACPhone</div>
      <button type="button" class="ac-button simple" @click="logoutUser">Log Out</button>
    </header>
    <main>
      <router-view/>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { mapGetters } from 'vuex'
import AircallService from './services/AircallService'

@Component({
  computed: {
    ...mapGetters(['authStatus'])
  },
})
export default class App extends Vue {

  async logoutUser(): Promise<void> {
    console.log('[App] log out')
    //
    AircallService.closeWebSocket()
    //
    await this.$store.dispatch('logout')
    await this.$router.push('/login')
  }

}
</script>

<style lang="scss">
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $secondary-color;
  font-family: $default-font;
  text-align: center;
}

#nav {
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;

  a {
    font-weight: bold;
    color: $secondary-color-dark;
    text-decoration: none;

    &.router-link-exact-active {
      color: $primary-color;
    }
  }

  .app-logo {
    background-color: $secondary-color-dark;
    border-radius: $border-radius-default;
    color: white;
    font-weight: bold;
    padding: 10px 30px;
  }
}
main {
  padding: 20px;
}
#foot {
  border-top: 1px solid $secondary-color-dark;
  padding: 15px;
}
</style>
