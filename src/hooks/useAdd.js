
import { useState } from "react"
import { db } from "../firebase/config"
import { collection, addDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"

export const useAdd = (collectionName) => {
    // const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    //router
    const navigate = useNavigate()


    // const colRef = collection(db, collectionName)

    const addDocument = async (object) => {
        try {
            await addDoc(collection(db, collectionName), object)
            navigate('/')

        } catch (err) {
            setError(err.message)
        }

    }

    return { addDocument, error }
}


