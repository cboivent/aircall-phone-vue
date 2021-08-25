import ACList from '../components/ACList.vue';

export default {
  title: 'Components/ACList',
  component: ACList,
  argTypes: {
    clickOnArchiveBtn: { action: 'click on archive button' },
    clickOnItem: { action: 'click on item' },
    clickOnShowAll: { action: 'click on show all' },
    pageChange: { action: 'page change' },
  }
};

const Template = (args, { argTypes }) => {
  return {
    props: Object.keys(argTypes),
    components: { ACList },
    template: '<ACList @clickOnArchiveBtn="clickOnArchiveBtn" @clickOnItem="clickOnItem" @clickOnShowAll="clickOnShowAll" @pageChange="pageChange" v-bind="$props" />'
  }
}

export const Defaut = Template.bind({});
Defaut.args = {
  headers: [
    {
      key: 'created_at',
      value: 'Date',
      type: 'Date',
      format: 'DD/MM/YYYY HH:mm:ss',
      defaultSortKey: true,
    },
    {
      key: 'direction',
      value: 'Direction',
      type: 'String'
    },
    {
      key: 'from',
      value: 'From',
      type: 'PhoneNumber'
    },
    {
      key: 'to',
      value: 'To',
      type: 'PhoneNumber'
    },
  ],
  items: [
    {
      id: 1,
      notes: [],
      created_at: new Date().toISOString(),
      is_archived: true,
      call_type: 'answered',
      direction : 'inbound',
      from: '+33123456789',
      to: '+33987654321',
      via: '+33121314151',
      duration: 10000,
    },
    {
      id: 2,
      notes: [],
      created_at: new Date().toISOString(),
      is_archived: false,
      call_type: 'voicemail',
      direction : 'outbound',
      from: '+33123456789',
      to: '+33987654321',
      via: '+33121314151',
      duration: 20000,
    },
    {
      id: 3,
      notes: [],
      created_at: new Date().toISOString(),
      is_archived: true,
      call_type: 'missed',
      direction : 'inbound',
      from: '+33123456789',
      to: '+33987654321',
      via: '+33121314151',
      duration: 30000,
    },
    {
      id: 4,
      notes: [],
      created_at: new Date().toISOString(),
      is_archived: false,
      call_type: 'answered',
      direction : 'outbound',
      from: '+33123456789',
      to: '+33987654321',
      via: '+33121314151',
      duration: 40000,
    },
    {
      id: 5,
      notes: [],
      created_at: new Date().toISOString(),
      is_archived: true,
      call_type: 'voicemail',
      direction : 'inbound',
      from: '+33123456789',
      to: '+33987654321',
      via: '+33121314151',
      duration: 50000,
    },
    {
      id: 6,
      notes: [],
      created_at: new Date().toISOString(),
      is_archived: false,
      call_type: 'answered',
      direction : 'outbound',
      from: '+33123456789',
      to: '+33987654321',
      via: '+33121314151',
      duration: 60000,
    },
    {
      id: 7,
      notes: [],
      created_at: new Date().toISOString(),
      is_archived: true,
      call_type: 'missed',
      direction : 'inbound',
      from: '+33123456789',
      to: '+33987654321',
      via: '+33121314151',
      duration: 70000,
    },
  ]
}
