import { collection } from 'firebase/firestore';
import db from '@/plugins/firebase';

export const allBirdsRef = collection(db, "birds" )