export const citasReducer = (state = [], action) => {

    switch (action.type) {
        case 'addCita':

            return [
                ...state,
                {
                    ...action.payload,

                }
            ];
        case 'removeCita':
            return state.filter(cita => cita.idCita !== action.payload);

        case 'updateCita':
            return state.map(c => {
                if (c.idCita === action.payload.idCita) {
                    return {
                        ...action.payload,


                    };
                }
                return c;
            })
        case 'loadingCitas':
            return action.payload;



            case'updateHora':
            return state.map(c => {
                if (c.idCita === action.payload.idCita) {
                    return {
                        ...action.payload,


                    };
                }
                return c;
            })


        default:
            return state;
    }
}