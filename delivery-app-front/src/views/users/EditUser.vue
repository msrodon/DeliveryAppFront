<template>
    <white-card-50>
        <p class="fw-bold mb-2 text-uppercase">Edit user</p>
        <h2 class="fw-bold mb-2 text-uppercase">{{ userName }} 
            <span 
                :class="{'green-circle': activeStatus, 'red-circle': !activeStatus}"
                class="status-circle"
            ></span>
        </h2>
        
        <p class="text-dark-50 mb-5">pass user information</p>
        
        <hr>

        <div class="row">
            <div class="d-flex flex-column w-100">
                <div class="text-start mx-1">
                    <p class="text-dark-50 m-0">User name</p>
                </div>
                <div class="form-outline form-dark mb-4">
                    <input class="form-control form-control-lg" placeholder="Username" v-model="userName"/>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="d-flex flex-column w-50">
                <div class="text-start mx-1">
                    <p class="text-dark-50 m-0">First name</p>
                </div>
                <div class="form-outline form-dark mb-4">
                    <input class="form-control form-control-lg" placeholder="FirstName" v-model="firstName"/>
                </div>
            </div>
            <div class="d-flex flex-column w-50">
                <div class="text-start mx-1">
                    <p class="text-dark-50 m-0">Last name</p>
                </div>
                <div class="form-outline form-dark mb-4">
                    <input class="form-control form-control-lg" placeholder="LastName" v-model="lastName"/>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="d-flex flex-column w-50">
                <div class="text-start mx-1">
                    <p class="text-dark-50 m-0">Email</p>
                </div>
                <div class="form-outline form-dark mb-4">
                    <input class="form-control form-control-lg" placeholder="Email" v-model="email"/>
                </div>
            </div>
            <div class="d-flex flex-column w-50">
                <div class="text-start mx-1">
                    <p class="text-dark-50 m-0">Phone number</p>
                </div>
                <div class="form-outline form-dark mb-4">
                    <input class="form-control form-control-lg" placeholder="PhoneNumber" v-model="phoneNumber"/>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="d-flex flex-column w-100">
                <div class="text-start mx-1">
                    <p class="text-dark-50 m-0">User type</p>
                </div>
                <div class="form-outline form-dark mb-4">
                    <select class="form-select form-select-lg" placeholder="Choose option" v-model="userType">
                        <option disabled selected>Choose option</option>
                        <option value="1">Client</option>
                        <!-- <option value="1">Admin</option>
                        <option value="2">Delivery man</option>
                        <option value="3">Delivery manager</option> -->
                    </select>
                </div>
            </div>
        </div>

        <div class="mt-4">
            <button class="btn btn-outline-danger btn-lg px-5 me-3" @click="goToUsers()">Cancell</button>
            <button class="btn btn-outline-success btn-lg px-5" @click="editUser()">Save changes</button>
        </div>
    </white-card-50>
</template>

<script> 

export default {
    data() {
        return {
            id: "",
            userName: "",
            activeStatus: "",
            firstName: "",
            lastName: "",
            email: "",  
            phoneNumber: "",
            userType: "",
            //
            token: ""
        };
    },
    mounted(){
        this.token = localStorage.getItem('token');
        this.getUserData();
    },
    methods: {
        async editUser() {
            try {
                const response = await fetch('https://localhost:7263/Users/editUser', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}`
                    },
                        body: JSON.stringify({
                            id: this.id,
                            userName: this.userName,
                            firstName: this.firstName,
                            lastName: this.lastName,
                            email: this.email,
                            phoneNumber: this.phoneNumber,
                            userType: this.userType
                    }),
                        credentials: 'include' 
                });
            } catch (error) {

            }
            
            this.$router.push({ path: '/Users' })
        },
        async getUserData(){
            var url = 'https://localhost:7263/Users/getUser?'
            const response = await fetch(url + new URLSearchParams({
                userId: this.$route.params.id
            }),
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                }
            });
            const responseJson = await response.json();
            var fetchUser = responseJson.user;

            this.id = fetchUser.id;
            this.userName = fetchUser.userName;
            this.activeStatus = fetchUser.activeStatus;
            this.firstName = fetchUser.firstName;
            this.lastName = fetchUser. lastName;
            this.email = fetchUser.email;
            this.phoneNumber = fetchUser.phoneNumber;
            this.userType = fetchUser.userType;
        },
        goToUsers(){
            this.$router.push('/Users');
        }
    }
}
</script>