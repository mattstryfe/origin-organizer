import { doc } from 'firebase/firestore'
import { db } from '@/plugins/firebase'

export function entryRefGetter() {
  return doc(db, 'flocks', flockId, 'entries', entryId)
}
