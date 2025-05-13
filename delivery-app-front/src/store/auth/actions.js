export default {
    Login(context, payload){
        context.commit("setAuth", {isAuth: true, userLogin: payload.userLogin, userRole: payload.userRole});
    },
    Logout(context){
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');

        context.commit("setAuth", {isAuth: false, userLogin: ''});
    },
    async TryLogin(context){
        const token = localStorage.getItem("token");

        if(token == null){
            return;
        }

        try {
            var url = process.env.VUE_APP_API_BASE_URL;
            const response = await fetch(url+'Auth/me', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include'
            });
        
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        
            const data = await response.json();
            context.dispatch("Login", { userLogin: data.email, userRole: data.userRole });
        } catch (err) {
            console.log('Fetch error:', err);
        }
    }
}