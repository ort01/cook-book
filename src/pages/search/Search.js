import "./Search.scss"

import { useLocation } from 'react-router-dom'


export default function Search() {

    // getting the value of the custom query parameter -> ?q=value (note: q= can also be dog=, mother= or whatever)
    const queryString = useLocation() //?q="xy"
    const queryParams = new URLSearchParams(queryString)
    const query = queryParams.get('q')

    return (
        <div>Search</div>
    )
}
