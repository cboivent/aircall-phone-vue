<template>
  <div class="ac-call" :data-id="call.id">
    <div class="ac-call-wrapper" v-if="call != null">
      <div class="ac-call-details">
        <div v-if="call.created_at" class="ac-call-createdat">
          <span>{{
            call.created_at | moment("DD/MM/YYYY HH:mm:ss")
          }}</span>
        </div>
        <div v-if="call.direction" class="ac-call-direction">
          <span>{{ call.direction | capitalize }}</span>
        </div>
        <div v-if="call.from" class="ac-call-from">
          <span>{{ call.from | formatPhoneNumber }}</span>
        </div>
        <div v-if="call.to" class="ac-call-to">
          <span>{{ call.to | formatPhoneNumber}}</span>
        </div>
        <div v-if="call.via" class="ac-call-via">
          <span>{{ call.via | formatPhoneNumber}}</span>
        </div>
        <div v-if="call.duration" class="ac-call-duration">
          <span>{{
            call.duration | convertMillisecondsToHumanReadableTime
          }}</span>
        </div>
        <div v-if="call.call_type" class="ac-call-calltype">
          <span>{{ call.call_type | capitalize }}</span>
        </div>
        <div class="ac-call-archived">
          <button
            type="button"
            class="ac-button primary"
            @click="clickOnArchiveCall"
            :disabled="call.is_archived"
          >
            {{ call.is_archived ? 'Archived' : 'Archive'}}
          </button>
        </div>
      </div>
      <div v-if="call.notes != null" class="ac-call-notes">
        <ACNotesList :notes="call.notes" />
        <form @submit.prevent="submitNoteCall">
          <input
            type="text"
            v-model="newNoteContent"
          />
          <button type="submit" class="ac-button" :disabled="newNoteContent.length == 0">Add note</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import ACNotesList from "@/components/ACNotesList.vue"
import { Call } from "@/models/ACTypes"

export default Vue.extend({
  components: {
    ACNotesList,
  },
  props: {
    call: {
      type: Object as () => Call,
      required: true,
    },
  },
  data() {
    return {
      newNoteContent: '',
    }
  },
  methods: {
    async clickOnArchiveCall() {
      // console.log('[ACCall] click on archive call', this.call.id)
      this.$emit('clickOnArchiveCall', this.call.id )
    },
    async submitNoteCall() {
      // console.log('[ACCall] submit note call', this.call.id)
      this.$emit('submitNoteCall', this.call.id, this.newNoteContent)
      // clean data
      this.newNoteContent = ''
    },
  },
})
</script>

<style lang="scss" scoped>
.ac-call {
  border-radius: $border-radius-default;
  margin-bottom: 10px;

  &-wrapper {
    display: grid;
    grid-gap: 10px;
    grid-template: 1fr / 1fr 4fr;

    div {
      align-items: center;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 10px;
      text-align: center;

      span {
        text-align: center;
      }
    }
  }

  &-details {
    border: 1px solid $neutral-color;
    border-radius: $border-radius-default;
  }

  &-notes {
    background-color: $neutral-color-lighter;
  }
}
</style>
