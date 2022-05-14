import { Timestamp } from 'firebase/firestore'

export const convertFirebaseTimeStampToDate = (timestampObj: any) => {
  return new Timestamp(timestampObj.seconds, timestampObj.nanoseconds).toDate()
}
