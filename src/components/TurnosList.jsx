
import { TurnoRow } from "./TurnoRow";

export const TurnosList = ({ citas = [] ,handlerRemoveUser, handlerSelectCita}) => {
    return (
        <>
            <p className="fw-bold">Listado de turnos</p>
            <table className="table table-hover table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Medico</th>
                        <th>Especialidad</th>
                        <th>Dia de Cita</th>
                        <th>Hora de Cita</th>
                        <th>Estado de cita</th>
                        <th>Paciente</th>
                        <th>Cambio de turno</th>
                        <th>Cancelar turno</th>
                    </tr>
                </thead>
                <tbody>
                    {citas.map(({idCita,medico,especialidad,fecha,hora,estado,pacient}) => (
                        <TurnoRow key={idCita} 
                        handlerRemoveUser={handlerRemoveUser} 
                        idCita={idCita}
                        medico={medico}
                        especialidad={especialidad}
                        fecha={fecha}
                        hora={hora}
                        estado={estado}
                        pacient={pacient}
                        handlerSelectCita={handlerSelectCita}
                        citas={citas}
                        
                        
                        />
                        
                    ))}
                </tbody>
            </table>
        </>
    );
};
