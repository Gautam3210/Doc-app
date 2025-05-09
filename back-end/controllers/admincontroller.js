//API for adding doctor

const addDoctor = async (req,res)=>{
  try{
    const {name,email,password,speciality,degree,experience,about,fees,adress}=req.body

    const imageFile =req.file

   //checking for all data to add doctor
   if( !name|| !email || !password || !speciality ||!degree || !experience || !about || !fees ||!adress){

    return res.json({succss:false,message:"Missing Details"})
   }
    //validating email format
    if(!validator.isEmail(email)){
       return res.json({succss:false,message:"Missing Details"})
    }

  }
  catch (error)
  {

  }
}
export {addDoctor}