import React, { useEffect, useReducer, useState } from "react";
import useMinuteCountDown from "../../hooks/useMinuteCountDown";
import { Cronometro } from "../../hooks/Cronometro";
import { findAll, finishCita, sumarTardanzasDeTurno, updateReceta } from "../../services/citaService";
import { citasReducer } from "../../reducers/citasReducer";

const initialCitas = [];
const initialCitasForm = {
    idCita: 0,
    especialidad: '',
    medico: '',
    fecha: new Date(),
    hora: '',
    estado: '',
    paciente: '',
    tardanza: '',
};

export const StartCita = () => {
    const { minutes, seconds, resetCountDown } = useMinuteCountDown(1);
    const [countdownFinished, setCountdownFinished] = useState(false);
    const { elapsedTime, start, formatTime, reset, stop } = Cronometro();
    const [tardanza, setTardanza] = useState(0);
    const [citas, dispatch] = useReducer(citasReducer, initialCitas);
    const [currentPatientIndex, setCurrentPatientIndex] = useState(0);
    const [finished, setFinished] = useState(false);
    const [visibleForm, setVisibleForm] = useState(false);
    const [recetaMedica, setRecetaMedica] = useState('');
    const [idCita, setIdCita] = useState(null); 


    const getCitas = async () => {
        const result = await findAll();
        dispatch({
            type: 'loadingCitas',
            payload: result.data,
        });
    }

    useEffect(() => {
        getCitas();
    }, []);

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

    

    const onClickFinish = async (idCita) => {
        setCountdownFinished(true);
        stop();
        setFinished(true);
        let response = await finishCita(idCita);
        dispatch({
            type: 'updateCita',
            payload: response.data,
        });
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setFinished(true);
    }

    const handlerOpenForm = (idCita) => {
        setVisibleForm(true);
        setIdCita(idCita);
    }
    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setRecetaMedica(value);
    };

    const handlerCloseForm = () => {
        setVisibleForm(false);
    }

    const onSubmitReceta = async (idCita) => {
        let response = await updateReceta(idCita, recetaMedica);
        if (response) {
            setVisibleForm(false);
            setRecetaMedica('');
            setIdCita(null);
            
        }
    };

    const nextPatient = async (idCita) => {
        if (currentPatientIndex < citas.length - 1) {
            setCurrentPatientIndex(currentPatientIndex + 1);
            reset();
            resetCountDown();
            setCountdownFinished(false);

            let tiempoTrans = Math.floor(elapsedTime / 60);
            console.log(tiempoTrans);

            let response;
            if (tiempoTrans > 0) {
                setTardanza(tiempoTrans);

                response = await sumarTardanzasDeTurno(idCita, tiempoTrans);
                dispatch({
                    type: 'updateHora',
                    payload: response.data,
                });
            } else {
                setTardanza(0);
                response = await finishCita(idCita);
                dispatch({
                    type: 'updateHora',
                    payload: response.data,
                });
            }
        }
    };

    return (
        <>
            {visibleForm && (
                <div className="abrir-modal animacion fadeIn">
                    <div className="modal" style={{ display: "block" }} tabIndex="-1">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Receta electrónica</h5>
                                </div>
                                <div className="modal-body">
                                
                                        <div className="form-floating my-3 w-75">
                                            <textarea
                                                className="form-control"
                                                placeholder="Instrucciones"
                                                id="floatingTextarea2"
                                                name="RecetaMedica"
                                                value={recetaMedica}
                                                onChange={onInputChange}
                                            ></textarea>
                                            <label htmlFor="floatingTextarea2">Instrucciones</label>
                                        </div>
                                        <div className="my-5 container d-flex justify-content-center align-items-center">
                                            <button className="btn btn-primary btn-sm" onClick={() => onSubmitReceta(citas[currentPatientIndex].idCita)}>Realizar Receta Electrónica</button>
                                        </div>
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="container d-flex justify-content-center align-items-center mt-5">
                <div className="container d-flex justify-content-center align-items-center">
                    {finished ? <h2>Buen trabajo!. Felicidades</h2> :
                        (!finished && (minutes === "00" && seconds === "00" ? <h2>Retraso</h2> : <h2>Turno en curso</h2>))
                    }
                </div>
            </div>
            <div className="container d-flex justify-content-center align-items-center ">
                <div className={minutes === "00" && seconds === "00" ? "circular-retraso" : "circular-clock"}>
                    {!countdownFinished && <p>{minutes}:{seconds}</p>}
                    {countdownFinished && <h1>{formatTime(elapsedTime)}</h1>}
                </div>
            </div>
            {!finished && (
                <div className="container d-flex justify-content-center align-items-center">
                    {citas.length > 0 ? (
                        <><h3>Paciente: {citas[currentPatientIndex].pacient}</h3></>
                    ) : (
                        <p>No hay citas disponibles</p>
                    )}
                </div>
            )}
            {!finished && (
                <div className="my-3 container d-flex justify-content-center align-items-center">
                    <button className="btn btn-primary btn-sm" onClick={() => nextPatient(citas[currentPatientIndex].idCita)} disabled={currentPatientIndex === citas.length - 1}>Siguiente Paciente</button>
                </div>
            )}
            {!finished && (
                <div className="my-3 container d-flex justify-content-center align-items-center">
                    <button className="btn btn-primary btn-sm" onClick={() => handlerOpenForm(citas[currentPatientIndex].idCita)} disabled={currentPatientIndex === citas.length}>Realizar Receta Electrónica</button>
                </div>
            )}
            {finished && (
                <div className="my-3 container d-flex justify-content-center align-items-center" disabled={currentPatientIndex === citas.length}>
                    <h3>Dia de consultas finalizado</h3>
                </div>
            )}
            {!finished && (
                <div className="my-3 container d-flex justify-content-center align-items-center">
                    <form onSubmit={onSubmit}>
                        <button className="btn btn-danger btn-sm" type="submit" onClick={() => onClickFinish(citas[currentPatientIndex].idCita)}>Finalizar Dia de consultas</button>
                    </form>
                </div>
            )}
        </>
    );
};
