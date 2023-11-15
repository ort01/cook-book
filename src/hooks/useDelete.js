import { db } from "../firebase/config"
import { doc, deleteDoc } from "firebase/firestore"



export const useDelete = (collectionName) => {

    const deleteDocument = async (docID) => {

        try {
            const docRef = doc(db, collectionName, docID)
            await deleteDoc(docRef)
        } catch (err) {
            console.log(err.message);
        }
    }

    return { deleteDocument }
}