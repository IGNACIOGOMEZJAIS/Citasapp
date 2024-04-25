import { NavLink } from "react-router-dom";
import { formatDate } from "../utils/formatDate";


export const TurnoRow = ({handlerRemoveUser,idCita,medico,especialidad,fecha,hora,estado,pacient,handlerSelectCita }) => {

    


    return (

        <tr>
            <td>{idCita}</td>
            <td>{medico}</td>
            <td>{especialidad}</td>
            <td>{formatDate(fecha)}</td>
            <td>{hora}</td>
            <td>{estado}</td>
            <td>{pacient}</td>
            <td>
                <NavLink className={'btn btn-secondary btn-sm'}
                
                to={'/citas/edit/'+ idCita }>

                    Cambio de turno
                </NavLink>
               
            </td>
            <td>
                <button type="button" className="btn btn-danger btn-sm"
                onClick={() =>  handlerRemoveUser(idCita)}>
                    Cancelar turno
                </button>
              
            </td>
            

        </tr>



    )


}
