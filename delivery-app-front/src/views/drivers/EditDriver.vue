<template>
    <white-card-50>
        <p class="fw-bold mb-2 text-uppercase">Driver info</p>
        <h2 class="fw-bold mb-2 text-uppercase">{{ userName }} 
            <span 
                :class="{'green-circle': activeStatus, 'red-circle': !activeStatus}"
                class="status-circle"
            ></span>
        </h2>
        
        <p class="text-dark-50 mb-5">driver information</p>
        
        <hr>

        <div class="row">
            <div class="d-flex flex-column w-100">
                <div class="text-start mx-1">
                    <p class="text-dark-50 m-0">User name</p>
                </div>
                <div class="form-outline form-dark mb-4">
                    <input class="form-control form-control-lg" v-bind:placeholder="userName" disabled/>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="d-flex flex-column w-50">
                <div class="text-start mx-1">
                    <p class="text-dark-50 m-0">First name</p>
                </div>
                <div class="form-outline form-dark mb-4">
                    <input class="form-control form-control-lg" v-bind:placeholder="firstName" disabled/>
                </div>
            </div>
            <div class="d-flex flex-column w-50">
                <div class="text-start mx-1">
                    <p class="text-dark-50 m-0">Last name</p>
                </div>
                <div class="form-outline form-dark mb-4">
                    <input class="form-control form-control-lg" v-bind:placeholder="lastName" disabled/>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="d-flex flex-column w-50">
                <div class="text-start mx-1">
                    <p class="text-dark-50 m-0">Email</p>
                </div>
                <div class="form-outline form-dark mb-4">
                    <input class="form-control form-control-lg" v-bind:placeholder="email" disabled/>
                </div>
            </div>
            <div class="d-flex flex-column w-50">
                <div class="text-start mx-1">
                    <p class="text-dark-50 m-0">Phone number</p>
                </div>
                <div class="form-outline form-dark mb-4">
                    <input class="form-control form-control-lg" v-bind:placeholder="phoneNumber" disabled/>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="d-flex flex-column w-100">
                <div class="text-start mx-1">
                    <p class="text-dark-50 m-0">Assigned Car</p>
                </div>
                <div class="form-outline form-dark mb-4">
                    <select class="form-select form-select-lg" v-model="this.driver.assignedCarId">
                        <option value="0"></option>
                        <option v-for="car in cars" :value="car.id" :key="car.id">
                            {{ car.id }} # {{ car.brand }} {{ car.model }} - {{ car.year }}
                        </option>
                    </select>
                </div>
            </div>
        </div>

        <div class="mt-4">
            <button class="btn btn-outline-danger btn-lg px-5 me-3" @click="goToDrivers()">Cancell</button>
            <button class="btn btn-outline-success btn-lg px-5" @click="editDriver()">Save changes</button>
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
            assignedCarId: "",
            driver: {},            
            //
            cars: [],
            userTypes: [],
            token: ""
        };
    },
    async mounted(){
        this.token = localStorage.getItem('token');
        await this.getUserData();
        await this.getDriverData();
        await this.getUserTypes();
        await this.getCarsData();
    },
    methods: {
        async editDriver(){
            try {
                const response = await fetch('https://localhost:7263/Drivers/editDriver', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}`
                    },
                        body: JSON.stringify({
                            driverId: this.driver.id,
                            userId: this.id,
                            assignedCarId: this.driver.assignedCarId ?? 0
                    }),
                        credentials: 'include' 
                });
            } catch (error) {

            }
            
            this.$router.push({ path: '/Drivers' })
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
        },
        
        async getDriverData(){
            var url = 'https://localhost:7263/Drivers/getDriver?'
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
            this.driver = responseJson.driver;
        },
        async getUserTypes(){
            var url = 'https://localhost:7263/Dictionaries/getDictionariesByType?';
            const response = await fetch(url + new URLSearchParams({
                dictionaryTypeId: 1
            }), 
            {
                method: "GET",
                headers: {
                    'accept': '',
                    'Authorization': `Bearer ${this.token}`,
                    'DictionaryTypeId': 1
                }
            });

            const responseJson = await response.json();
            this.userTypes = responseJson.dictionaries
        },
        async getCarsData(){
        var url = 'https://localhost:7263/Cars/getCars?';
        const response = await fetch(url + new URLSearchParams({
                includeAssigned: false
            }), {
          method: "GET",
          headers: {
            'accept': '',
            'Authorization': `Bearer ${this.token}`
          }
        });

        const responseJson = await response.json();
        this.cars = responseJson.cars;
        if(this.driver.assignedCarId != null){

            url = 'https://localhost:7263/Cars/getCar?'
            const response2 = await fetch(url + new URLSearchParams({
                carId: this.driver.assignedCarId
            }),
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                }
            });
            const responseJson2 = await response2.json();
            var userCar = responseJson2.car;
            
            this.cars.push(userCar);
        }
      },
        goToDrivers(){
            this.$router.push('/Drivers');
        }
    }
}
</script>