<template>
  <div class="home">
    <div class="home-wrapper">
      <h1 class="home-greetings">Welcome {{user.username | capitalize }}, </h1>
      <div v-if="loading">LOADING...</div>
      <div v-else>
        <div class="home-message">
          <span>{{message}}</span>
        </div>
        <div class="ac-group-list">
          <div v-for="(group, index) in itemsGroupedByDate" :key="group.id" class="ac-group-item">
            <div class="ac-group-item-head" @click="clickOnGroup(index)">
              <span>{{group.date | moment('DD-MM-YYYY') }}</span>
              <span class="badge">{{group.callsId.length}}</span>
            </div>
            <div class="ac-group-item-content" v-if="group.isOpen">
              <ACList :headers="headers" :items="group.calls" @clickOnArchiveBtn="archiveCall" @clickOnItem="showCall"/> 
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import { mapGetters } from "vuex"
import moment, { Moment } from "moment"

import AircallService from "@/services/AircallService"

import ACList from "@/components/ACList.vue"

import { getSortedItems, groupByDate } from "@/utils"

import { Call } from "@/models/ACTypes"
import CallGroup from '@/models/CallGroup'
import Header from '@/models/Header'

@Component({
  components: {
    ACList
  },
  computed: {
    ...mapGetters(['user'])
  }
})
export default class Home extends Vue {

  private loading = false
  private totalCount = 0
  private itemsGroupedByDate: CallGroup[] = []

  private headers: Header[] = [
    {
      key: 'created_at',
      value: 'Date',
      type: 'Date',
      format: 'DD/MM/YYYY HH:mm:ss',
      defaultSortKey: true,
    },
    {
      key: 'direction',
      value: 'Direction',
      type: 'String'
    },
    {
      key: 'from',
      value: 'From',
      type: 'PhoneNumber'
    },
    {
      key: 'to',
      value: 'To',
      type: 'PhoneNumber'
    },
  ]

  get message(): string {
    return `You had ${this.totalCount} call` + (this.totalCount > 1 ? 's' : '')
  }

  created(): void {
    console.log('[Home] created')
  }

  onUpdatedCall(call: Call): void {
    console.log(`[Subscription] - receive update on call ${call.id} - ${call.created_at}`, call)
    const callDate: Moment = moment(call.created_at)
    // find the group
    const indexInGroupList: number = this.itemsGroupedByDate.findIndex((el: CallGroup) => {
      const elDate = moment(el.date)
      // test if same year, month  and day
      return elDate.isSame(callDate, 'year') && elDate.isSame(callDate, 'month') && elDate.isSame(callDate, 'day')
    })
    if (indexInGroupList > -1) {
      console.log(`[Home] - found call on grouped list at position ${indexInGroupList}`)
      const indexInCallsList: number = this.itemsGroupedByDate[indexInGroupList].calls.findIndex((el: Call) => {
        return el.id == call.id
      })
      if (indexInCallsList > -1) {
        console.log(`[Home] - found call on calls list at position ${indexInCallsList} on group #${indexInGroupList}`)
        const group: CallGroup = this.itemsGroupedByDate[indexInGroupList]
        const calls: Call[] = group.calls.slice()
        // update is_archived and notes properties
        calls[indexInCallsList].is_archived = call.is_archived
        calls[indexInCallsList].notes = call.notes
        group.calls = calls
      } else {
        console.log(`[Home] - not found call ${call.id} in calls list on group #${indexInGroupList}`)
      }
    } else {
      console.log(`[Home] - not found call ${call.id} in group list`)
    }
  }

  async mounted(): Promise<void> {
    console.log('[Home] mounted')
    // subscribe to on updatedCall
    console.log('[Home] start subscription to updated call')
    AircallService.subscribeToOnUpdatedCall({
      onSuccess: this.onUpdatedCall,
    })
    //
    this.loading = true
    // get total count
    this.totalCount = await AircallService.getNbTotalCalls()
    console.log('[Home] nb calls', this.totalCount)
    // get all calls id
    const calls: Call[] = await AircallService.getCallsId(this.totalCount)
    // sort calls by date
    const sortedCalls: Call[] = getSortedItems(calls, 'created_at', -1) // desc order
    // group call by date
    this.itemsGroupedByDate = groupByDate(sortedCalls)
    console.log(`[Home] found ${this.itemsGroupedByDate.length} group(s)`)
    //
    this.loading = false
  }

  async clickOnGroup(index: number): Promise<void> {
    console.log('[Home] click on group', index)
    const group: CallGroup = this.itemsGroupedByDate[index]
    if (group.calls.length == 0) {
      this.itemsGroupedByDate[index].calls = await AircallService.getCallsDetails(group.callsId)
    }
    this.itemsGroupedByDate[index].isOpen = !this.itemsGroupedByDate[index].isOpen
  }

  async showCall(id: number): Promise<void> {
    console.log('[Home] receive click on call', id)
    this.$router.push(`/call/${id}`)
  }

  async archiveCall(id: number): Promise<void> {
    console.log('[Home] receive archive call event for call', id)
    await AircallService.archiveCall(id)
  }
}
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  padding-top: 150px;
}

.home {

  &-greetings {
    margin: 0;
  }

  &-message {
    font-size: 1.5em;
    font-weight: lighter;
    margin: 20px auto;
  }
}

.ac-group-list {
  & .ac-group-item {
    border-top: 1px solid $neutral-color;

    &-head {
      align-items: center;
      color: $secondary-color-dark;
      display: flex;
      font-size: 1.5em;
      font-weight: 700;
      justify-content: space-between;
      line-height: 36px;
      padding: 20px;
      text-align: left;

      &:hover {
        color: $primary-color;
        cursor: pointer;
      }
    }

    &-content {
      background-color: $neutral-color-lighter;
      border-top: 1px solid $neutral-color;
      box-sizing: border-box;
      padding: 15px 30px;
    }
  }
}
</style>
