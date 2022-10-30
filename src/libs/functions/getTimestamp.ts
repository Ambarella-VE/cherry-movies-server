import {
  format
} from 'date-fns'

export default function getTimestamp(): string {
  const dateNow: Date = new Date();
  const nowString = format(dateNow, 'yyyyMMdd HH:MM:SS')
  return nowString
}
