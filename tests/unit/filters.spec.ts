import { capitalize, convertMillisecondsToHumanReadableTime, formatPhoneNumber } from '@/filters/filters'

describe('filters.ts', () => {

  // convertMillisecondsToHumanReadableTime

  describe.each([
    [1_000, '1 second'],
    [4_000, '4 seconds'],
    [60_000, '1 minute'],
    [61_000, '1 minute 1 second'],
    [71_000, '1 minute 11 seconds'],
    [600_000, '10 minutes'],
    [1_921_000, '32 minutes 1 second'],
    [1_922_000, '32 minutes 2 seconds'],
    [3_600_000, '1 hour'],
    [3_601_000, '1 hour 1 second'],
    [3_602_000, '1 hour 2 seconds'],
    [3_661_000, '1 hour 1 minute 1 second'],
    [3_662_000, '1 hour 1 minute 2 seconds'],
    [3_722_000, '1 hour 2 minutes 2 seconds'],
    [14_400_000, '4 hours'],
    [14_401_000, '4 hours 1 second'],
    [14_410_000, '4 hours 10 seconds'],
    [14_461_000, '4 hours 1 minute 1 second'],
    [14_470_000, '4 hours 1 minute 10 seconds'],
    [14_762_000, '4 hours 6 minutes 2 seconds'],
  ])('convertMillisecondsToHumanReadableTime %i ', (value, expected) => {
    it(`return ${expected}`, () => {
      expect(convertMillisecondsToHumanReadableTime(value)).toMatch(expected)
    })
  })

  // CAPITALIZE

  describe.each([
    ['', ''],
    ['12', '12'],
    ['my text', 'My text'],
  ])('capitalize %i', (value, expected) => {
    it(`return ${expected}`, () => {
      expect(capitalize(value)).toMatch(expected)
    })
  })

  // FORMAT PHONE NUMBER

  describe.each([
    ['', ''],
    ['12', '12'],
    ['1234', '(123) 4'],
    ['+33123456789', '(+33) 123456789'],
  ])('formatPhoneNumber %i', (value, expected) => {
    it(`return ${expected}`, () => {
      expect(formatPhoneNumber(value)).toMatch(expected)
    })
  })
})
