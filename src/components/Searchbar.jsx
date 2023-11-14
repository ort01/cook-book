import "./Searchbar.scss"
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useThemeContext } from "../hooks/useThemeContext"

export default function Searchbar() {

    const [term, setTerm] = useState("")

    const navigate = useNavigate()


    const handleSubmit = (e) => {
        e.preventDefault()

        navigate(`/search?q=${term}`)
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
