import { shallowMount } from '@vue/test-utils'
import ACCAll from '@/components/ACCAll.vue'
import ACNotesList from '@/components/ACNotesList.vue'
import { Call, CallType, Direction } from '@/models/ACTypes'
import { capitalize, convertMillisecondsToHumanReadableTime, formatPhoneNumber } from '@/filters/filters'
import moment from 'moment'

describe('ACCAll.vue', () => {
  it('render call cand check click on archive button', async () => {
    const newNoteMessage = 'my new note '
    const call: Call = {
      call_type: CallType.ANSWERED,
      created_at: '"2021-08-16T16:09:26.606Z"',
      direction: Direction.INBOUND,
      duration: 4000, // in milliseconds
      from: '+33123456789',
      id: Date.now(),
      is_archived: false,
      notes: [],
      to: '+33987654321',
      via: '+33234567890'
    }
    const wrapper = shallowMount(ACCAll, {
      propsData: { call },
      filters: {
        capitalize,
        convertMillisecondsToHumanReadableTime,
        formatPhoneNumber,
        moment
      }
    })
    // click on archive button
    await wrapper.find('.ac-call-archived button').trigger('click')
    // check event is triggered with value
    expect(wrapper.emitted('clickOnArchiveCall')).toBeTruthy()
    expect(wrapper.emitted('clickOnArchiveCall')?.length).toBe(1)
    expect(wrapper.emitted('clickOnArchiveCall')).toEqual([[call.id]])
    // set note value
    const noteInput = wrapper.find('.ac-call-notes form input')
    noteInput.setValue(newNoteMessage)
    // submit form to add note
    await wrapper.find('form').trigger('submit')
    // check event is triggered with values
    expect(wrapper.emitted('submitNoteCall')).toBeTruthy()
    expect(wrapper.emitted('submitNoteCall')?.length).toBe(1)
    expect(wrapper.emitted('submitNoteCall')).toEqual([[call.id, newNoteMessage]])
    // check note input was cleaned
    expect(noteInput.text()).toMatch('')
    //
  })
  it('render a full call', () => {
    const call: Call = {
      call_type: CallType.ANSWERED,
      created_at: '"2021-08-16T16:09:26.606Z"',
      direction: Direction.INBOUND,
      duration: 4000, // in milliseconds
      from: '+33123456789',
      id: 1,
      is_archived: false,
      notes: [],
      to: '+33987654321',
      via: '+33234567890'
    }
    const wrapper = shallowMount(ACCAll, {
      propsData: { call },
      filters: {
        capitalize,
        convertMillisecondsToHumanReadableTime,
        formatPhoneNumber,
        moment
      }
    })
    //
    expect(wrapper.find('.ac-call-createdat').exists()).toBe(true)
    expect(wrapper.find('.ac-call-createdat').text()).toMatch(moment(new Date(call.created_at)).format('DD/MM/YYYY HH:mm:ss'))
    //
    expect(wrapper.find('.ac-call-direction').exists()).toBe(true)
    expect(wrapper.find('.ac-call-direction').text()).toMatch(capitalize(call.direction))
    //
    expect(wrapper.find('.ac-call-from').exists()).toBe(true)
    expect(wrapper.find('.ac-call-from').text()).toMatch(formatPhoneNumber(call.from))
    //
    expect(wrapper.find('.ac-call-to').exists()).toBe(true)
    expect(wrapper.find('.ac-call-to').text()).toMatch(formatPhoneNumber(call.to))
    //
    expect(wrapper.find('.ac-call-via').exists()).toBe(true)
    expect(wrapper.find('.ac-call-via').text()).toMatch(formatPhoneNumber(call.via))
    //
    expect(wrapper.find('.ac-call-duration').exists()).toBe(true)
    expect(wrapper.find('.ac-call-duration').text()).toMatch(convertMillisecondsToHumanReadableTime(call.duration))
    //
    expect(wrapper.find('.ac-call-calltype').exists()).toBe(true)
    expect(wrapper.find('.ac-call-calltype').text()).toMatch(capitalize(call.call_type))
    //
    expect(wrapper.find('.ac-call-archived').exists()).toBe(true)
    expect(wrapper.find('.ac-call-archived').text()).toBe('Archive')
    //
    expect(wrapper.find('.ac-call-notes').exists()).toBe(true)
    expect(wrapper.findComponent(ACNotesList).exists()).toBe(true)
  })
  it('render a call not archived', () => {
    const call: Call = {
      call_type: CallType.ANSWERED,
      created_at: '"2021-08-16T16:09:26.606Z"',
      direction: Direction.INBOUND,
      duration: 4000, // in milliseconds
      from: '+33123456789',
      id: 1,
      is_archived: false,
      notes: [],
      to: '+33987654321',
      via: '+33234567890'
    }
    const wrapper = shallowMount(ACCAll, {
      propsData: { call },
      filters: {
        capitalize,
        convertMillisecondsToHumanReadableTime,
        formatPhoneNumber,
        moment
      }
    })
    //
    expect(wrapper.find('.ac-call-archived').exists()).toBe(true)
    expect(wrapper.find('.ac-call-archived').text()).toBe('Archive')
  })
  it('render an archived call ', () => {
    const call: Call = {
      call_type: CallType.ANSWERED,
      created_at: '"2021-08-16T16:09:26.606Z"',
      direction: Direction.INBOUND,
      duration: 4000, // in milliseconds
      from: '+33123456789',
      id: 1,
      is_archived: true,
      notes: [],
      to: '+33987654321',
      via: '+33234567890'
    }
    const wrapper = shallowMount(ACCAll, {
      propsData: { call },
      filters: {
        capitalize,
        convertMillisecondsToHumanReadableTime,
        formatPhoneNumber,
        moment
      }
    })
    //
    expect(wrapper.find('.ac-call-archived').exists()).toBe(true)
    expect(wrapper.find('.ac-call-archived').text()).toBe('Archived')
  })

})
