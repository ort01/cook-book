import "./Recipe.scss"
import { useParams } from 'react-router-dom'
import { useFetch } from "../../hooks/useFetch"



export default function Recipe() {

    const { id } = useParams() //geting the dynamic route parameter (:id) from url
    const url = `http://localhost:3000/recipes/${id}`

    const { data: recipe, error, isPending } = useFetch(url)

    return (
        <div>
            {error && <p className="error">{error}</p>}
            {isPending && <p>Loading...</p>}
            {recipe && <div className="recipe">
                <h2 className="recipe__title">{recipe.title}</h2>
                <div className="recipe__time">{recipe.cookingTime}</div>
                <ul className="recipe__items">
                    {recipe.ingredients.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>

                <p className="recipe__method">{recipe.method}</p>
            </div>

            }
        </div>
    )
}
