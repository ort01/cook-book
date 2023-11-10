import React from 'react'
import { Link } from 'react-router-dom'

import "./Navbar.scss"

import Searchbar from "../components/Searchbar"

export default function Navbar() {
    return (
        <div className='navbar'>
            <nav>
                <Link to="/" className='navbar__brand'>
                    <h1 >Cook Book</h1>
                </Link>
                <Searchbar />
                <Link to="/create">
                    Create Recipe
                </Link>
            </nav>
        </div>
    )
}
