import React , {useState , useEffect} from "react"
import { useNavigate } from "react-router-dom";
function Login (){
    const [formData , setFormData ] = useState({
        email: "",
        password: "",
    });
    const [loading , setLoading] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleLogin = async(e)=>{
        e.preventDefault(); 
        if (!formData.email || !formData.password ) {
            alert("Please fill in all required fields.");
            return;
        }
        setLoading(true); 
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/login` , 
            {
            method:"POST" , 
            headers:{
                "Content-Type":"application/json" 
            } , 
            credentials:"include",
            body:JSON.stringify(formData),
            })  ; 
            console.log(res); 
            const  data = await res.json(); 
            console.log(data);
             if(res.ok){
                setFormData({email:"" , password:""}); 
                // localStorage.setItem("token",data.token); 
                localStorage.setItem("user" , JSON.stringify(data.user)); 
                navigate("/"); 
            }else{
                alert(data.error ||"Signup failed")
            } 
        } catch (error) {
            alert("Something went wrong");
            console.error(error); 
        }finally{
        setLoading(false)
        }
    }

    return (
     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
         
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login 
          </button>
        </form>
       
      </div>
    </div>
    )
}
export default Login ; 