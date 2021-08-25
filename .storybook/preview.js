import Vue from 'vue';
import VueMoment from 'vue-moment';
import '@/filters'

Vue.use(VueMoment)

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}