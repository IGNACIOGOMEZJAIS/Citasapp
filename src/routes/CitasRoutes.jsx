import { Navigate, Route, Routes } from "react-router-dom"
import { CitasPage } from "../pages/CitasPage"
import { Navbar } from "../components/layout/Navbar"
import { RegisterCita } from "../auth/pages/RegisterCita"
import { useCita } from "../hooks/useCita"
import { StartCita } from "../auth/pages/StartCita"

export const CitasRoutes = ({ login, handlerLogout }) => {
    const { citas,
        citaSeleted,
        initialCitas,
        initialCitasForm,
        handlerSelectCita,
        handlerRemoveUser,
        handlerAddCita,getCitas } = useCita();

    return (

        <>
            <Navbar login={login}
                handlerLogout={handlerLogout} />


            <Routes>
                <Route path="citas" element={<CitasPage 
                citas={citas} 
                citaSeleted={citaSeleted}
                initialCitasForm={initialCitasForm}
                handlerAddCita={handlerAddCita}
                handlerRemoveUser={handlerRemoveUser}
                handlerSelectCita={handlerSelectCita}
                getCitas={getCitas}
                />} />
                <Route path="citas/register" element={<RegisterCita 
                handlerAddCita={handlerAddCita}
                initialCitasForm={initialCitasForm} />} />
                <Route path="citas/edit/:idcita" element={<RegisterCita 
                citas={citas}
                handlerAddCita={handlerAddCita}
                initialCitasForm={initialCitasForm} />} />
                <Route path="citas/citacurso" element={<StartCita/>} />
                <Route path="citas/citacurso" element={<StartCita/> } />
                <Route path="/" element={<Navigate to="/citas" />} />
            </Routes>
        </>
    )
}