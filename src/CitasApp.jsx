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
    isAdmin: false,
    pacient: undefined,
}

export const CitasApp = () => {
    
    const navigate = useNavigate();
    const [login, dispatch] = useReducer(loginReducer, initialLogin)
    const handlerlogin = async({ dni, password }) => {
        if (!dni || !password) {
            Swal.fire('Error de validacion', 'Dni y/o Contraseña requeridos', 'error');
        }
        try {
            const response = await loginPacient({ dni, password });
            const token = response.data.token;
            const claims = JSON.parse(window.atob(token.split(".")[1]));
            console.log(claims);

            const pacient = { dni: response.data.dni , nombre: response.data.nombreApe }
            dispatch({
                type: 'login',
                payload: {dni, isAdmin: claims.isAdmin},
            })
            sessionStorage.setItem('login', JSON.stringify({
                isAuth: true,
                isAdmin: claims.isAdmin,
                pacient: pacient,
            }));
            sessionStorage.setItem('token', `Bearer ${token}`);
            navigate('/citas');
        } catch(error) {

            if(error.response?.status==401){
                Swal.fire('Error de validacion', 'Dni y/o Contraseña invalidos', 'error');

            }else if(error.response?.status==403){
                Swal.fire('Error de validacion', 'No tiene acceso al recurso o permiso', 'error');


            }else{
                throw error;
            }
        }
    }


    const handlerLogout = () => {
        dispatch({
            type: 'logout',
        });
        sessionStorage.removeItem('login');
        sessionStorage.removeItem('token');
        sessionStorage.clear();
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