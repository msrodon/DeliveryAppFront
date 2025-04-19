export default {
    UserIsAuthenticated(state){
        return state.userIsLoggedIn;
    },
    UserLogin(state){
        return state.userLogin;
    },
    UserRole(state){
        return state.userRole;
    }
}