import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";
const Header = () => {
    const {isLoggedIn}=useAppContext()
    return (
        <div className="bg-blue-custom py-6">
            <div className="container mx-auto flex justify-between">
                <span className="text-3xl text-white font-bold tracking-tight">
                    <Link to="/">SweetHome.com</Link>
                </span>
                <span className="flex space-x-2">
                    {isLoggedIn? 
                    <>
                    <Link to="/my-bookings" className="flex  items-center text-blue-600 px-3 font-bold hover:bg-gray-100 hover:text-green-500  rounded">my-Bookings</Link>
                    <Link to="/my-hotels" className="flex  items-center text-blue-600 px-3 font-bold hover:bg-gray-100 hover:text-green-500  rounded">my-hotels</Link>
                    <SignOutButton/>
                    </>:
                    <Link to="/sign-in" className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100 hover:text-green-500 border rounded">Sign In</Link>
                    }
                </span>
            </div>
        </div>
    )
}
export default Header;