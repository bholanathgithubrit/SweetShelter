import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client"
import { useAppContext } from "../contexts/AppContext";
import {Link, useNavigate} from "react-router-dom"
export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string; 
};
const Register = () => {
  const queryClient=useQueryClient()
    const {showToast} =useAppContext()
  const navigate=useNavigate()

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();
//mutation=>it is used to handle operation in the server side like create/update/delete
  const mutation=useMutation(apiClient.register,{
    onSuccess:async ()=>{
      showToast({message:"Registation successfully",type:"SUCCESS"})
      await queryClient.invalidateQueries("validateToken")
      navigate("/")
    },
    onError:(error:Error)=>{
      showToast({message:"Failed to register",type:"ERROR"})
      console.log(error.message)
    }
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    mutation.mutate(data)
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Create Your account</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            type="text"
            className="border rounded w-full py-1 px-2 text-normal"
            {...register("firstName", { required: "This field is required" })}
          />
          {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            type="text"
            className="border rounded w-full py-1 px-2 text-normal"
            {...register("lastName", { required: "This field is required" })}
          />
          {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
        </label>
      </div>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 text-normal"
          {...register("email", { required: "This field is required" })}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 text-normal"
          {...register("password", {
            required: "This field is required",
            minLength: { value: 6, message: "Password must be 6 characters" },
          })}
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Confirm Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 text-normal"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This field is required";
              } else if (watch("password") !== val) {
                return "Password does not match";
              }
            },
          })}
        />
        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
      </label>
      <span className="flex items-center justify-between ">
      <span className="text-xm">Already have an account? <Link to="/sign-in" className="underline">Login here</Link></span>

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl border rounded"
        >
          Create Account
        </button>
      </span>
    </form>
  );
};

export default Register;
