<template>
    <white-card-50>
        <h2 class="fw-bold mb-2 text-uppercase">Register new delivery car</h2>
        <p class="text-dark-50 mb-5">pass car information</p>
        
        <hr>

        <div class="row">
            <div class="d-flex flex-column w-100">
                <div class="text-start mx-1">
                    <p class="text-dark-50 m-0">Brand</p>
                </div>
                <div class="form-outline form-dark mb-4">
                    <input class="form-control form-control-lg" placeholder="Brand" v-model="brand"/>
                </div>
            </div>
        </div>
        
        <div class="row">
            <div class="d-flex flex-column w-100">
                <div class="text-start mx-1">
                    <p class="text-dark-50 m-0">Model</p>
                </div>
                <div class="form-outline form-dark mb-4">
                    <input class="form-control form-control-lg" placeholder="Model" v-model="model"/>
                </div>
            </div>
        </div>
        
        <div class="row">
            <div class="d-flex flex-column col-4">
                <div class="text-start mx-1">
                    <p class="text-dark-50 m-0">Year</p>
                </div>
                <div class="form-outline form-dark mb-4">
                    <input type="number" class="form-control form-control-lg" placeholder="Year" v-model="year"/>
                </div>
            </div>
            <div class="d-flex flex-column col-4">
                <div class="text-start mx-1">
                    <p class="text-dark-50 m-0">Engine capacity (cm³)</p>
                </div>
                <div class="form-outline form-dark mb-4">
                    <input type="number" class="form-control form-control-lg" placeholder="Capacity" v-model="capacity"/>
                </div>
            </div>
            <div class="d-flex flex-column col-4">
                <div class="text-start mx-1">
                    <p class="text-dark-50 m-0">Horsepower (KM)</p>
                </div>
                <div class="form-outline form-dark mb-4">
                    <input type="number" class="form-control form-control-lg" placeholder="Horse power" v-model="horsePower"/>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="d-flex flex-column w-50">
                <div class="text-start mx-1">
                    <p class="text-dark-50 m-0">Seats</p>
                </div>
                <div class="form-outline form-dark mb-4">
                    <select class="form-select form-select-lg" placeholder="Choose option" v-model="seats">
                        <option disabled selected>Choose option</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                        <option value="4">Four</option>
                        <option value="5">Five</option>
                    </select>
                </div>
            </div>
            <div class="d-flex flex-column w-50">
                <div class="text-start mx-1">
                    <p class="text-dark-50 m-0">Max load (kg)</p>
                </div>
                <div class="form-outline form-dark mb-4">
                    <input type="number" class="form-control form-control-lg" placeholder="Max load" v-model="maxLoad"/>
                </div>
            </div>
        </div>

        <div class="mt-4">
            <router-link class="btn btn-outline-danger btn-lg px-5 me-3" :to="`/Cars`">Cancell</router-link>
            <button class="btn btn-outline-success btn-lg px-5" @click="addCar()">Add new car</button>
        </div>
    </white-card-50>
</template>

<script> 

export default {
    data() {
        return {
            brand: '',
            model: '',
            year: null,
            capacity: null,
            horsePower: null,
            seats: null,
            maxLoad: null
        };
    },
    methods: {
        async addCar() {

            const token = localStorage.getItem('token');
            try {
                const response = await fetch('https://localhost:7263/Cars/addCar', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                        body: JSON.stringify({
                            brand: this.brand,
                            model: this.model,
                            year: this.year,
                            engineCapacity: this.capacity,
                            horsePower: this.horsePower,
                            seats: this.seats,
                            maxLoad: this.maxLoad
                    }),
                        credentials: 'include' 
                });
                this.$router.push({ path: '/Cars' })
            } catch (error) {

            }
        }
    }
}
</script>