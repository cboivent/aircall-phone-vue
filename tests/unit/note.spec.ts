import { shallowMount } from '@vue/test-utils'
import ACNote from '@/components/ACNote.vue'
import { Note } from '@/models/ACTypes'

describe('ACNote.vue', () => {
  it('renders notes when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(ACNote, {
      propsData: { note: {id: 1, content: msg } as Note }
    })
    expect(wrapper.text()).toMatch(msg)
    expect(wrapper.classes('ac-note')).toBe(true)
    const pEl = wrapper.find('p')
    expect(pEl.exists()).toBe(true)
    expect(pEl.attributes('data-id')).toBe('1')
  })
})
