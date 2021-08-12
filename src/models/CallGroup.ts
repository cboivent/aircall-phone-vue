import { Call } from "@/models/ACTypes";

export default class CallGroup {

  id: string
  date: string
  callsId: number[]
  calls: Call[]
  isOpen: boolean

  constructor(date: string, callId: number, isOpen = false) {
    this.id = `cg-${Math.floor(Math.random() * 100) + 1}-${Date.now()}`
    this.date = date
    this.calls = []
    this.callsId = [callId]
    this.isOpen = isOpen
  }
}
