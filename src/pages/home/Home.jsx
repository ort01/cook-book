//styles
import "./Home.scss"
//hooks
import { useCollection } from "../../hooks/useCollection"
//components
import RecipeList from "../../components/RecipeList"


export default function Home() {

    const { data, error, isPending } = useCollection("recipes")

    return (
        <div className="home">
            {error && <p className="error">{error}</p>}
            {isPending && <p className="loading">Loading...</p>}
            {data && <RecipeList recipes={data} />}
        </div>
    )
}
