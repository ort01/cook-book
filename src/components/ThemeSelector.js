import React from 'react'
import "./ThemeSelector.scss"
import { useThemeContext } from "../hooks/useThemeContext"
import modeIcon from "../assets/mode-icon.svg"

export default function ThemeSelector() {

    const { changeColor, changeMode, mode } = useThemeContext()

    const themeColors = ["#4297a0", "#e4b7a0", "#A49393"]

    const toggleMode = () => {

        changeMode(mode === "light" ? "dark" : "light")
        console.log(mode);
    }

    return (
        <div className='selector'>
            <div className='selector__theme'>
                {themeColors.map((color) => (
                    <div
                        key={color}
                        className="selector__theme--color"
                        style={{ background: color }}
                        onClick={() => {
                            changeColor(color)
                        }} />
                ))}
            </div>
            <div className="selector__mode">
                <img
                    src={modeIcon}
                    alt="mode-icon"
                    onClick={toggleMode}
                    style={{ filter: mode === "light" ? "invert(100%)" : null }}
                />
            </div>
        </div>

    )
}
