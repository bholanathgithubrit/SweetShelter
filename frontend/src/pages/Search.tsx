import { useSearchContext } from "../contexts/SearchContext"
import * as apiClient from "../api-client"
import { useQuery } from "react-query"
import { useState } from "react"
import SearchResultCard from "../components/SearchResultsCard"
import Pagination from "../components/Pagination.tsx"
import StarRatingFilter from "../components/StarRating.tsx"
import HotelTypesFilter from "../components/HotelTypesFilter.tsx"
import FacilitiesFilter from "../components/FacilitiesFilter.tsx"
import PriceFilter from "../components/PriceFilter.tsx"
const Search=()=>{
    const search=useSearchContext()
    const [page,setPage]=useState<number>(1)
    const [selectedStar,setSelectedStar]=useState<string[]>([])
    const [selectedHotelTypes,setSelsectedHotelTypes]=useState<string[]>([])
    const [selectedFacilityFilter,setselectedFacilityFilter]=useState<string[]>([])
    const [selectedPrice,setselectedPrice]=useState<number|undefined>()
    const [sortOption,setSortOption]=useState<string>("")

    const handleStarsChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        const starRating=event.target.value
        setSelectedStar((prevStars)=>(
            event.target.checked?[...prevStars,starRating]:prevStars.filter((star)=>star!==starRating)
        ))
    }
    const handleHotelTypeChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        const hotelType=event.target.value
        setSelsectedHotelTypes((prevHotel)=>(
            event.target.checked?[...prevHotel,hotelType]:prevHotel.filter((hotel)=>hotel!==hotelType)
        ))
    }
    const handlefacilitiesFilter=(event:React.ChangeEvent<HTMLInputElement>)=>{
        const Facility=event.target.value
        setselectedFacilityFilter((prevfacility)=>(
            event.target.checked?[...prevfacility,Facility]:prevfacility.filter((facility)=>facility!==Facility)
        ))
    }

    const searchParams={
        destination:search.destination,
        checkIn:search.checkIn.toISOString(),
        checkOut:search.checkOut.toISOString(),
        adultCount:search.adultCount.toString(),
        childCount:search.childCount.toString(),
        page:page.toString(),
        stars:selectedStar,
        types:selectedHotelTypes,
        facilities:selectedFacilityFilter,
        maxPrice:selectedPrice?.toString(),
        sortOption
    }

    //when we change the pagination 
    //searchquery parameter automatically called the fetch 
    const {data:hotelData}=useQuery(["searchHotels",searchParams],()=>apiClient.searchHotels(searchParams))
    console.log(search)

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
                <div className="space-y-5">
                    <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
                        Filter By:
                    </h3>
                    <StarRatingFilter selectedStars={selectedStar} onChange={handleStarsChange}/>
                    <HotelTypesFilter selectedHotelTypes={selectedHotelTypes} onChange={handleHotelTypeChange}/>
                    <FacilitiesFilter selectedFacilities={selectedFacilityFilter} onChange={handlefacilitiesFilter}/>
                    <PriceFilter selectedPrice={selectedPrice} onChange={(value?:number)=>setselectedPrice(value)}/>
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">
                        {hotelData?.pagination.total} Hotels found {search.destination? ` in ${search.destination}`:""}
                    </span>
                    <select value={sortOption} onChange={(event)=>setSortOption(event.target.value)} className="p-2 border rounded-md">
                        <option value="">Sort By</option>
                        <option value="starRating">Star Rating</option>
                        <option value="pricePerNightAsc">Price Per Night (low to high)</option>
                        <option value="pricePerNightDesc">Price Per Night (high to low)</option>
                    </select>
                </div>
                {hotelData?.data.map((hotel)=>(
                    <SearchResultCard hotel={hotel} key={hotel._id}/>
                ))}
                <div>
                    <Pagination page={hotelData?.pagination.page || 1} pages={hotelData?.pagination.pages || 1} onPageChange={(page)=>setPage(page)}/>
                </div>
            </div>

        </div>
    )
}

export default Search 