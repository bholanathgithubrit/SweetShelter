import  { RegisterFormData } from "./pages/Register.tsx"
import { SignInFormData } from "./pages/SignIn.tsx"
import {HotelSearchResponse, HotelType, PaymentIntentResponse, UserType} from "../../backend/src/shared/types.ts"
import { BookingFormData } from "./forms/BookingForm/BookingForm.tsx"
const API_BASE_URL=import.meta.env.VITE_API_BASE_URL || ''

export const fetchCurrentUser=async ():Promise<UserType>=>{
    const response=await fetch(`${API_BASE_URL}/api/users/me`,{
        credentials:"include",
    })
    if(!response.ok)throw new Error("User does not found")
    return response.json()
}

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

export const fetchMyHotels=async ():Promise<HotelType[]>=>{
    const response=await fetch(`${API_BASE_URL}/api/my-hotels`,{
        credentials:"include"
    })
    if(!response.ok)throw new Error("Error fetching hotel")

    return response.json()
}

export const fetchMyHotelById=async (hotelId:string):Promise<HotelType>=>{
    const response=await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`,{
        credentials:"include"
    })
    if(!response.ok)throw new Error("Error fetching Hotels")
    return response.json()
}

export const updateMyHotelById=async (hotelFormData:FormData)=>{
    console.log(hotelFormData.get("hotelId"))
    const response=await fetch(`${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`,{
        method:"PUT",
        body:hotelFormData,
        credentials:"include"
    })
    if(!response.ok)throw new Error("Failed to update Hotel")
    
    return response.json()
}

export type SearchParams={
    destination?:string,
    checkIn?:string,
    checkOut?:string,
    adultCount?:string,
    childCount?:string,
    page?:string,
    facilities?:string[],
    types?:string[],
    stars?:string[],
    maxPrice?:string,
    minPrice?:string,
    sortOption?:string 
}

export const searchHotels=async (searchParams:SearchParams):Promise<HotelSearchResponse>=>{
    const queryParams=new URLSearchParams()
    queryParams.append("destination",searchParams.destination||"")
    queryParams.append("checkIn",searchParams.checkIn||"")
    queryParams.append("checkOut",searchParams.checkOut||"")
    queryParams.append("adultCount",searchParams.adultCount||"")
    queryParams.append("childCount",searchParams.childCount||"")
    queryParams.append("page",searchParams.page||"")

    queryParams.append("maxPrice",searchParams.maxPrice || "")
    queryParams.append("sortOption",searchParams.sortOption || "")

    searchParams.facilities?.forEach((facility)=>{queryParams.append("facilities",facility)})
    searchParams.types?.forEach((type)=>queryParams.append("types",type))
    searchParams.stars?.forEach((star)=>queryParams.append("stars",star))
    const response=await fetch(`${API_BASE_URL}/api/hotels/search?${queryParams}`)
    console.log(searchParams)
    if(!response.ok)throw new Error("Error fetching hotel")
    return response.json()
}

export const fetchHotelById=async (hotelId:string):Promise<HotelType>=>{
    const response=await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`)
    if(!response.ok) throw new Error("Error Fetching Hotels")
    return response.json()
}

export const createPaymentIntent = async (
    hotelId: string,
    numberOfNights: string
  ): Promise<PaymentIntentResponse> => {
    console.log(hotelId,numberOfNights)
    const response = await fetch(
      `${API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`,
      {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({ numberOfNights }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  
    if (!response.ok) {
      throw new Error("Error fetching payment intent");
    }
  
    return response.json();
  };

  export const createRoomBooking=async (formData:BookingFormData)=>{
    const response=await fetch(`${API_BASE_URL}/api/hotels/${formData.hotelId}/bookings`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        credentials:'include',
        body:JSON.stringify(formData)
    })
    if(!response.ok)throw new Error("Error booking room")
    
  }

  export const fetchMyBookings=async ():Promise<HotelType[]>=>{
     const response=await fetch(`${API_BASE_URL}/api/my-bookings`,{
        credentials:"include"
     })

    if(!response) throw new Error("NO Hotel Found")

    return response.json()
  }