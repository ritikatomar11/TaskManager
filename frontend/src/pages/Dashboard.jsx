import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [formData, setFormData] = useState({ title: '', status: 'To Do' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
        e.preventDefault();
        if (!formData.title) {
            alert("Please fill in all required fields.");
            return;
        }
        setLoading(true); 
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/tasks` , 
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
                setFormData({title:"" , status:"To Do"}); 
                localStorage.setItem("user" , JSON.stringify(data.user)); 
                navigate("/allTasks"); 
            }else{
                alert(data.error ||"Task creation failed")
            } 
        } catch (error) {
            alert("Something went wrong");
            console.error(error); 
        }finally{
        setLoading(false)
        }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-xl font-semibold mb-4">Create a new Task</h1>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Task Title"
          className="border p-2 rounded w-full mb-4 text-black"
          required
        />

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded w-full"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Task'}
        </button>
      </form>

      <button
        onClick={() => navigate('/allTasks')}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl shadow-lg transition duration-300"
      >
        All Tasks
      </button>
    </div>
  );
}

export default Dashboard;
