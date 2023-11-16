
import { db } from "../firebase/config"
import { doc, updateDoc } from "firebase/firestore"

export const useUpdate = (collectionName) => {

    const updateDocument = async (docID, updates) => {
        try {
            const docRef = doc(db, collectionName, docID)
            await updateDoc(docRef, updates)

        } catch (err) {
            console.log(err.message);
        }
    }

    return { updateDocument }

}


