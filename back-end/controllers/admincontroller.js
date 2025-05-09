//API for adding doctor

const addDoctor = async (req,res)=>{
  try{
    const {name,email,password,speciality,degree,experience,about,fees,adress}=req.body

    const imageFile =req.file

    console.log({name,email,password,speciality,degree,experience,about,fees,adress},imageFile);
    

  }
  catch (error)
  {

  }
}
export {addDoctor}