import Swal from "sweetalert2";
import { LoginPage } from "./auth/pages/LoginPage";
import { loginReducer } from "./auth/reducers/loginReducer";
import { useReducer } from "react";
import { loginPacient } from "./auth/services/authService";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { CitasRoutes } from "./routes/CitasRoutes";


// const initialCitas = [
//     {
//       idCita: 1,
//       Medico: {
//         idMed:1,
//         nombre:'Ernesto Gomez',
//         especialidad:'Otorrino',
//       },
//       fechaCita: new Date(2024npp, 7, 14),
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
const initialLogin = JSON.parse(sessionStorage.getItem('login')) || {
    isAuth: false,
    pacient: undefined,
}

export const CitasApp = () => {
    
    const navigate = useNavigate();
    const [login, dispatch] = useReducer(loginReducer, initialLogin)
    const handlerlogin = ({ dni, password }) => {
        const isLogin = loginPacient({ dni, password });
        if (!dni || !password) {
            Swal.fire('Error de validacion', 'Dni y/o Contraseña requeridos', 'error');
        }
        if  (isLogin){

            const pacient = { dni: '43692062' , nombre:'Ignacio Gomez Jais' }
            dispatch({
                type: 'login',
                payload: pacient,
            })
            sessionStorage.setItem('login', JSON.stringify({
                isAuth: true,
                pacient: pacient,
            }));
            navigate('/citas');
        } else {

            Swal.fire('Error de validacion', 'Dni y/o Contraseña invalidos', 'error');
        }
    }


    const handlerLogout = () => {
        dispatch({
            type: 'logout',
        });
        sessionStorage.removeItem('login');
    }

    return (
        <Routes>
            {
            login.isAuth
                ? (
                    <Route path='/*' element={<CitasRoutes login={login} handlerLogout={handlerLogout}/>}/>
                    )
                :<>
                <Route path='/login' 
                element={<LoginPage
                handlerlogin={handlerlogin} />}/>
                <Route path='/*' element={<Navigate to="/login" />} />
                </> 
                
                
                
                }
                



        </Routes>


    );

}