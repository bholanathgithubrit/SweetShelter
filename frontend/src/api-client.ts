import  { RegisterFormData } from "./pages/Register.tsx"
import { SignInFormData } from "./pages/SignIn.tsx"
const API_BASE_URL=import.meta.env.VITE_API_BASE_URL || ''
export const register=async(formData:RegisterFormData)=>{
    const response = await fetch(`${API_BASE_URL}/api/users/register`,{
        method:'POST',
        credentials:"include",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
    })
    const responseBody=await response.json()
    if(!response.ok){
        throw new Error(responseBody.message)
    }
}

export const SignIn=async (formData:SignInFormData)=>{
    const response=await fetch(`${API_BASE_URL}/api/auth/login`,{
        method:"POST",
        credentials:"include",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
    })
    const body=await response.json()
    if(!response.ok){
        throw new Error(body.message)
    }
    return body 
}

export const validateToken=async()=>{
    const response=await fetch(`${API_BASE_URL}/api/auth/validate-token`,{
        credentials:'include'
    })
    if(!response.ok){
        throw new Error("Token Invalid")
    }
    return await response.json()
}

export const signOut=async()=>{
    const response=await fetch(`${API_BASE_URL}/api/auth/logout`,{
        credentials:"include",
        method:"POST"
    })
    if(!response.ok){
        throw new Error("Error during sign-out")
    }
    //return await response.json()
}

export const addMyHotel=async (hotelFormData:FormData)=>{
    console.log(Array.from(hotelFormData)) 
    const response=await fetch(`${API_BASE_URL}/api/my-hotels`,{
        method:"POST",
        credentials:"include",
        body:hotelFormData
    })
    console.log("fetch api")
    if(!response.ok)throw new Error("Failed to add Hotel")
    return response.json()
}