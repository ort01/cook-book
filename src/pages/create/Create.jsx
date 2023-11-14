import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";

import "./Create.scss"
import { useFetch } from "../../hooks/useFetch"
import { useThemeContext } from "../../hooks/useThemeContext";


export default function Create() {
    //states
    const [title, setTitle] = useState('')
    const [method, setMethod] = useState('')
    const [cookingTime, setCookingTime] = useState('')
    const [newIngredient, setnewIngredient] = useState('')
    const [ingredients, setIngredients] = useState([])
    //refs
    const ingredientInput = useRef(null)
    //composable / custom hook
    const { postData, data } = useFetch("http://localhost:3000/recipes", "POST")
    const { mode, color } = useThemeContext()
    //router
    const navigate = useNavigate()

    //functions
    const handleAdd = (e) => {
        e.preventDefault()
        const newItem = newIngredient.trim()

        if (newItem && !ingredients.includes(newItem)) {
            setIngredients((prevState) => (
                [...prevState, newItem]
            ))
        }

        setnewIngredient("")
        ingredientInput.current.focus()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        postData({
            title: title,
            ingredients: ingredients,
            method: method,
            cookingTime: `${cookingTime} minutes`
        })
    }
    //user redirect
    useEffect(() => {
        if (data) {
            navigate("/")
        }
    }, [data, navigate])



    //html
    return (
        <div className={`create ${mode}`}>
            <h2 className="create__title">Add a New Recipe</h2>
            <form className="create__form" onSubmit={handleSubmit}>
                <label>
                    <span>Title:</span>
                    <input
                        type="text"
                        onChange={(e) => { setTitle(e.target.value) }}
                        value={title}
                        required
                    />
                </label>

                <label>
                    <span>Ingredients:</span>
                    <div className="create__ingredients">
                        <input
                            type="text"
                            value={newIngredient}
                            onChange={(e) => { setnewIngredient(e.target.value) }}
                            ref={ingredientInput}
                        />
                        <button
                            className="create__ingredients--btn"
                            style={{ background: color }}
                            onClick={handleAdd}>
                            +
                        </button>
                    </div>
                </label>
                {ingredients && ingredients.map((item) => (
                    <em key={item} className="create__ingredients--item">{item}, </em>
                ))}

                <label >
                    <span>Method:</span>
                    <textarea
                        onChange={(e) => { setMethod(e.target.value) }}
                        value={method}
                        required
                    />
                </label>
                <label >
                    <span>Cooking time:</span>
                    <input
                        type="number"
                        onChange={(e) => { setCookingTime(e.target.value) }}
                        value={cookingTime}
                        required
                    />
                </label>
                <button className="create__btn" style={{ background: color }}>Submit</button>
            </form>
        </div>
    )
}