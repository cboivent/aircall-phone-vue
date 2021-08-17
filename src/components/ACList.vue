<template>
  <div class="ac-list">
    <div v-if="items.length == 0" class="ac-no-data">No data</div>
    <div v-else class="ac-list-pagination">
      <button type="button" class="ac-button simple" @click="clickOnShowAll" :disabled="totalPage == 1">
        show all
      </button>
      <div>
        <button
          type="button"
          class="ac-button simple"
          @click="clickOnPreviousPage"
          :disabled="currentPage <= 1"
        >
          &lt;
        </button>
        <span>{{ currentPage }}/{{ totalPage }}</span>
        <button
          type="button"
          class="ac-button simple"
          @click="clickOnNextPage"
          :disabled="currentPage >= totalPage"
        >
          &gt;
        </button>
      </div>
      <div>
        <span>{{ totalCountLabel }}</span>
      </div>
    </div>
    <div class="ac-list-wrapper">
      <!-- TABLE -->
      <table class="ac-list-table">
        <thead class="ac-list-head">
          <tr class="ac-list-row">
            <th v-for="(header, index) in headers" :key="index" @click="sortBy(header.key)" :class="['isSortable', { isActive: (header.key == sortKey) }]">
              {{ header.value | capitalize }}
              <span class="arrow" :class="sortOrders[header.key] > 0 ? 'asc' : 'desc'"></span>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody class="ac-list-body">
          <tr
            v-for="(item, index) in sortedItems"
            :key="index"
            class="ac-list-row ac-list-item"
          >
            <ACListItem v-for="(header, indexColumn) in headers" :key="index+'-'+indexColumn" :value="item[header.key]" :field="header" />
            <td class="ac-list-item-actions">
              <button type="button" class="ac-button primary" @click="clickOnArchiveBtn(item.id, index, $event)" :disabled="item.is_archived">{{ item.is_archived ? 'Archived' : 'Archive'}}</button>
              <button type="button" class="ac-button link" @click="clickOnItem(item.id)">Details &gt;</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"

import { Call } from "@/models/ACTypes"
import Header from '@/models/Header'
import ACListItem from "./ACListItem.vue"
import { ITEMS_PER_PAGE } from "@/constants/settings"
import { getSortedItems } from "@/utils"

export default Vue.extend({
  components: {
    ACListItem,
  },
  props: {
    headers: {
      type: Array as () => Header[],
      required: true,
    },
    items: {
      type: Array as () => Call[],
      required: true,
    },
  },
  data() {
    let sortKey = ''
    const sortOrders: Record<string, number> = {}
    this.headers.forEach((header) => {
      if (header.defaultSortKey) {
        sortKey = header.key
      }
      sortOrders[header.key] = -1
    })
    return {
      sortOrders,
      sortKey,
      currentPage: 1,
      itemsPerPage: ITEMS_PER_PAGE,
    }
  },
  computed: {
    sortedItems() {
      const sortedItems: Call[] = getSortedItems(this.items, this.$data.sortKey, this.$data.sortOrders[this.$data.sortKey])
      const offset: number = (this.$data.currentPage - 1) * this.$data.itemsPerPage
      return sortedItems.slice(offset, offset + this.$data.itemsPerPage)
    },
    totalCountLabel() {
      const totalCount: number = this.items.length
      return `${totalCount} item` + (totalCount > 1 ? 's' : '')
    },
    totalPage() {
      return Math.ceil(this.items.length / Math.abs(this.$data.itemsPerPage))
    },
  },
  methods: {
    sortBy(key: string) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
      console.log(`[ACList] click on sort by [${key}] - [${this.sortOrders[key]}]`)
      const offset: number = (this.$data.currentPage - 1) * this.$data.itemsPerPage
      this.$emit('pageChange', offset, this.$data.currentPage, this.sortKey, this.sortOrders[this.sortKey])
    },
    clickOnPreviousPage() {
      if (this.$data.currentPage > 1) {
        this.$data.currentPage--
        console.log('[ACList] clickOnPreviousPage', this.$data.currentPage)
        const offset: number = (this.$data.currentPage - 1) * this.$data.itemsPerPage
        this.$emit('pageChange', offset, this.$data.currentPage, this.sortKey, this.sortOrders[this.sortKey])
      }
    },
    clickOnNextPage() {
      if (this.$data.currentPage < this.totalPage) {
        this.$data.currentPage++
        console.log('[ACList] clickOnNextPage', this.$data.currentPage)
        const offset: number = (this.$data.currentPage - 1) * this.$data.itemsPerPage
        this.$emit('pageChange', offset, this.$data.currentPage, this.sortKey, this.sortOrders[this.sortKey])
      }
    },
    clickOnShowAll() {
      console.log('[ACList] clickOnShowAll')
      this.$emit('clickOnShowAll')
      this.$data.currentPage = 1
      this.$data.itemsPerPage = this.items.length
    },
    clickOnItem(id: string) {
      console.log('[ACList] clickOnItem', id)
      this.$emit('clickOnItem', id)
    },
    clickOnArchiveBtn(id: string, index: number, evt: Event) {
      evt.stopPropagation()
      console.log('[ACList] clickOnArchiveBtn', id, index)
      this.$emit('clickOnArchiveBtn', id, index)
    },
  },
})
</script>

<style lang="scss" scoped>
.ac-list {
  background-color: white;
  border: 1px solid $neutral-color;
  border-radius: $border-radius-default;

  &-table {
    border-collapse: collapse;
    width: 100%;
  }

  &-item-actions {
    text-align: right;
  }

  &-row {
    .ac-list-head > & {
      background-color: $neutral-color-lighter;
      border-bottom: 1px solid $neutral-color;
      border-top: 1px solid $neutral-color;
    }

    th {
      padding: 10px;

      &.isSortable {
        cursor: pointer;

        &.isActive {
          color: $primary-color;
        }
    
        &:hover {
          color: $primary-color;
          text-decoration: underline;
        }
      }
    }

    td {
      padding: 10px;
    }
  }
}

.ac-list-pagination {
  align-items: center;
  display: grid;
  justify-items: center;
  grid-template: 1fr / repeat(3, 1fr);
  padding: 10px;
}
</style>
