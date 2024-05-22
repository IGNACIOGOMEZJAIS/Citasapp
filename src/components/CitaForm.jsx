import { useEffect, useState } from "react";
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { formatDate } from "../utils/formatDate";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";


export const CitaForm = ({ handlerAddCita, initialCitasForm, citaSeleted }) => {
    const [citaForm, setCitaForm] = useState(initialCitasForm);
    const { especialidad, medico, hora, fecha, idCita } = citaForm;
    const [date, setDate] = useState(new Date())
    

    useEffect(() => {
        setCitaForm({ ...citaSeleted, })

    }, [citaSeleted]);
    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setCitaForm({ ...citaForm, [name]: value });
        console.log(value); // Imprime el valor seleccionado
    };

    const onDateChange = (date) => {
        setDate(date)

        setCitaForm({ ...citaForm, fecha: date });


    };



    const onSubmit = (event) => {
        event.preventDefault();
        if(citaForm.especialidad=='especialidad' || medico=='Medico' || fecha==date || hora=='Hora'){
            Swal.fire({
                icon: "error",
                title: "Datos Vacios",
                text: "Debe completar los datos para solitar y/o modificar una cita!",
                footer: '<a href="#">Why do I have this issue?</a>'
              });
        }
        handlerAddCita(citaForm);
        setCitaForm(initialCitasForm);





    }

    let footer = <p>Por favor selecciona un dia.</p>;
    if (date) {

        footer = <p>Usted selecciono {(date).toLocaleDateString()}.</p>;

    }

    return (

        <>
            
            <form onSubmit={onSubmit}>
            <div className="my-4 w-75">
            {idCita > 0 ?  <p className="fs-5">Especialista: { especialidad}</p>  : 'Especialista'}
            </div>
            {idCita > 0 || 
                <select
                    className="form-select form-select-sm my-3 w-75"
                    aria-label="Especialidad"
                    name="especialidad"
                    value={especialidad}
                    onChange={onInputChange}
                >
                    <option disabled value="">Especialidad</option>
                    <option value="Otorrino">Otorrino</option>
                    <option value="Cirujano General">Cirujano General</option>
                    <option value="Cardiólogo">Cardiólogo</option>
                </select> }
                
                <div className="my-4 w-75">
                {idCita > 0 ?  <p className="fs-5">Medico: { medico}</p>  : 'Medico'}
                </div>
                {idCita > 0  ||  <select
                    className="form-select form-select-sm my-3 w-75"
                    aria-placeholder="Medico"
                    aria-label="Medico"
                    name="medico"
                    value={medico}
                    onChange={onInputChange}
                >

                    <option disabled value="">Medico</option> 
                    <option value="Ernesto Gomez">Ernesto Gomez</option>
                    <option value="Carlos Romero">Carlos Romero</option>
                    <option value="Alberto Contador">Alberto Contador</option>

                </select>}
                
                <div className="my-4 w-75">

                    <DayPicker
                        mode="single"
                        selected={date}
                        onSelect={onDateChange}
                        dateFormat="dd/MM/yyyy"
                        footer={footer}


                    />
                </div>


                <select
                    className="form-select form-select-sm my-3 w-75"
                    aria-label="Hora"
                    name="hora"
                    value={hora}
                    onChange={onInputChange}

                >
                    <option disabled value="">Hora</option>
                    <option value="18:00">18:00</option>
                    <option value="18:30">18:30</option>
                    <option value="19:00">19:00</option>
                    <option value="19:30">19:30</option>
                    <option value="20:00">20:00</option>
                    <option value="20:30">20:30</option>
                    <option value="21:00">21:00</option>
                </select>
                <input type="hidden"
                name="idCita"
                value={idCita} />
                

                <button className="btn btn-primary" type="submit">
                    {idCita > 0 ? 'Cambiar Turno' : 'Solicitar Turno'}


                </button>
            </form>
        </>
    );
};