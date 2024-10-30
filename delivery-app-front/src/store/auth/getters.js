export default {
    testList(state){
        return state.authList;
    },
    UserIsAuthenticated(state){
        return state.userIsLoggedIn;
    },
    UserLogin(state){
        return state.userLogin;
    }
}