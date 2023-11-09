import { useState, useEffect } from "react";

export const useFetch = (url) => {

    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const controller = new AbortController()

        const fetchData = async () => {
            setIsPending(true)

            try {
                const res = await fetch(url, { signal: controller.signal })

                if (!res.ok) {
                    throw new Error(res.statusText)
                } else {
                    const fetchedData = await res.json()

                    setIsPending(false)
                    setData(fetchedData)
                    setError(null)
                }

            } catch (err) {
                if (err.name === "AbortError") {
                    console.log("Fetch was aborted");
                } else {
                    setIsPending(false)
                    setError("Could not fetch data")
                }
            }
        }

        fetchData()

        return () => {
            controller.abort()
        }

    }, [url])

    return { data, error, isPending }

}

