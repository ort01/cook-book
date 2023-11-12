import React from 'react'
import "./ThemeSelector.scss"
import { useThemeContext } from "../hooks/useThemeContext"

export default function ThemeSelector() {

    const { changeColor } = useThemeContext()
    const themeColors = ["#4297a0", "#e4b7a0", "#A49393"]

    return (
        <div className='theme-selector'>
            {themeColors.map((color) => (
                <div
                    className="theme-selector__color"
                    style={{ background: color }}
                    onClick={() => {
                        changeColor(color)
                    }} />
            ))}
        </div>
    )
}
