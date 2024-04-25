import { useEffect } from "react";
import { CitaForm } from "../components/CitaForm";
import { TurnosList } from "../components/TurnosList";


// const initialCitas = [
//     {
//       idCita: 1,
//       Medico: {
//         idMed:1,
//         nombre:'Ernesto Gomez',
//         especialidad:'Otorrino',
//       },
//       fechaCita: new Date(2024, 7, 14),
//       horaCita: '18:00',
//       estado: 'Pendiente',
//       recetaMedica:'paracetamol cada 12hs',
//       pacient: {
//         id: 1,
//         nombre: 'Ignacio Gomez Jais',
//         contrasena: '12345',
//         mail: 'nacgosh@gmail.com'
//       }
//     }
//   ];

export const CitasPage = ({ citas,
    citaSeleted,
    initialCitas,
    initialCitasForm,
    handlerSelectCita,
    handlerRemoveUser,
    handlerAddCita,getCitas,}) => {


    useEffect(() =>{
        getCitas();

    },[])



    return (
        <>
        
            <div className="container my-4">

              
                <div className="row">
                   





                    
                    <div className="col">
                        {citas.length === 0 ? <div className="alert alert-warning">No hay Citas Medicas

                        </div> : <TurnosList citas={citas}
                            handlerSelectCita={handlerSelectCita}

                            handlerRemoveUser={handlerRemoveUser}



                        />
                        }


                    </div>


                    </div>
                </div>






            


        </>


    );

}