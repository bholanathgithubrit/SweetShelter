import {useParams} from "react-router-dom"
import * as apiClient from "../api-client"
import {useMutation, useQuery} from "react-query"
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm"
import { useAppContext } from "../contexts/AppContext"
const EditHotel=()=>{
    const {hotelId}=useParams()
    const {showToast}=useAppContext()
    const {data:hotel}=useQuery("fetchMyHotelbyId",()=>apiClient.fetchMyHotelById(hotelId || ""),{
        enabled:!!hotelId,
    })
    const {mutate,isLoading}=useMutation(apiClient.updateMyHotelById,{
        onSuccess:()=>{
             showToast({message:"Hotel Update Successfully",type:"SUCCESS"})
        },
        onError:()=>{
            showToast({message:"Hotel Update Failed",type:"ERROR"})
        }
    })
    const handleSave=(HotelFormData:FormData)=>{
            mutate(HotelFormData)
    }
    return <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isLoading}/>
}
 
export default EditHotel
