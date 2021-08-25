import ACLogin from '../components/ACLogin.vue';

export default {
  title: 'Components/ACLogin',
  argTypes: {
    submitLogin: { action: 'login' }
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ACLogin },
  template: '<ACLogin @submitLogin="submitLogin" v-bind="$props" />'
})

export const Defaut = Template.bind({});
Defaut.args = {
  title: 'Sign in'
}
