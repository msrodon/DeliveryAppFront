<template>
    
    <white-card-20>
        <div>

            <button class="btn btn-outline-secondary position-absolute top-0 end-0 m-3 " @click="goBack()">X</button>
            <h2 class=" mt-5 text-uppercase">{{ this.user.email }}</h2>
        </div>
        <div class="password-reset-container">
            <h4>Set new password</h4>
            <form @submit.prevent="submitForm">
                <div>
                    <label for="password">New password:</label>
                    <input type="password" id="password" v-model="password" required />
                </div>
                <div>
                    <label for="confirmPassword">Repeat password:</label>
                    <input type="password" id="confirmPassword" v-model="confirmPassword" required />
                </div>
                <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
                <button type="submit" class="btn btn-success mt-3">Change password</button>
            </form>
        </div>
    </white-card-20>
</template>
  
<script>
export default {
    inject: ['notify'],
    data() {
        return {
            password: '',
            confirmPassword: '',
            errorMessage: '',
            user: []
        };
    },
    mounted(){
        this.getUser();
    },
    methods: {
        submitForm() {
            if (this.password.length < 8) {
                this.errorMessage = 'The password must be at least 8 characters long.';
                return;
            }
            if (this.password !== this.confirmPassword) {
                this.errorMessage = 'The passwords are not identical.';
                return;
            }
            this.errorMessage = '';
            this.changePassword();
        },
        async getUser(){
            const data = await this.$api.get('Users/getUser',{
                userId: this.$route.params.userId
            });

            if(data.success)
                this.user = data.user;
        },
        async changePassword(){
            const response = await this.$api.post('Auth/resetPassword', {
                userId: this.user.id,
                email: this.user.email,
                newPassword: this.confirmPassword
            });

            if (response.status === 200) {
                this.$router.go(-1);
            }
        },
        goBack(){
            this.$router.go(-1);
        }
    }
};
</script>
  
<style scoped>
    .password-reset-container {
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #f9f9f9;
    }
    input {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    }
    .error {
    color: red;
    font-size: 0.9em;
    }
</style>
  