import { shallowMount } from '@vue/test-utils'
import ACLogin from '@/components/ACLogin.vue'

describe('ACLogin.vue', () => {
  it('renders aclogin and test emit on click', async () => {
    const title = 'my title'
    const username = 'JohnDoe'
    const password = 'Pa$$w0rd!'
    //
    const wrapper = shallowMount(ACLogin, {
      propsData: { title }
    })
    //
    expect(wrapper.find('.ac-login-header').exists()).toBe(true)
    expect(wrapper.find('.ac-login-header').text()).toMatch(title)
    //
    const usernameInput = wrapper.find('input[type=text][name=username]')
    expect(usernameInput.exists()).toBe(true)
    usernameInput.setValue(username)
    //
    const passwordInput = wrapper.find('input[type=password][name=password]')
    expect(passwordInput.exists()).toBe(true)
    passwordInput.setValue(password)
    //
    expect(wrapper.find('button[type=submit]').exists()).toBe(true)
    //
    await wrapper.find('form').trigger('submit')
    //
    expect(wrapper.emitted('submitLogin')).toBeTruthy()
    expect(wrapper.emitted('submitLogin')?.length).toBe(1)
    expect(wrapper.emitted('submitLogin')).toEqual([[{username, password}]])
  })
})
