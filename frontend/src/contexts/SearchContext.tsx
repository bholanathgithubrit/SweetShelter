import React, { useContext, useState } from "react"

type SearchContext = {
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number,
    hotelId: string,
    saveSearchValues: (destination: string, checkIn: Date, checkOut: Date, adultCount: number, childCount: number) => void
}
type SearchContextProviderProps={
    children:React.ReactNode 
}

const SearchContext=React.createContext<SearchContext | undefined>(undefined)

export const SearchContextProvider=({children}:SearchContextProviderProps)=>{
    const [destination,setDestination]=useState<string>("")
    const [checkIn,setcheckIn]=useState<Date>(new Date())
    const [checkOut,setcheckOut]=useState<Date>(new Date())
    const [adultCount,setAdultcount]=useState<number>(1)
    const [childCount,setChildcount]=useState<number>(0)
    const [hotelId,setHotelId]=useState<string>("")

    const saveSearchValues=async (destination: string, checkIn: Date, checkOut: Date, adultCount: number, childCount: number,hotelId?:string)=>{
        setDestination(destination)
        setcheckIn(checkIn)
        setcheckOut(checkOut)
        setAdultcount(adultCount)
        setChildcount(childCount)
        if(hotelId)setHotelId(hotelId)
    }

    return(
        <SearchContext.Provider value={{
            destination,
            checkIn,
            checkOut,
            adultCount,
            childCount,
            hotelId,
            saveSearchValues
        }}>
            {children}
        </SearchContext.Provider>
    )
}


export const useSearchContext=()=>{
    const context=useContext(SearchContext)
    return context as SearchContext
}