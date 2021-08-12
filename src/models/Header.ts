
export default interface Header {
  key: string,
  value: string,
  type: 'Date' | 'String' | 'Boolean' | 'Number' | 'PhoneNumber',
  format?: string,
  defaultSortKey?: boolean,
}
