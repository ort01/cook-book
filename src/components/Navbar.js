import React from 'react'
import "./Navbar.scss"
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <div className='navbar'>
            <nav>
                <Link to="/" className='navbar__brand'>
                    <h1 >Cook Book</h1>
                </Link>
                <Link to="/create">
                    Create Recipe
                </Link>
            </nav>
        </div>
    )
}
