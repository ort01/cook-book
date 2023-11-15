import React from 'react'
import './RecipeList.scss'
import { Link } from 'react-router-dom'
import { useThemeContext } from '../hooks/useThemeContext'
import { useDelete } from '../hooks/useDelete'
import deleteIcon from "../assets/delete.svg"
import editIcon from "../assets/edit.svg"


export default function RecipeList({ recipes }) {

    const { mode } = useThemeContext()
    const { deleteDocument } = useDelete("recipes")


    if (!recipes.length) {
        return <div className='error'>No recipes to be shown...</div>
    }

    return (
        <div className='recipe-list'>
            {recipes.map((recipe) => (
                <div key={recipe.id} className={`recipe-list__card ${mode}`}>
                    <div className='recipe-list__text'>
                        <Link to={`/recipes/${recipe.id}`}>
                            <div>
                                <h3 >{recipe.title}</h3>
                                <p>{recipe.cookingTime} to make.</p>
                                <div className='recipe-list__method'>
                                    {recipe.method.substring(0, 100)}...
                                </div>
                            </div>
                        </Link>
                    </div>
                    <img src={deleteIcon} alt="trashcan" className='recipe-list__delete' onClick={() => { deleteDocument(recipe.id) }} />
                    <img src={editIcon} alt="trashcan" className='recipe-list__edit' onClick={() => { }} />
                </div>




            ))}
        </div>

    )
}
