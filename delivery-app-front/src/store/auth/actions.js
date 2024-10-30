export default {
    Login(context, payload){
        context.commit("setAuth", {isAuth: true, userLogin: payload.userLogin});
    },
    Logout(context){
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');

        context.commit("setAuth", {isAuth: false, userLogin: ''});
    },
    async TryLogin(context){
        const token = localStorage.getItem("token");
        const refreshToken = localStorage.getItem("refreshToken");

        if(token == null || refreshToken == null){
            return;
        }

        try{

            const response = await fetch('https://localhost:7263/Auth/me', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include' 
            })
            .then(data => { return data.json() });
            
            context.dispatch("Login", {userLogin: response.email})
        }catch(err){
            console.log(err);
        }
    }
}