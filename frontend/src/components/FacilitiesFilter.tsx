

import { hotelFacilities } from "../config/hotel-options-config"


type Props={
    selectedFacilities:string[],
    onChange:(event:React.ChangeEvent<HTMLInputElement>)=>void
}

const FacilitiesFilter=({selectedFacilities: selectedFacilitiesFilter,onChange}:Props)=>{
    return(
        <div className="border-b border-slate-300 pb-5">
            <h4 className="text-md font-semibold mb-2">Fcility</h4>
            {hotelFacilities.map((facility)=>(
                <label className="flex items-center">
                    <input type="checkbox" className="rounded" value={facility} checked={selectedFacilitiesFilter.includes(facility)} onChange={onChange}/>
                    <span>{facility}</span>
                </label>
            ))}
        </div>
    )
}

export default FacilitiesFilter