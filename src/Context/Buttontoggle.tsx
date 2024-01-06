"use client";
import React, { useContext, useEffect, useReducer } from "react";
import { createContext } from "react";


type initialValuesType={
    theme: string
}

type ActionType ={
    type: "CHANGE_THEME"
}

type action = ActionType


const color = localStorage.getItem("theme")
const themeColor = color? JSON.parse(color): "light"

const initialValues:initialValuesType ={
    theme: themeColor
}

export const DarkContext = createContext<{
    state: initialValuesType,
    dispatch: React.Dispatch<action>}>
    ({
     state:initialValues,
    dispatch:()=>{},
})

const DarkReducer=(state:initialValuesType, action:ActionType)=>{
    switch(action.type){
        case "CHANGE_THEME":
            return{
                ...state, 
                theme: state.theme=== "light"? "dark" :"light"
            }
        
    }

}

export const DarkContextProvider=({children}:{children:React.ReactNode})=>{

    const [state, dispatch] = useReducer(DarkReducer, initialValues)

    useEffect(() => {
     localStorage.setItem("theme", JSON.stringify(state.theme|| "light"))
    }, [state.theme])
    

    return ( <DarkContext.Provider value={{state, dispatch}} >
        {children}</DarkContext.Provider> )
}

