<template>
  <div class="ac-note">
    <p :data-id="note.id">{{ note.content }}</p>
  </div>
</template>

<script lang="ts">
import { Note } from '@/models/ACTypes'
import Vue from 'vue'

export default Vue.extend({
  props: {
    note: {
      type: Object as () => Note,
      required: true,
      default: (): Note => {
        return {} as Note
      }
    }
  }  
})
</script>

<style lang="scss" scoped>
.ac-note {
  background-color: $primary-color;
  border-radius: $border-radius-default;
  color: white;
  margin-bottom: 5px;
  padding: 12px;

  p {
    margin: 0;
  }
}
</style>
