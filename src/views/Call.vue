<template>
  <div class="call-page">
    <div class="call-page-navigation">
      <button type=button @click="goBack" class="ac-button link">&lt; Back</button>
    </div>
    <div v-if="loading">
      <span>Loading call #{{ callId }}...</span>
    </div>
    <div v-else>
      <ACCall v-if="call != null" :call="call" @clickOnArchiveCall="clickOnArchiveCall" @submitNoteCall="submitNoteCall"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import ACCall from "@/components/ACCall.vue"
import { Call } from "@/models/ACTypes"
import AircallService from '@/services/AircallService'
import { GET_CALL } from "@/graphql/queries"

export default Vue.extend({
  components: {
    ACCall,
  },
  apollo: {
    call: {
      query: GET_CALL,
      variables() {
        return {
          id: this.$data.callId,
        }
      },
      update: (data): Call => {
        return { ...data.call }
      },
      loadingKey: 'loading'
    },
  },
  data() {
    return {
      loading: 0,
      callId: this.$route.params.id,
      call: null,
    }
  },
  async mounted() {
    console.log('Call - mounted')
  },
  methods: {
    async clickOnArchiveCall(id: number) {
      console.log(`Call - receive clickOnArchiveCall for ${id}`)
      await AircallService.archiveCall(id)
    },
    async submitNoteCall(id: number, content: string) {
      console.log(`Call - receive submitNoteCall for ${id}: ${content}`)
      await AircallService.addNote(id, content)
    },
    goBack(): void {
      this.$router.go(-1)
    }
  }
})
</script>

<style lang="scss" scoped>
.call-page-navigation {
  box-sizing: border-box;
  padding-bottom: 10px;
  text-align: left;
}
</style>
