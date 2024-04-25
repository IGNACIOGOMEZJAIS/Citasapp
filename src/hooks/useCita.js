import { useReducer, useState } from "react";
import { citasReducer } from "../reducers/citasReducer";
import Swal from "sweetalert2";
import { findAll, remove, save, update } from "../services/citaService";
import { useNavigate } from "react-router-dom";


const initialCitas = [
];
const initialCitasForm = {
    idCita: 0,
    especialidad: '',
    medico: '',
    fecha: new Date(),
    hora: '',
    estado: '',
    paciente: '',

};

export const useCita = () => {
    const [citas, dispatch] = useReducer(citasReducer, initialCitas);
    const [citaSeleted, SetCitaSeleted] = useState(initialCitasForm);
    const navigate = useNavigate();
    const getCitas = async () =>{
        const result =  await findAll();
        
        dispatch(
            {
                type:'loadingCitas',
                payload:result.data,
            }
        )
    }

    const handlerSelectCita = (cita) => {

        SetCitaSeleted({ ...cita },);




    }

    const handlerAddCita =  async(cita) => {
        let response;
        if (cita.idCita === 0) {
            response = await save(cita);
        } else {
            response = await update(cita);
            
        }
        dispatch({
            type:(cita.idCita === 0) ? 'addCita' : 'updateCita',
            payload: response.data,
        })
        Swal.fire(
            (cita.idCita === 0) ? "Cita Solicitada" : "Cita Modificada",
            (cita.idCita === 0) ? "La cita ha sido Solicitada con exito" : "Cita fue modificada con exito",
            "success"
        );
        navigate('/citas')
        
    };
    const handlerRemoveUser = (idCita) => {
       
        

        Swal.fire({
            title: "Desea Cancelar el Turno?",
            text: "Posiblemente no pueda solicitar el mismo turno!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Cancelar"
          }).then((result) => {
            if (result.isConfirmed) {
                remove(idCita);
                dispatch({
                    type: 'removeCita',
                    payload: idCita,
                })
              Swal.fire({
                title: "Turno Cancelado",
                text: "El Turno se cancelo con exito",
                icon: "success"
              });
            }
          });
    }


    return {
        citas,
        citaSeleted,
        initialCitas,
        initialCitasForm,
        handlerSelectCita,
        handlerRemoveUser,
        handlerAddCita,
        getCitas,
        



    }
}