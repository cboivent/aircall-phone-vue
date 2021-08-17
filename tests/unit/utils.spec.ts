import { Call, CallType, Direction } from "@/models/ACTypes"
import { getSortedItems, groupByDate } from "@/utils"

describe('utils.ts', () => {

  describe('getSortedItems', () => {
    it('sort list by created_at field in desc order', () => {
      const items: Call[] = [
        {
          call_type: CallType.ANSWERED,
          created_at: '2021-02-17T22:05:05.245Z',
          direction: Direction.INBOUND,
          duration: 440000,
          from: '+897794833',
          id: 1,
          is_archived: true,
          notes: [],
          to: '+965648974',
          via: '+752181888'
        },
        {
          call_type: CallType.MISSED,
          created_at: '2021-03-19T14:49:07.266Z',
          direction: Direction.INBOUND,
          duration: 340000,
          from: '+897794833',
          id: 2,
          is_archived: false,
          notes: [],
          to: '+965648974',
          via: '+752181888'
        },
        {
          call_type: CallType.VOICEMAIL,
          created_at: '2020-11-23T13:44:43.372Z',
          direction: Direction.OUTBOUND,
          duration: 240000,
          from: '+897794833',
          id: 3,
          is_archived: true,
          notes: [],
          to: '+965648974',
          via: '+752181888'
        },
        {
          call_type: CallType.MISSED,
          created_at: '2020-10-18T22:30:54.176Z',
          direction: Direction.INBOUND,
          duration: 60000,
          from: '+897794833',
          id: 4,
          is_archived: false,
          notes: [],
          to: '+965648974',
          via: '+752181888'
        },
        {
          call_type: CallType.ANSWERED,
          created_at: '2021-08-06T17:16:53.930Z',
          direction: Direction.OUTBOUND,
          duration: 140000,
          from: '+897794833',
          id: 5,
          is_archived: true,
          notes: [],
          to: '+965648974',
          via: '+752181888'
        },
      ]
      //
      const key: keyof Call = "created_at"
      const sortOrder = -1 // desc
      expect(getSortedItems(items, key, sortOrder)).toEqual([
        {
          call_type: CallType.ANSWERED,
          created_at: '2021-08-06T17:16:53.930Z',
          direction: Direction.OUTBOUND,
          duration: 140000,
          from: '+897794833',
          id: 5,
          is_archived: true,
          notes: [],
          to: '+965648974',
          via: '+752181888'
        },
        {
          call_type: CallType.MISSED,
          created_at: '2021-03-19T14:49:07.266Z',
          direction: Direction.INBOUND,
          duration: 340000,
          from: '+897794833',
          id: 2,
          is_archived: false,
          notes: [],
          to: '+965648974',
          via: '+752181888'
        },
        {
          call_type: CallType.ANSWERED,
          created_at: '2021-02-17T22:05:05.245Z',
          direction: Direction.INBOUND,
          duration: 440000,
          from: '+897794833',
          id: 1,
          is_archived: true,
          notes: [],
          to: '+965648974',
          via: '+752181888'
        },
        {
          call_type: CallType.VOICEMAIL,
          created_at: '2020-11-23T13:44:43.372Z',
          direction: Direction.OUTBOUND,
          duration: 240000,
          from: '+897794833',
          id: 3,
          is_archived: true,
          notes: [],
          to: '+965648974',
          via: '+752181888'
        },
        {
          call_type: CallType.MISSED,
          created_at: '2020-10-18T22:30:54.176Z',
          direction: Direction.INBOUND,
          duration: 60000,
          from: '+897794833',
          id: 4,
          is_archived: false,
          notes: [],
          to: '+965648974',
          via: '+752181888'
        },
      ])
    })

    it('sort list by created_at field in asc order', () => {
      const items: Call[] = [
        {
          call_type: CallType.ANSWERED,
          created_at: '2021-02-17T22:05:05.245Z',
          direction: Direction.INBOUND,
          duration: 440000,
          from: '+897794833',
          id: 1,
          is_archived: true,
          notes: [],
          to: '+965648974',
          via: '+752181888'
        },
        {
          call_type: CallType.MISSED,
          created_at: '2021-03-19T14:49:07.266Z',
          direction: Direction.INBOUND,
          duration: 340000,
          from: '+897794833',
          id: 2,
          is_archived: false,
          notes: [],
          to: '+965648974',
          via: '+752181888'
        },
        {
          call_type: CallType.VOICEMAIL,
          created_at: '2020-11-23T13:44:43.372Z',
          direction: Direction.OUTBOUND,
          duration: 240000,
          from: '+897794833',
          id: 3,
          is_archived: true,
          notes: [],
          to: '+965648974',
          via: '+752181888'
        },
        {
          call_type: CallType.MISSED,
          created_at: '2020-10-18T22:30:54.176Z',
          direction: Direction.INBOUND,
          duration: 60000,
          from: '+897794833',
          id: 4,
          is_archived: false,
          notes: [],
          to: '+965648974',
          via: '+752181888'
        },
        {
          call_type: CallType.ANSWERED,
          created_at: '2021-08-06T17:16:53.930Z',
          direction: Direction.OUTBOUND,
          duration: 140000,
          from: '+897794833',
          id: 5,
          is_archived: true,
          notes: [],
          to: '+965648974',
          via: '+752181888'
        },
      ]
      //
      const key: keyof Call = 'created_at'
      const sortOrder = 1 // asc
      expect(getSortedItems(items, key, sortOrder)).toEqual([
        {
          call_type: CallType.MISSED,
          created_at: '2020-10-18T22:30:54.176Z',
          direction: Direction.INBOUND,
          duration: 60000,
          from: '+897794833',
          id: 4,
          is_archived: false,
          notes: [],
          to: '+965648974',
          via: '+752181888'
        },
        {
          call_type: CallType.VOICEMAIL,
          created_at: '2020-11-23T13:44:43.372Z',
          direction: Direction.OUTBOUND,
          duration: 240000,
          from: '+897794833',
          id: 3,
          is_archived: true,
          notes: [],
          to: '+965648974',
          via: '+752181888'
        },
        {
          call_type: CallType.ANSWERED,
          created_at: '2021-02-17T22:05:05.245Z',
          direction: Direction.INBOUND,
          duration: 440000,
          from: '+897794833',
          id: 1,
          is_archived: true,
          notes: [],
          to: '+965648974',
          via: '+752181888'
        },
        {
          call_type: CallType.MISSED,
          created_at: '2021-03-19T14:49:07.266Z',
          direction: Direction.INBOUND,
          duration: 340000,
          from: '+897794833',
          id: 2,
          is_archived: false,
          notes: [],
          to: '+965648974',
          via: '+752181888'
        },
        {
          call_type: CallType.ANSWERED,
          created_at: '2021-08-06T17:16:53.930Z',
          direction: Direction.OUTBOUND,
          duration: 140000,
          from: '+897794833',
          id: 5,
          is_archived: true,
          notes: [],
          to: '+965648974',
          via: '+752181888'
        },
      ])
    })
  })

  describe('groupByDate', () => {
    it('group calls by created_date', () => {
      const items: Call[] = [
        {
          call_type: CallType.MISSED,
          created_at: '2021-03-19T14:49:07.266Z',
          direction: Direction.INBOUND,
          duration: 340000,
          from: '+897794833',
          id: 2,
          is_archived: false,
          notes: [],
          to: '+965648974',
          via: '+752181888'
        },
        {
          call_type: CallType.ANSWERED,
          created_at: '2021-08-06T17:16:53.930Z',
          direction: Direction.OUTBOUND,
          duration: 140000,
          from: '+897794833',
          id: 5,
          is_archived: true,
          notes: [],
          to: '+965648974',
          via: '+752181888'
        },
        {
          call_type: CallType.MISSED,
          created_at: '2020-11-23T20:30:54.176Z',
          direction: Direction.INBOUND,
          duration: 60000,
          from: '+897794833',
          id: 4,
          is_archived: false,
          notes: [],
          to: '+965648974',
          via: '+752181888'
        },
        {
          call_type: CallType.ANSWERED,
          created_at: '2021-08-06T18:05:05.245Z',
          direction: Direction.INBOUND,
          duration: 440000,
          from: '+897794833',
          id: 1,
          is_archived: true,
          notes: [],
          to: '+965648974',
          via: '+752181888'
        },
        {
          call_type: CallType.VOICEMAIL,
          created_at: '2020-11-23T13:44:43.372Z',
          direction: Direction.OUTBOUND,
          duration: 240000,
          from: '+897794833',
          id: 3,
          is_archived: true,
          notes: [],
          to: '+965648974',
          via: '+752181888'
        },
      ]
      // list have to be sorted before
      const sortedItems = getSortedItems(items, 'created_at', -1)
      expect(groupByDate(sortedItems).length).toBe(3)
    })
  })

})
