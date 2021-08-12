import Vue from 'vue'
import { capitalize,  convertMillisecondsToHumanReadableTime, formatPhoneNumber} from './filters'

Vue.filter('capitalize', capitalize)
Vue.filter('convertMillisecondsToHumanReadableTime', convertMillisecondsToHumanReadableTime)
Vue.filter('formatPhoneNumber', formatPhoneNumber)
