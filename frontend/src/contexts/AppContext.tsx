import React, { useContext,useState } from "react"
import Toast from "../components/Toast"
import { useQuery } from "react-query"
import * as apiClient from "../api-client.ts"
type ToastMessage={
    message:string,
    type:"SUCCESS" | "ERROR"
}

type AppContext={
    showToast: (toastMessage:ToastMessage)=> void
    isLoggedIn:boolean
}

const AppContext=React.createContext<AppContext | undefined>(undefined)
//you can share data and functionality between components without having to pass props down manually. 

//why we use context
//when we have an parent componenet and multiple chile component 
//if we have to pass one value to the nested nested componenet 
//instead of sending like tree we can make context and then ant child
//can access the value

//contextProvider=>any child under the parent can access the value

export const AppContextProvider=({children}:{children:React.ReactNode})=>{

    const [toast,setToast]=useState<ToastMessage | undefined>(undefined)
    const {isError}=useQuery("validateToken",apiClient.validateToken,{
        retry:false
    })
    
    return(
        <AppContext.Provider value={{showToast:(ToastMessage)=>{
            setToast(ToastMessage)
            console.log(ToastMessage)
        },
        isLoggedIn:!isError}}>
            {toast && (<Toast message={toast.message} type={toast.type} onClose={()=>setToast(undefined)}/>)}
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext=()=>{
    const context=useContext(AppContext)
    return context as AppContext
}