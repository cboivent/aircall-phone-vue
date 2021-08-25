import ACNote from '../components/ACNote.vue';

export default {
  title: 'Components/ACNote',
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ACNote },
  template: '<ACNote v-bind="$props" />'
})

export const Defaut = Template.bind({});
Defaut.args = {
  note: {
    id: 1,
    content: 'note content'
  }
}
