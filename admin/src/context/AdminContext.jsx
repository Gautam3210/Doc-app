import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") || ""
  );
  const [doctors, setDoctors] = useState([]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  const getAllDoctors = async () => {
  try {
    const { data } = await axios.post(
      backendUrl + "/api/admin/all-doctors",
      {},
      { headers: { atoken: aToken } }  // custom header name
    );

    console.log("API response:", data);

    if (data.success) {
      setDoctors(data.doctors);
      console.log("Doctors from API:", data.doctors);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
    console.error(error);
  }
};


const changeAvailability = async(docId)=>{
  try {
       
    const {data} = await axios.post(backendUrl + '/api/admin/change-availability',{docId},{headers:{atoken: aToken},} )

    if(data.success){
      toast.success(data.message)
      getAllDoctors()
    }
    else{
      toast.error(data.message)
    }
  } catch (error) {
    
  }
}
  

  const value = {
    aToken,
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,changeAvailability,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export {AdminContext,AdminContextProvider};
