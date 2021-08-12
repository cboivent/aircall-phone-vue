import { createLocalVue, shallowMount } from '@vue/test-utils'
import ACList from '@/components/ACList.vue'
import ACListItem from '@/components/ACListItem.vue'
import { capitalize } from '@/filters/filters'
import Header from '@/models/Header'
import { Call, CallType, Direction } from '@/models/ACTypes'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()

describe('ACList.vue', () => {
  it('list without headers and without data', () => {
    const headers: Header[] = []
    const items: Call[] = []
    const wrapper = shallowMount(ACList, {
      propsData: { headers, items },
    })
    expect(wrapper.text()).toBe('No data')
  })

  it('list with headers but without data', () => {
    const headers: Header[] = [
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
    ]
    const items: Call[] = []
    const wrapper = shallowMount(ACList, {
      propsData: { headers, items },
      filters: {
        capitalize
      }
    })
    expect(wrapper.find('.ac-no-data').text()).toMatch('No data')
    expect(wrapper.findAll('th').length).toBe(5)
    expect(wrapper.findAll('th').at(0).text()).toMatch('Date')
    expect(wrapper.findAll('th').at(1).text()).toMatch('Direction')
    expect(wrapper.findAll('th').at(2).text()).toMatch('From')
    expect(wrapper.findAll('th').at(3).text()).toMatch('To')
    expect(wrapper.findAll('th').at(4).text()).toMatch('')
    expect(wrapper.find('.ac-list-body').text()).toMatch('')
  })

  it('list with headers and data', () => {
    const headers: Header[] = [
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
    ]
    const items: Call[] = [
      {
        call_type: CallType.ANSWERED,
        created_at: '2021-08-06T17:16:53.930Z',
        direction: Direction.OUTBOUND,
        duration: 140000,
        from: '+897794833',
        id: 5,
        is_archived: true,
        notes: [],
        to: '+965648974',
        via: '+752181888'
      },
      {
        call_type: CallType.MISSED,
        created_at: '2021-03-19T14:49:07.266Z',
        direction: Direction.INBOUND,
        duration: 340000,
        from: '+897794833',
        id: 2,
        is_archived: false,
        notes: [],
        to: '+965648974',
        via: '+752181888'
      },
      {
        call_type: CallType.ANSWERED,
        created_at: '2021-02-17T22:05:05.245Z',
        direction: Direction.INBOUND,
        duration: 440000,
        from: '+897794833',
        id: 1,
        is_archived: true,
        notes: [],
        to: '+965648974',
        via: '+752181888'
      },
      {
        call_type: CallType.VOICEMAIL,
        created_at: '2020-11-23T13:44:43.372Z',
        direction: Direction.OUTBOUND,
        duration: 240000,
        from: '+897794833',
        id: 3,
        is_archived: true,
        notes: [],
        to: '+965648974',
        via: '+752181888'
      },
      {
        call_type: CallType.MISSED,
        created_at: '2020-10-18T22:30:54.176Z',
        direction: Direction.INBOUND,
        duration: 60000,
        from: '+897794833',
        id: 4,
        is_archived: false,
        notes: [],
        to: '+965648974',
        via: '+752181888'
      }
    ]
    const wrapper = shallowMount(ACList, {
      propsData: { headers, items },
      filters: {
        capitalize
      }
    })
    expect(wrapper.find('.ac-list-pagination').exists()).toBe(true)
    expect(wrapper.findAll('.ac-list-row.ac-list-item').length).toBe(5)
    expect(wrapper.findAllComponents(ACListItem).length).toBe(20)
  })

  it('test click on archive buttons', async () => {
    const headers: Header[] = [
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
    ]
    const items: Call[] = [
      {
        call_type: CallType.ANSWERED,
        created_at: '2021-08-07T17:16:53.930Z',
        direction: Direction.OUTBOUND,
        duration: 140000,
        from: '+897794833',
        id: 1,
        is_archived: false,
        notes: [],
        to: '+965648974',
        via: '+752181888'
      },
      {
        call_type: CallType.ANSWERED,
        created_at: '2021-08-06T17:16:53.930Z',
        direction: Direction.OUTBOUND,
        duration: 140000,
        from: '+897794833',
        id: 2,
        is_archived: false,
        notes: [],
        to: '+965648974',
        via: '+752181888'
      },
      {
        call_type: CallType.ANSWERED,
        created_at: '2021-08-05T17:16:53.930Z',
        direction: Direction.OUTBOUND,
        duration: 140000,
        from: '+897794833',
        id: 3,
        is_archived: true,
        notes: [],
        to: '+965648974',
        via: '+752181888'
      },
    ]
    const wrapper = shallowMount(ACList, {
      propsData: { headers, items },
      filters: {
        capitalize
      }
    })

    // check if we have 2 archives button
    expect(wrapper.findAll('.ac-list-item-actions button.ac-button.primary').length).toBe(3)

    // click on 1st archive button
    expect(wrapper.findAll('.ac-list-item-actions button.ac-button.primary').at(0).text()).toMatch('Archive')
    await wrapper.findAll('.ac-list-item-actions button.ac-button.primary').at(0).trigger('click')
    // check event is triggered with value
    expect(wrapper.emitted('clickOnArchiveBtn')).toBeTruthy()
    expect(wrapper.emitted('clickOnArchiveBtn')?.length).toBe(1)
    expect(wrapper.emitted('clickOnArchiveBtn')).toEqual([[items[0].id, 0]])

    // click on 2nd archive button
    expect(wrapper.findAll('.ac-list-item-actions button.ac-button.primary').at(1).text()).toMatch('Archive')
    await wrapper.findAll('.ac-list-item-actions button.ac-button.primary').at(1).trigger('click')
    // check event is triggered with value
    expect(wrapper.emitted('clickOnArchiveBtn')?.length).toBe(2)
    expect(wrapper.emitted('clickOnArchiveBtn')).toEqual([[items[0].id, 0], [items[1].id, 1]])

    // click on 3rd archive button - which is disable
    expect(wrapper.findAll('.ac-list-item-actions button.ac-button.primary').at(2).text()).toMatch('Archived')
    await wrapper.findAll('.ac-list-item-actions button.ac-button.primary').at(2).trigger('click')
    // check event is triggered with value
    expect(wrapper.emitted('clickOnArchiveBtn')?.length).toBe(2)
  })

  it('test click on details buttons', async () => {
    const headers: Header[] = [
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
    ]
    const items: Call[] = [
      {
        call_type: CallType.ANSWERED,
        created_at: '2021-08-07T17:16:53.930Z',
        direction: Direction.OUTBOUND,
        duration: 140000,
        from: '+897794833',
        id: 1,
        is_archived: false,
        notes: [],
        to: '+965648974',
        via: '+752181888'
      },
      {
        call_type: CallType.ANSWERED,
        created_at: '2021-08-06T17:16:53.930Z',
        direction: Direction.OUTBOUND,
        duration: 140000,
        from: '+897794833',
        id: 2,
        is_archived: false,
        notes: [],
        to: '+965648974',
        via: '+752181888'
      },
    ]
    const wrapper = shallowMount(ACList, {
      propsData: { headers, items },
      filters: {
        capitalize
      },
      router,
    })

    // check if we have 2 details button
    expect(wrapper.findAll('.ac-list-item-actions button.ac-button.link').length).toBe(2)

    // click on 1st details button
    expect(wrapper.findAll('.ac-list-item-actions button.ac-button.link').at(0).text()).toMatch('Details')
    await wrapper.findAll('.ac-list-item-actions button.ac-button.link').at(0).trigger('click')
    // check event is triggered with value
    expect(wrapper.emitted('clickOnItem')).toBeTruthy()
    expect(wrapper.emitted('clickOnItem')?.length).toBe(1)
    expect(wrapper.emitted('clickOnItem')).toEqual([[items[0].id]])

    // click on 2nd details button
    expect(wrapper.findAll('.ac-list-item-actions button.ac-button.link').at(1).text()).toMatch('Details')
    await wrapper.findAll('.ac-list-item-actions button.ac-button.link').at(1).trigger('click')
    // check event is triggered with value
    expect(wrapper.emitted('clickOnItem')?.length).toBe(2)
    expect(wrapper.emitted('clickOnItem')).toEqual([[items[0].id], [items[1].id]])
  })
})
