import { Call } from "@/models/ACTypes"
import CallGroup from "@/models/CallGroup"
import moment, { Moment } from "moment"

export const getSortedItems = (items: Call[], sortKey: keyof Call, sortOrder: number): Call[] => {
  return items.sort((a: Call, b: Call) => {
    const key = sortKey as keyof typeof a
    const aValue = a[key]
    const bValue = b[key]
    return  (aValue === bValue ? 0 : (aValue > bValue ? 1 : -1)) * sortOrder
  })
}

export const groupByDate = (items: Call[]): CallGroup[] => {
  return items.reduce((acc: CallGroup[], call: Call, index: number) => {
    if (index == 0) {
      // console.log(index + ' - create group for date ' + moment(call.created_at).format('DD/MM/YYYY'))
      acc.push(new CallGroup(call.created_at, call.id))
    } else {
      // we get the last element cause we suppose the list is ordered
      const lastElDate: Moment = moment(acc[acc.length - 1].date)
      const callDate: Moment = moment(call.created_at)
      const isSameDate = lastElDate.isSame(callDate, 'year') && lastElDate.isSame(callDate, 'month') && lastElDate.isSame(callDate, 'day')
      if (isSameDate) {
        // console.log(`${index} - add to group date ${moment(acc[acc.length - 1].date).format('DD/MM/YYYY')}`)
        acc[acc.length - 1].callsId.push(call.id)
      } else {
        // console.log(index + ' - create group for date ' + moment(call.created_at).format('DD/MM/YYYY'))
        acc.push(new CallGroup(call.created_at, call.id))
      }
    }
    return acc
  }, [])
}
