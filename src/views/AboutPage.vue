<template>
  <div class="about">
    <div class="about-wrapper">
      <div class="about-content">
        <div class="line">
          <h2>primary</h2>
          <div class="bloc grid-bloc">
            <div class="primary font-white">#00b388</div>
            <div class="primary-dark font-white">#006b51</div>
          </div>
        </div>
        <div class="line">
          <h2>secondary</h2>
          <div class="bloc grid-bloc">
            <div class="secondary font-white">#1e1852</div>
            <div class="secondary-dark font-white">#2c3e50</div>
          </div>
        </div>
        <div class="line">
          <h2>warning</h2>
          <div class="bloc grid-bloc">
            <div class="warning">#fcbb26</div>
          </div>
        </div>
        <div class="line">
          <h2>neutral</h2>
          <div class="bloc grid-bloc">
            <div class="neutral-lighter">#f6f8fa</div>
            <div class="neutral">#dadadd</div>
            <div class="neutral-dark font-white">#6f6e77</div>
          </div>
        </div>
        <div class="line">
          <h2>font</h2>
          <span>Avenir, -apple-system, BlinkMacSystemFont, Helvetica Neue, Arial, sans-serif</span>
        </div>
        <div class="line">
          <h2>button</h2>
          <button type="button" class="ac-button">Default</button>
          <button type="button" class="ac-button primary">Primary</button>
          <button type="button" class="ac-button link">Link</button>
          <button type="button" class="ac-button simple">Simple</button>
        </div>
        <div class="line">
          <h2>form</h2>
          <label>Input</label>
          <input type="text" placeholder="My value">
        </div>
        <div class="line">
          <h2>badge</h2>
          <span class="badge">10</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"

@Component
export default class LoginPage extends Vue {}
</script>

<style lang="scss" scoped>
.line {
  max-width: 600px;
  margin: 15px auto;

  > h2 {
    text-align: left;
    text-transform: capitalize;
  }
}
.grid-bloc {
  display: flex;

  & > div {
    height: 150px;
    width: 200px;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;

    &.primary {
      background-color: $primary-color;
    }
    &.primary-dark {
      background-color: $primary-color-dark;
    }
    &.secondary {
      background-color: $secondary-color;
    }
    &.secondary-dark {
      background-color: $secondary-color-dark;
    }
    &.warning {
      background-color: $warning-color;
    }
    &.neutral-lighter {
      background-color: $neutral-color-lighter;
    }
    &.neutral {
      background-color: $neutral-color;
    }
    &.neutral-dark {
      background-color: $neutral-color-dark;
    }

    &.font-black {
      color: black;
    }
    &.font-white {
      color: white;
    }
  }
}
</style>
