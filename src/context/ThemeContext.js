import { createContext, useReducer } from "react";

export const ThemeContext = createContext() //this returns an object

//dispatch function on useReducer envokes this themeReducerFunction which updates the state 
const themeReducer = (state, action) => { // two arguments: 1. current up to date state, 2. action object from dispatch
    //returning a value that represents the new state
    switch (action.type) {
        case 'CHANGE_COLOR':
            return { ...state, color: action.payload }
        case 'CHANGE_MODE':
            return { ...state, mode: action.payload }
        default:
            return state
    }
}


//react component
export function ThemeContextProvider({ children }) { // children prop represents any children COMPONENTS that the THemeProvider component wraps


    const [state, dispatch] = useReducer(themeReducer, { // 1. argument - reducerFunction for updating the state; 2.argument - initial state
        color: "#4297a0",
        mode: "light"
    })

    const changeColor = (color) => {
        //dispatch - is a way that we can dispatch (send) state change to the reducer function (themeReducer)
        dispatch({ type: "CHANGE_COLOR", payload: color }) // argument is an action object with changed state (type of change, change itself - payload)
    }

    const changeMode = (mode) => {
        dispatch({ type: "CHANGE_MODE", payload: mode })
    }



    return (
        //passing in the spreaded STATE object with function that can change the state
        < ThemeContext.Provider value={{ ...state, changeColor, changeMode }}>
            {children}
        </ThemeContext.Provider>
    )
}