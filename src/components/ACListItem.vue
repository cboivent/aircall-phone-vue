<template>
  <td>{{ formatedValue }}</td>
</template>

<script lang="ts">
import Header from '@/models/Header'
import moment from 'moment'
import Vue from 'vue'

export default Vue.extend({
  props: {
    value: {
      type: String,
      required: true,
    },
    field: {
      type: Object as () => Header,
      required: true,
    }
  },
  data() {
    return {
      currentValue: this.value
    }
  },
  computed: {
    formatedValue(): string {
      let formatedValue = ''
      if (this.value != null && this.value.length > 0) {
        // may be use a switch statement ?
        if (this.field.type == 'Date') {
          formatedValue = moment(this.value).format(this.field.format || 'MM-DD-YYYY')
        } else if (this.field.type == 'PhoneNumber' && this.value.length > 3) {
          // user filter formatPhoneNumber
          formatedValue = '(' + this.value.substr(0,3) + ') ' + this.value.substr(3, this.value.length)
        } else {
          formatedValue = this.value
        }
      }
      return formatedValue
    }
  }
})
</script>
