import "./Searchbar.scss"
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useThemeContext } from "../hooks/useThemeContext"

export default function Searchbar() {

    const [term, setTerm] = useState("")

    const history = useHistory()


    const handleSubmit = (e) => {
        e.preventDefault()

        history.push(`/search?q=${term}`)
    }

    const { mode } = useThemeContext()

    return (
        <div className="search-bar">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="search"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    required
                    className={mode}
                />
                <label htmlFor="search" className={mode}>
                    <i className="material-symbols-outlined md-36">search</i>
                </label>
            </form>
        </div>
    )
}
