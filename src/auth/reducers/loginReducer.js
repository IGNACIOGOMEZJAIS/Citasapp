export const loginReducer = (state={},action) =>{
switch (action.type) {
    case 'login':
        
        return{
            isAuth: true,
            isAdmin: action.payload.isAdmin,
            pacient: action.payload.user,
        };
        case'logout':
        return{
            isAuth:false,
            isAdmin:false,
            pacient:undefined,

        };

    default:
        return state;
}

}