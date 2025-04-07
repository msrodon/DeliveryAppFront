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
            <router-link class="btn btn-outline-danger btn-lg px-5 me-3" :to="`/Drivers`">Cancell</router-link>
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
        };
    },
    async mounted(){
        await this.getUserData();
        await this.getDriverData();
        await this.getUserTypes();
        await this.getCarsData();
    },
    methods: {
        async editDriver(){ 
            const data = await this.$api.post('Drivers/editDriver', {
                driverId: this.driver.id,
                userId: this.id,
                assignedCarId: this.driver.assignedCarId ?? 0
            });

            if(data.success == true)
                this.$router.push({ path: '/Drivers' })
        },
        async getUserData(){
            const data = await this.$api.get('Users/getUser',{
                userId: this.$route.params.id
            });

            if(data.success){
                var fetchUser = data.user;
                this.id = fetchUser.id;
                this.userName = fetchUser.userName;
                this.activeStatus = fetchUser.activeStatus;
                this.firstName = fetchUser.firstName;
                this.lastName = fetchUser. lastName;
                this.email = fetchUser.email;
                this.phoneNumber = fetchUser.phoneNumber;
            }
        },
        
        async getDriverData(){
            const data = await this.$api.get('Drivers/getDriver',{
                userId: this.$route.params.id
            });

            if(data.success)
                this.driver = data.driver;
        },
        async getUserTypes(){
            const data = await this.$api.get('Dictionaries/getDictionariesByType',{
                dictionaryTypeId: 1
            });

            if(data.success)
                this.userTypes = data.dictionaries || []
        },
        async getCarsData(){
            const data = await this.$api.get('Cars/getCars',{
                includeAssigned: false
            });

            if(data.success){
                this.cars = data.cars;
            }

            if(this.driver.assignedCarId != null){

                const data2 = await this.$api.get('Cars/getCar',{
                    carId: this.driver.assignedCarId
                });
                
                if(data2.success){
                    var userCar = data2.car;
                    this.cars.push(userCar);
                }
            }
        }
    }
}
</script>