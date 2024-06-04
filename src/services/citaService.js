import axios from "axios"
const BASE_URL = 'http://localhost:8080/citas';
const config = ()=>{ 
return{
    headers:{
        "Authorization" : sessionStorage.getItem('token'),
        "Content-Type" : "application/json",
    }
    
}
}
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
    },config())
} catch (error) {
    console.error(error)
    
}
return undefined;
}

export const update = async ({fecha,hora,idCita}) =>{

    try {
        return await axios.put(`${BASE_URL}/${idCita}`,{
            fecha,hora,
        },config())
    } catch (error) {
        console.error(error)
        
    }
    return undefined;
    }
export const updateReceta = async (idCita,recetaMedica) =>{

    try {
        return await axios.put(`${BASE_URL}/citacurso/updateReceta/${idCita}`,{
            recetaMedica
        },config())
    } catch (error) {
        console.error(error)
        
    }
    return undefined;
    }

    export const remove = async (idCita) =>{
        try {
            await axios.delete(`${BASE_URL}/${idCita}`,config());
            
        } catch (error) {
            console.error(error);
        }
    }

    export const sumarTardanzasDeTurno = async (idCita, tardanza)=>{
         console.log(idCita,tardanza)
        try{ 
        await axios.put(`${BASE_URL}/citacurso/${idCita}`,{
            tardanza,
           
        },config())
    } catch (error) {
        console.error(error);
    }
}
    export const finishCita = async (idCita)=>{
     
        try{ 
        await axios.put(`${BASE_URL}/citafinish/${idCita}`,{
            
           
        },config())
    } catch (error) {
        console.error(error);
    }
}

    
    
