import { createContext } from "react";

export const ThemeContext = createContext() //this returns an object

//react component
export function ThemeContextProvider({ children }) { // children prop represents any children COMPONENTS that the THemeProvider component wraps
    return (
        < ThemeContext.Provider value={{ color: "blue" }}>
            {children}
        </ThemeContext.Provider>
    )
}