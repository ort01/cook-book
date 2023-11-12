import { useContext, React } from 'react'
import { Link } from 'react-router-dom'
import { ThemeContext } from "../context/ThemeContext"
//styles
import "./Navbar.scss"
//components
import Searchbar from "../components/Searchbar"



export default function Navbar() {

    const { color } = useContext(ThemeContext)

    return (
        <div className='navbar' style={{ background: color }}>
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
