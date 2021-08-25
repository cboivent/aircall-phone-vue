import ACNotesList from '../components/ACNotesList.vue';

export default {
  title: 'Components/ACNotesList',
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ACNotesList },
  template: '<ACNotesList v-bind="$props" />'
})

export const Defaut = Template.bind({});
Defaut.args = {
  notes: [
    {
      id: 1,
      content: 'Lorem ipsum #1'
    },
    {
      id: 2,
      content: 'Lorem ipsum #2'
    },
    {
      id: 3,
      content: 'Lorem ipsum #3'
    },
  ]
}
