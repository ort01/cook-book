import "./Recipe.scss"
import { useParams } from 'react-router-dom'
import { useThemeContext } from "../../hooks/useThemeContext"


//firestore
import { useDocument } from "../../hooks/useDocument"

export default function Recipe() {

    const { id } = useParams() //geting the dynamic route parameter (:id) from url
    const { color, mode } = useThemeContext()

    const { data: recipe, error, isPending } = useDocument("recipes", id)


    return (
        <div>
            {error && <p className="error">{error}</p>}
            {isPending && <p>Loading...</p>}
            {recipe && <div className={`recipe ${mode}`}>
                <h2 className="recipe__title" style={{ borderBottomColor: color }}>{recipe.title}</h2>
                <div className="recipe__time">{recipe.cookingTime}</div>
                <ul className="recipe__items">
                    {recipe.ingredients && recipe.ingredients.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>

                <p className="recipe__method">{recipe.method}</p>
            </div>

            }
        </div>
    )
}
