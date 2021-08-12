import { shallowMount } from '@vue/test-utils'
import ACListItem from '@/components/ACListItem.vue'
import Header from '@/models/Header'

describe('ACListItem.vue', () => {
  it('render an empty value', async () => {
    const header: Header = {
      key: 'header-0',
      type: 'String',
      value: 'My Header',
    }
    const value = ''
    const wrapper = shallowMount(ACListItem, {
      propsData: { value, field: header }
    })
    expect(wrapper.text()).toMatch(value)
  })
  it('render string value without formatting', async () => {
    const header: Header = {
      key: 'header-0',
      type: 'String',
      value: 'My Header',
    }
    const value = 'my value'
    const wrapper = shallowMount(ACListItem, {
      propsData: { value, field: header }
    })
    expect(wrapper.text()).toMatch(value)
  })
  it('render date value using date format provided', async () => {
    const header: Header = {
      key: 'date-0',
      type: 'Date',
      value: 'My Date',
      format: 'DD/MM/YYYY'
    }
    const value = '2021-08-16T16:09:26.606Z'
    const wrapper = shallowMount(ACListItem, {
      propsData: { value, field: header }
    })
    expect(wrapper.text()).toMatch('16/08/2021')
  })
  it('render date value using default format', async () => {
    const header: Header = {
      key: 'date-0',
      type: 'Date',
      value: 'My Date',
    }
    const value = '2021-08-16T16:09:26.606Z'
    const wrapper = shallowMount(ACListItem, {
      propsData: { value, field: header }
    })
    expect(wrapper.text()).toMatch('08-16-2021')
  })
  it('render phone number value with formatting', async () => {
    const header: Header = {
      key: 'phonenumber-0',
      type: 'PhoneNumber',
      value: 'My Phone Number',
    }
    const value = '+33123456789'
    const wrapper = shallowMount(ACListItem, {
      propsData: { value, field: header }
    })
    expect(wrapper.text()).toMatch('(+33) 123456789')
  })
  it('render phone number without formatting ', async () => {
    const header: Header = {
      key: 'phonenumber-0',
      type: 'PhoneNumber',
      value: 'My Phone Number',
    }
    const value = '123'
    const wrapper = shallowMount(ACListItem, {
      propsData: { value, field: header }
    })
    expect(wrapper.text()).toMatch('123')
  })
})
