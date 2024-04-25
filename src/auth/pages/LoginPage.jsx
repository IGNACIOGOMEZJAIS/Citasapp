import { useState } from "react";
const initialLoginForm={
    dni:'',
    password:'',
}

export const LoginPage = ({handlerlogin}) => {

    const[loginForm,setLoginForm] = useState(initialLoginForm);
    const{dni,password} = loginForm;
 

    const onInputChange = ({target}) =>{
        const{name,value} = target;
        setLoginForm({

            ...loginForm,
            [ name ]: value,
        })
    }
    const onSubmit = (event) =>{

        event.preventDefault();
        handlerlogin({dni,password});
      
        setLoginForm((initialLoginForm));
    }
    return (
        <div className="modal" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header text-center">
                        <h5>Login</h5>
                    </div>
                    <form onSubmit={onSubmit}>
                        <div className="modal-body">
                            <div className="d-flex justify-content-center ">
                                <img src='../imagen/images (2).png' className="img-fluid" alt="..." />
                            </div>
                            <div className=" justify-content-center">
                                <div>
                                    <input className="form-control my-5 w-75" placeholder="Dni" name="dni" 
                                    value={dni}
                                    onChange={onInputChange}/>
                                    <input className="form-control my-5 w-75" type="password" placeholder="Contraseña" name="password" 
                                    value={password}
                                    onChange={onInputChange}/>
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary"
                                type="submit">Ingreso</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>


    );
}