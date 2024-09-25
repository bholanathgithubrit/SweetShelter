import { useQuery } from "react-query"
import * as apiClient from "../api-client"
import BookingForm from "../forms/BookingForm/BookingForm"
import { useSearchContext } from "../contexts/SearchContext"
import { useParams } from "react-router-dom"
import {  useEffect, useState } from "react"
import BookingDetailSummery from "../components/BookingDetailSummery"
import { Elements } from "@stripe/react-stripe-js"
import { useAppContext } from "../contexts/AppContext"

const Booking=()=>{
    const {stripePromise}=useAppContext()
    const search=useSearchContext()
    const {hotelId}=useParams()
    const {data:hotel}=useQuery("fetchHotelById",()=>apiClient.fetchHotelById(hotelId as string),{
        enabled:!!hotelId
    })

    const [numberOfNights,setNumberOfNight]=useState<number>(0)
    useEffect(()=>{
        if(search.checkIn && search.checkOut){
            const night=Math.abs(search.checkOut.getTime()-search.checkIn.getTime())/(1000*60*60*24)
            setNumberOfNight(Math.ceil(night))

        }
    },[search.checkIn,search.checkOut])

    const {data:paymentIntentData} =useQuery("createPaymentIntent",()=>apiClient.createPaymentIntent(hotelId as string,numberOfNights.toString()),{
        enabled:!!hotelId && numberOfNights > 0
    })
    console.log(paymentIntentData,"payment")
    const {data:currentUser}=useQuery("fetchCurrentUser",apiClient.fetchCurrentUser)
    console.log(currentUser?.firstName)
    if(!hotel) return <></>
    return(
        <div className="grid md:grid-cols-[1fr_2fr]">
            <BookingDetailSummery checkIn={search.checkIn} checkOut={search.checkOut} adultCount={search.adultCount} childCount={search.childCount} numberOfNight={numberOfNights} hotel={hotel}/>
            {currentUser && paymentIntentData && (
                <Elements stripe={stripePromise} options={{
                    clientSecret:paymentIntentData.clientSecret
                }}>
                    <BookingForm currentUser={currentUser} paymentIntent={paymentIntentData}/>
                    
                </Elements>
             )}

        </div>
    )
}

export default Booking

