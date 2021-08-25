import ACCall from '../components/ACCall.vue';

export default {
  title: 'Components/ACCall',
  component: ACCall,
  argTypes: {
    clickOnArchiveCall: { action: 'archive note' },
    submitNoteCall: { action: 'submit note' },
    call: {
      table: {
        disable: true,
      }
    },
    callType: {
      control: {
        type: 'select',
      },
      options: [
        'voicemail',
        'missed',
        'answered',
      ]
    },
    direction: {
      control: {
        type: 'select',
      },
      options: [
        'inbound',
        'outbound',
      ]
    },
    createdAt: {
      control: {
        type: 'date'
      }
    }
  }
};

const Template = (args, { argTypes }) => {
  args.call.notes = args.notes
  args.call.created_at = args.createdAt
  args.call.is_archived = args.isArchived
  args.call.call_type = args.callType
  args.call.direction = args.direction
  args.call.from = args.from
  args.call.to = args.to
  args.call.via = args.via
  args.call.duration = args.duration
  return {
    props: Object.keys(argTypes),
    components: { ACCall },
    template: '<ACCall @clickOnArchiveCall="clickOnArchiveCall" @submitNoteCall="submitNoteCall" :call="call" />'
  }
}

export const Defaut = Template.bind({});
Defaut.args = {
  call: {
    id: 1,
  },
  notes: [{
    id: 11,
    content: 'lorem ipsum'
  }],
  createdAt: Date.now(),
  isArchived: false,
  callType: 'answered',
  direction : 'inbound',
  from: '+33123456789',
  to: '+33987654321',
  via: '+33121314151',
  duration: 10000,
}
