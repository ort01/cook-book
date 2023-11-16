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
    const navigate = useNavigate()

    //refs
    const ingredientInput = useRef(null)
    //data
    const { id } = useParams() //geting the dynamic route parameter (:id) from url
    const { color, mode } = useThemeContext()
    const { data: recipe, isPending } = useDocument("recipes", id)
    const { updateDocument } = useUpdate("recipes")

    //getting the data from firestore and setting the state object values
    useEffect(() => {

        if (recipe) {
            setRecipeObject({
                title: recipe.title,
                method: recipe.method,
                cookingTime: parseInt(recipe.cookingTime),
                ingredients: recipe.ingredients
            })
        }
    }, [recipe])

    //adding each ingredient into array
    const handleAdd = (e) => {
        e.preventDefault()
        const newItem = newIngredient.trim()

        if (newItem && !recipeObject.ingredients.includes(newItem)) {
            setRecipeObject((prevState) => ({ ...prevState, ingredients: [...prevState.ingredients, newItem] }))
        }

        setnewIngredient("")
        ingredientInput.current.focus()
    }

    //deleting ingredients from the array
    const deleteIngredient = (item) => {
        const filter = recipeObject.ingredients.filter((i) => {
            return i !== item
        })
        setRecipeObject((prevState) => ({ ...prevState, ingredients: filter }))
    }

    //dubmiting the form and updating firestore document
    const handleSubmit = (e) => {
        e.preventDefault()
        updateDocument(id, recipeObject)
        navigate(`/recipes/${id}`)
    }






    return (
        <div>
            {isPending && <div className="loading">Loading...</div>}
            {recipe &&
                <div className='update'>
                    <form className={`update__form ${mode}`} onSubmit={handleSubmit}>
                        <label>
                            <span style={{ color: color }}>Title:</span>
                            <input
                                type="text"
                                onChange={(e) => { setRecipeObject({ ...recipeObject, title: e.target.value.toUpperCase() }) }}
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
                                <em key={item} className={`update__ingredients--item ${mode}`} onClick={() => deleteIngredient(item)}>{item}, </em>
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
            }
        </div>

    )
}
