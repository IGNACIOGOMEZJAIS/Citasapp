export const loginReducer = (state={},action) =>{
switch (action.type) {
    case 'login':
        
        return{
            isAuth: true,
            pacient: action.payload,
        };
        case'logout':
        return{
            isAuth:false,
        };

    default:
        return state;
}

}