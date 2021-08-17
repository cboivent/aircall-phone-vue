<template>
  <div class="ac-notes-list">
    <div class="ac-notes-list-wrapper">
      <ACNote v-for="note in notes" :key="note.id" :note="note"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ACNote from '@/components/ACNote.vue'
import { Note } from '@/models/ACTypes'

export default Vue.extend({
  components: {
    ACNote
  },
  props: {
    notes: {
      type: Array as () => Array<Note>,
      required: true,
      default: (): Note[] => new Array<Note>()
    }
  }
})
</script>
