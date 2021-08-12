import { mount } from '@vue/test-utils'
import ACNotesList from '@/components/ACNotesList.vue'
import ACNote from '@/components/ACNote.vue'

describe('ACNotesList.vue', () => {
  it('renders notes and check children component exists', async () => {
    const nbNote = 10
    const notes = Array.from({length: nbNote}, (_, index) => {
      return {
        id: index,
        content: `note content #${index}`
      }
    })
    //
    const wrapper = mount(ACNotesList, {
      propsData: { notes }
    })
    // check the number of child component
    expect(wrapper.findAllComponents(ACNote).length).toBe(nbNote)
    // check the first child component
    expect(wrapper.findComponent(ACNote).text()).toMatch('note content #0')
  })
})
