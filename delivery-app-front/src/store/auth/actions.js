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
            const response = await fetch('https://localhost:7263/Auth/me', {
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