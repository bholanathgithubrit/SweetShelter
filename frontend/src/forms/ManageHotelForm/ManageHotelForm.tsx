import { useForm,FormProvider} from "react-hook-form"
import DetailsSection from "./DetailsSection.tsx"
import TypeSection from "./TypeSection.tsx"
import FacilitiesSection from "./FacilitiesSection.tsx"
import GuestSection from "./GuestsSection.tsx"
import ImagesSection from "./ImageSectiion.tsx"
export type HotelFormData = {
    name: string,
    city: string,
    country: string,
    description: string,
    type: string,
    pricePerNight: number,
    starRating: number,
    facilities: string[],
    imageFiles: FileList,
    adultCount: number,
    childCount: number,
}
type Props={
    onSave:(HotelFormdata:FormData)=>void,
    isLoading:boolean
}

const ManageHotelForm = ({onSave,isLoading}:Props) => {
    const formMethods = useForm<HotelFormData>()
    const {handleSubmit}=formMethods
    const onSubmit=handleSubmit((formDataJson:HotelFormData)=>{
        console.log(formDataJson)
        const formData=new FormData()
        formData.append("name",formDataJson.name)
        formData.append("city",formDataJson.city)
        formData.append("country",formDataJson.country)
        formData.append("type",formDataJson.type)
        formData.append("description",formDataJson.description)
        formData.append("pricePerNight",formDataJson.pricePerNight.toString())
        formData.append("starRating",formDataJson.starRating.toString())
        formData.append("adultCount",formDataJson.adultCount.toString())
        formData.append("childCount",formDataJson.childCount.toString())
        
        formDataJson.facilities.forEach((facility,index)=>{
            formData.append(`facilities[${index}]`,facility)
        })

        Array.from(formDataJson.imageFiles).forEach((imageFiles)=>{
            formData.append(`imageFiles`,imageFiles)
        })

        console.log(Array.from(formData))
        onSave(formData)
    })
    return (
        <FormProvider {...formMethods}>
            <form className="flex flex-col gap-10 " onSubmit={onSubmit}>
                <DetailsSection/>
                <TypeSection/>
                <FacilitiesSection/>
                <GuestSection/>
                <ImagesSection/>
                <span className="flex justify-end">
                    <button disabled={isLoading} type="submit" className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl border rounded disabled:bg-gray-500">{isLoading?"Saving...":"Save"}</button>
                </span>
            </form>
        </FormProvider>
    )
}

export default ManageHotelForm
