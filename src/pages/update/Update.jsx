import "./Update.scss"
import React, { useEffect, useRef, useState } from 'react'
import { useDocument } from "../../hooks/useDocument"
import { useUpdate } from "../../hooks/useUpdate"
import { useNavigate, useParams } from 'react-router-dom'
import { useThemeContext } from "../../hooks/useThemeContext"

export default function Update() {

    const [recipeObject, setRecipeObject] = useState({
        title: '',
        method: '',
        cookingTime: '',
        ingredients: []
    })
    const [newIngredient, setnewIngredient] = useState('')


    //refs
    const ingredientInput = useRef(null)


    const { id } = useParams() //geting the dynamic route parameter (:id) from url
    const { color, mode } = useThemeContext()
    const navigate = useNavigate()
    const { data: recipe } = useDocument("recipes", id)
    const { updateDocument } = useUpdate("recipes")


    useEffect(() => {
        console.log(recipe)
        if (recipe) {
            setRecipeObject({
                title: recipe.title.toUpperCase(),
                method: recipe.method,
                cookingTime: parseInt(recipe.cookingTime),
                ingredients: recipe.ingredients
            })
        }
    }, [recipe])


    const handleAdd = (e) => {
        e.preventDefault()
        const newItem = newIngredient.trim()

        if (newItem && !recipeObject.ingredients.includes(newItem)) {
            setRecipeObject((prevState) => ({ ...prevState, ingredients: [...prevState.ingredients, newItem] }))
        }

        setnewIngredient("")
        ingredientInput.current.focus()
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        updateDocument(id, recipeObject)
        navigate(`/recipes/${id}`)
    }


    return (
        <div className='update'>
            <form className={`update__form ${mode}`} onSubmit={handleSubmit}>
                <label>
                    <span style={{ color: color }}>Title:</span>
                    <input
                        type="text"
                        onChange={(e) => { setRecipeObject({ ...recipeObject, title: e.target.value }) }}
                        value={recipeObject.title}
                        required
                    />
                </label>

                <label>
                    <span style={{ color: color }}>Ingredients:</span>
                    <div className="update__ingredients">
                        <input
                            type="text"
                            value={newIngredient}
                            onChange={(e) => { setnewIngredient(e.target.value) }}
                            ref={ingredientInput}
                        />
                        <button
                            className="update__ingredients--btn"
                            style={{ background: color }}
                            onClick={handleAdd}>
                            +
                        </button>
                    </div>
                    {recipeObject.ingredients && recipeObject.ingredients.map((item) => (
                        <em key={item} className={`update__ingredients--item ${mode}`}>{item}, </em>
                    ))}
                </label>
                <label >
                    <span style={{ color: color }}>Method:</span>
                    <textarea
                        onChange={(e) => { setRecipeObject({ ...recipeObject, method: e.target.value }) }}
                        value={recipeObject.method}
                        required
                        className="update__method"
                    />
                </label>
                <label >
                    <span style={{ color: color }}>Cooking time:</span>
                    <input
                        type="number"
                        onChange={(e) => { setRecipeObject({ ...recipeObject, cookingTime: e.target.value }) }}
                        value={recipeObject.cookingTime}
                        required
                    />
                </label>
                <button className="update__btn" style={{ background: color }}>Submit</button>
            </form>
        </div>
    )
}
