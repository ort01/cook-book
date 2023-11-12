import { React } from 'react'
import { Link } from 'react-router-dom'
import { useThemeContext } from "../hooks/useThemeContext"
//styles
import "./Navbar.scss"
//components
import Searchbar from "../components/Searchbar"
import ThemeSelector from "./ThemeSelector"



export default function Navbar() {

    const { color } = useThemeContext()

    return (
        <div className='navbar' style={{ background: color }}>
            <nav >
                <Link to="/" className='navbar__brand'>
                    <h1 >Cook Book</h1>
                </Link>
                <ThemeSelector />
                <Searchbar />
                <Link to="/create">
                    Create Recipe
                </Link>
            </nav>
        </div>
    )
}
