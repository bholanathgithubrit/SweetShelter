import { useMutation, useQueryClient } from "react-query"
import * as apiClient from "../api-client"
import { useAppContext } from "../contexts/AppContext"

const SignOutButton=()=>{
    const queryClient=useQueryClient()
    const {showToast} =useAppContext()
    const mutation= useMutation(apiClient.signOut,{
        onSuccess:async ()=>{
            //when user logout then check isLoggedIn without refresh
            await queryClient.invalidateQueries("validateToken")
            showToast({message:"Signout Success!!",type:"SUCCESS"})
        },
        onError:(error:Error)=>{
            showToast({message:error.message,type:"ERROR"})
        }
    })

    const handelClick=()=>{
        mutation.mutate()
    }

    return(
        <button className="text-blue-600 px-3 font-bold hover:bg-gray-100 bg-white border rounded" onClick={handelClick}>SignOut</button>
        //<Link to="/Sign-Out" className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100 hover:text-green-500"><button>Logout</button></Link>

    )
}

export default SignOutButton