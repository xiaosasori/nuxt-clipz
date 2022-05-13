import type { Timestamp } from 'firebase/firestore'

declare interface Clip {
  id: string
  uid: string
  displayName: string
  title: string
  fileName: string
  url: string
  screenshotURL: string
  timestamp: Timestamp
}
