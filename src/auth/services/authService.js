import axios from "axios";

export const loginPacient = async ({dni,password}) =>{

   try {
      return await axios.post('http://localhost:8080/login',{
         dni,password,
      })
      
   } catch (error) {
      throw error;
   }
}