import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext"


export const useThemeContext = () => {
    const context = useContext(ThemeContext) //const context = ThemeContext object

    if (context === undefined) {
        throw new Error("useTheme() must be used inside a ThemeProvider")
    }

    return context
}