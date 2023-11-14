//firestore
import { useEffect, useState } from "react"
import { db } from "../firebase/config"
import { doc, onSnapshot } from "firebase/firestore";

export const useDocument = (collectionName, id) => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)


    useEffect(() => {

        setIsPending(true)

        const docRef = doc(db, collectionName, id);

        const unsub = onSnapshot(docRef, (docSnap) => {
            if (docSnap.data()) {
                setData({ ...docSnap.data(), id: docSnap.id })
                setIsPending(false)
                setError(false)


            } else {
                setError("Could not load the recipe")
                setIsPending(false)
            }
        })

        return () => unsub()

    }, [collectionName, id])

    return { data, isPending, error }
}




