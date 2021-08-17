<template>
  <div class="ac-login">
    <div class="ac-login-header">
      <h1>{{title}}</h1>
    </div>
    <div class="ac-login-body">
      <form action="POST" @submit.prevent="submitLogin">
        <label for="username">username</label>
        <input
          type="text"
          name="username"
          v-model="authDetails.username"
        />
        <div>
          <label for="password">password</label>
          <input
            type="password"
            name="password"
            v-model="authDetails.password"
          />
        </div>
        <button type="submit" class="ac-button primary">Log in</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    title: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      authDetails: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    submitLogin() {
      this.$emit('submitLogin', this.$data.authDetails)
    }
  }
})
</script>

<style lang="scss" scoped>
.ac-login {
  margin: 0 auto;
  width: 340px;

  &-header {
    h1 {
      font-size: 1.5em;
      font-weight: 300;
      letter-spacing: -.5px;
    }
  }

  &-body {
    padding: 20px;
    background-color: $neutral-color-lighter;
    border: 1px solid $neutral-color;
    border-radius: $border-radius-default;
  }
}
</style>
