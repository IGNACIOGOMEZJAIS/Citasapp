import React, { useEffect, useState } from "react";
import useMinuteCountDown from "../../hooks/useMinuteCountDown";
import { Cronometro } from "../../hooks/Cronometro";
import { useCita } from "../../hooks/useCita";

export const StartCita = () => {
    const { minutes, seconds, resetCountDown } = useMinuteCountDown(1);
    const [countdownFinished, setCountdownFinished] = useState(false);
    const { elapsedTime, start, formatTime, reset, stop } = Cronometro();
    const [tardanza, setTardanza] = useState(0);
    const { citas, getCitas, citaSeleted, handlerSelectCita,handlerAddCita} = useCita();
    const [citasHora, setCitasHora] = useState();
    const [currentPatientIndex, setCurrentPatientIndex] = useState(0);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        getCitas();
    }, [getCitas]);

    useEffect(() => {
        if (minutes === "00" && seconds === "00" && !countdownFinished) {
            setCountdownFinished(true);
        }
    }, [minutes, seconds, countdownFinished]);

    useEffect(() => {
        console.log(`Tardanza: ${formatTime(tardanza)}`);
    }, [tardanza]);

    useEffect(() => {
        if (countdownFinished && !finished) {
            start();
        }
    }, [countdownFinished, start]);

    
    const handleSelectCita = (cita) => {
        handlerSelectCita(cita);
    };
    
    const onClickFinish = () => {
        setCountdownFinished(true);
        stop();
        setFinished(true);
        
        
    }
    const onSubmit = (event) => {
        event.preventDefault();
        setFinished(true);
        
        
        
        
    }
    const nextPatient = () => {
        if (currentPatientIndex < citas.length - 1) {
            setCurrentPatientIndex(currentPatientIndex + 1);
            reset();
            resetCountDown();
            setCountdownFinished(false);
            let tiempoTrans = elapsedTime;
            setTardanza(tiempoTrans);
                
            
            
        }
        
    };
    
    
    
    // const onInputChange = ({target}) => {
    //     const { name } = target;
        
        
    //     // Actualizar citasHora manteniendo los demás campos y sumando la tardanza al campo hora
    //     setCitasHora(citas => {
    //         // Clonar el objeto citasHora para no modificar el estado directamente
    //         const newCitasHora = {...citas};
            
    //         // Verificar si existe la cita en el estado actual
    //         if (newCitasHora[name]) {
    //             // Sumar la tardanza al campo de hora
    //             newCitasHora[name].hora += tardanza;
    //         }
            
    //         // Imprimir el valor actualizado de newCitasHora en la consola
    //         console.log("Valor actualizado de newCitasHora:", newCitasHora);
            
    //         // Devolver el nuevo estado
    //         return newCitasHora;
    //     });
    // };
    
    
    
    return (
        <>
            <div className="container d-flex justify-content-center align-items-center">
                <div className="container d-flex justify-content-center align-items-center">
                    {finished ? <h2>Buen trabajo!. Felicidades</h2> :
                        (!finished && (minutes === "00" && seconds === "00" ? <h2>Retraso</h2> : <h2>Turno en curso</h2>))
                    }
                </div>
            </div>

            <div className="container d-flex justify-content-center align-items-center">
                <div className={minutes === "00" && seconds === "00" ? "circular-retraso" : "circular-clock"}>
                    {!countdownFinished && <p>{minutes}:{seconds}</p>}
                    {countdownFinished && <h1>{formatTime(elapsedTime)}</h1>}
                </div>
            </div>

            {!finished && (
                <div className="container d-flex justify-content-center align-items-center">
                    {citas.length > 0 ? (
                        <h3>Paciente: {citas[currentPatientIndex].pacient}</h3>
                    ) : (
                        <p>No hay citas disponibles</p>
                    )}
                </div>
            )}

            
                {!finished && (
                    <div className="my-3 container d-flex justify-content-center align-items-center">
                        <button className="btn btn-primary btn-sm"  onClick={nextPatient} disabled={currentPatientIndex === citas.length - 1}>Siguiente Paciente</button>
                    </div>
                )}
         

            {!finished && (
                <div className="my-3 container d-flex justify-content-center align-items-center">
                    <button className="btn btn-primary btn-sm">Realizar Receta Electronica</button>
                </div>
            )}


            {finished && (
                <div className="my-3 container d-flex justify-content-center align-items-center">
                    <h3>Dia de consultas finalizado</h3>
                </div>
            )}

            {!finished && (
                <div className="my-3 container d-flex justify-content-center align-items-center">
                    <form onSubmit={onSubmit}>
                        <button className="btn btn-danger btn-sm" type="submit" onClick={onClickFinish}>Finalizar Dia de consultas</button>
                    </form>
                </div>
            )}
        </>
    );
};
