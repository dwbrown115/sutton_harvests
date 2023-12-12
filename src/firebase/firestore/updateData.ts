import { firebase_app } from "../index";
import { doc, updateDoc, getFirestore } from "firebase/firestore";

export default async function updateData(collection: string, id: string, data: any) {
    const db = getFirestore(firebase_app);
    const contentRef = await doc(db, collection, id);
    try {
        await updateDoc(contentRef, data);
    } catch (e) {
        console.log(e);
    }
}
