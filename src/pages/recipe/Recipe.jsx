import "./Recipe.scss"
import { useParams, Routes, Route, useNavigate } from 'react-router-dom'
import { useThemeContext } from "../../hooks/useThemeContext"
import deleteIcon from "../../assets/delete.svg"
import editIcon from "../../assets/edit.svg"

import Update from "../update/Update"

//firestore
import { useDocument } from "../../hooks/useDocument"
import { useDelete } from '../../hooks/useDelete'

export default function Recipe() {

    const { id } = useParams() //geting the dynamic route parameter (:id) from url
    const { color, mode } = useThemeContext()
    const navigate = useNavigate()
    const { data: recipe, error, isPending } = useDocument("recipes", id)
    const { deleteDocument } = useDelete("recipes")



    return (
        <div>
            {error && <p className="error">{error}</p>}
            {isPending && <p className="loading">Loading...</p>}
            {recipe && <div className={`recipe ${mode}`}>
                <h2 className="recipe__title" style={{ borderBottomColor: color }}>{recipe.title}</h2>
                <div className="recipe__time">{`${recipe.cookingTime} minutes`}</div>
                <ul className="recipe__items">
                    {recipe.ingredients && recipe.ingredients.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>

                <p className="recipe__method">{recipe.method}</p>
                <div className="recipe__icons">
                    <img src={editIcon} alt="trashcan" className='recipe__icons--edit' onClick={() => { navigate(`/recipes/${id}/update`) }} />
                    <img src={deleteIcon} alt="trashcan" className='recipe__icons--delete' onClick={() => { deleteDocument(recipe.id) }} />
                </div>

            </div>
            }

            <Routes>
                <Route path="update" element={<Update />} />
            </Routes>
        </div>
    )
}
