import axios from "axios"
const BASE_URL = 'http://localhost:8080/citas';
export const findAll = async () =>{
    try{
        const response = await axios.get(BASE_URL);
    return response;
        
    }catch(error){
        console.error(error);

    }
    return null;
}

export const save = async ({especialidad, medico, fecha, hora,estado,pacient}) =>{
try {
    return await axios.post(BASE_URL,{
        fecha,especialidad,medico,hora,estado,pacient
    })
} catch (error) {
    console.error(error)
    
}
return undefined;
}

export const update = async ({fecha,hora,idCita}) =>{

    try {
        return await axios.put(`${BASE_URL}/${idCita}`,{
            fecha,hora,
        })
    } catch (error) {
        console.error(error)
        
    }
    return undefined;
    }

    export const remove = async (idCita) =>{
        try {
            await axios.delete(`${BASE_URL}/${idCita}`);
            
        } catch (error) {
            console.error(error);
        }
    }
