import { useEffect, useState } from "react"
import { CitaForm } from "../../components/CitaForm"
import { useParams } from "react-router-dom";

export const RegisterCita = ({ citas=[],handlerAddCita, initialCitasForm}) =>{
const [citaSelected, setCitaSelected] = useState(initialCitasForm);
const {idCita} = useParams();
useEffect(()=>{
    if(idCita){

        const cita = citas.find(c => c.idCita == idCita) || initialCitasForm;
        setCitaSelected(cita);
    }

},[idCita])

    return(

        <div className="container my-4">
            <h4>Citas Medicas</h4>
            <div className="row">
                <div className="col">
                    <CitaForm citaSeleted={citaSelected} 
                    handlerAddCita={handlerAddCita} 
                    initialCitasForm={initialCitasForm}/>


                </div>
            </div>
        </div>
    )
}