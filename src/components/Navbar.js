import { React } from 'react'
import { Link } from 'react-router-dom'
import { useThemeContext } from "../hooks/useThemeContext"
//styles
import "./Navbar.scss"
//components
import Searchbar from "../components/Searchbar"



export default function Navbar() {

    const { color, changeColor } = useThemeContext()

    return (
        <div className='navbar' style={{ background: color }}>
            <nav onClick={() => changeColor("pink")}>
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
