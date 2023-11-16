//firestore
import { useEffect, useState } from "react"
import { db } from "../firebase/config"
import { collection, onSnapshot } from "firebase/firestore"

export const useCollection = (collectionName) => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)


    useEffect(() => {
        setIsPending(true)

        const colRef = collection(db, collectionName) // collection() - getting a reference to the collection; 1. - database we are connecting to, 2. collection name

        const unsub = onSnapshot(colRef, (snapshot) => {

            if (!snapshot.empty) {
                let results = []
                const res = snapshot.docs // storing data from the snapshot

                res.forEach((doc) => {
                    results.push({ id: doc.id, ...doc.data() })
                })
                setData(results)
                setIsPending(false)
                setError(null)
            } else {
                setError("No recipes to load")
                setIsPending(false)
            }

        }, (err) => {
            setError("Something went wrong with Firebase; check the console")
            setIsPending(false)
            console.log(err.message);
        })

        return () => unsub() //cleanup function - return () => xy()
        //we stop listening for the unsub function then the components that uses the unsub function unmounts
    }, [collectionName])

    return { data, error, isPending }
}