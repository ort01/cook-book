import { useState, useEffect } from "react";

export const useFetch = (url, method = "GET") => {

    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const [options, setOptions] = useState(null)

    const postData = (data) => {
        setOptions({
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
    }

    useEffect(() => {
        const controller = new AbortController()

        const fetchData = async (fetchOptions) => {
            setIsPending(true)

            try {
                const res = await fetch(url, { ...fetchOptions, signal: controller.signal })

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



        if (method === "GET") {
            fetchData()
        } else if (method === "POST" && options) {
            fetchData(options)
        }


        return () => {
            controller.abort()
        }

    }, [url, method, options])

    return { data, error, isPending, postData }

}

