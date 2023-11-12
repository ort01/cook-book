import React from 'react'
import './RecipeList.scss'
import { Link } from 'react-router-dom'
import { useThemeContext } from '../hooks/useThemeContext'

export default function RecipeList({ recipes }) {

    const { mode } = useThemeContext()

    if (!recipes.length) {
        return <div className='error'>No recipes to be shown...</div>
    }

    return (
        <div className='recipe-list'>
            {recipes.map((recipe) => (
                <Link key={recipe.id} to={`/recipes/${recipe.id}`}>
                    <div className={`recipe-list__card ${mode}`}>
                        <h3 >{recipe.title}</h3>
                        <p>{recipe.cookingTime} to make.</p>
                        <div className='recipe-list__method'>
                            {recipe.method.substring(0, 100)}...
                        </div>
                    </div>
                </Link>
            ))}
        </div>

    )
}
