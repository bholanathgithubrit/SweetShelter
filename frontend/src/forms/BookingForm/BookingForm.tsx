import { useForm } from "react-hook-form"
import { PaymentIntentResponse, UserType } from "../../../../backend/src/shared/types"
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { StripeCardElement } from "@stripe/stripe-js"
import { useSearchContext } from "../../contexts/SearchContext"
import { useParams } from "react-router-dom"
import { useMutation } from "react-query"
import * as apiClient from "../../api-client"
import { useAppContext } from "../../contexts/AppContext"
type Props = {
    currentUser: UserType,
    paymentIntent: PaymentIntentResponse
}

export type BookingFormData = {
    firstName: string,
    lastName: string,
    email: string,
    adultCount:number,
    childCount:number,
    checkIn:string,
    checkOut:string,
    hotelId:string,
    totalCost:number,
    paymentIntentId:string
}

const BookingForm = ({ currentUser, paymentIntent }: Props) => {
    const stripe=useStripe()
    const elements=useElements()
    const search=useSearchContext()
    const {hotelId}=useParams()
    const {showToast}=useAppContext()
    const {mutate:BookRoom,isLoading}=useMutation(apiClient.createRoomBooking,{
        onSuccess:()=>{
            showToast({message:"Hotel Booking Successfully",type:"SUCCESS"})
        },
        onError:()=>{
            showToast({message:"Hotel Booking Failed",type:"ERROR"})
        }
    })
    const { handleSubmit, register } = useForm<BookingFormData>({
        defaultValues: {
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            email: currentUser.email,
            adultCount:search.adultCount,
            childCount:search.childCount,
            checkIn:search.checkIn.toISOString(),
            checkOut:search.checkOut.toISOString(),
            hotelId:hotelId,
            totalCost:paymentIntent.totalCost,
            paymentIntentId:paymentIntent.paymentIntentId
        }
    })
    const onSubmit=async (formData:BookingFormData)=>{
        if(!stripe)return
        if(!elements)return
        const result=await stripe.confirmCardPayment(paymentIntent.clientSecret,{payment_method:{
            card:elements.getElement(CardElement) as StripeCardElement
        }}) 
        if(result.paymentIntent?.status==='succeeded'){
            BookRoom({...formData,paymentIntentId:result.paymentIntent.id})
        } 

    }
    return (
        <form className="grid grid-cols-1 gap-5 rounded rounded-slate-300 p-5" onSubmit={handleSubmit(onSubmit)}>
            <span className="text-3xl fontbold">Confrom Your Deatils</span>
            <div className="grid grid-cols-2 gap-6">
                <label className="text-gray-700 text-sm font-bold flex-1">
                    First Name
                    <input type="text" readOnly disabled {...register("firstName")} className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal" />
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Last Name
                    <input type="text" readOnly disabled {...register("lastName")} className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal" />
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Email
                    <input type="text" readOnly disabled {...register("email")} className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal" />
                </label>
            </div>
            <div className="space-y-2">
                <h2 className="text-xl font-semibold">Your Price Summery</h2>
                <div className="bg-blue-200 p-4 rounded-md">
                    <div className="font-semibold text-lg">
                        Total Cost: ₹{paymentIntent.totalCost.toFixed(2)}
                    </div>
                    <div className="text-xs">Includes taxex and charges</div>
                </div>
            </div>
            <div className="space-y-2">
                <h3 className="text-xl font-semibold">Payment Details</h3>
                <CardElement id="payment-element" className="border rounded-md p-2 text-sm" />
            </div>

            <div className="flex justify-end">
                <button type="submit" className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-md disabled:bg-gray-500" disabled={isLoading}>{isLoading? "Booking...": "Confirm Booking"}</button>
            </div>
        </form>
    )
}

export default BookingForm