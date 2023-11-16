
import { db } from "../firebase/config"
import { useNavigate } from "react-router-dom"
import { doc, deleteDoc } from "firebase/firestore"

export const useDelete = (collectionName) => {

    const navigate = useNavigate()

    const deleteDocument = async (docID) => {

        try {
            const docRef = doc(db, collectionName, docID)
            await deleteDoc(docRef)
            navigate("/")

        } catch (err) {
            console.log(err.message);
        }

    }

    return { deleteDocument }
}