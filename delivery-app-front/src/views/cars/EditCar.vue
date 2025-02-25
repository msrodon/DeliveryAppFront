<template>
    <white-card-50>
        <h2 class="fw-bold mb-2 text-uppercase">Edit delivery car</h2>
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
                    <input type="number" class="form-control form-control-lg" placeholder="Capacity" v-model="engineCapacity"/>
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
            <button class="btn btn-outline-danger btn-lg px-5 me-3" @click="goToCars()">Cancell</button>
            <button class="btn btn-outline-success btn-lg px-5" @click="editCar()">Save changes</button>
        </div>
    </white-card-50>
</template>

<script> 

export default {
    data() {
        return {
            id: null,
            brand: '',
            model: '',
            year: null,
            engineCapacity: null,
            horsePower: null,
            seats: null,
            maxLoad: null
        };
    },
    mounted(){
        this.FetchCarData();
    },
    methods: {
        async editCar() {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('https://localhost:7263/Cars/editCar', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                        body: JSON.stringify({
                            id: this.id,
                            brand: this.brand,
                            model: this.model,
                            year: this.year,
                            engineCapacity: this.engineCapacity,
                            horsePower: this.horsePower,
                            seats: this.seats,
                            maxLoad: this.maxLoad
                    }),
                        credentials: 'include' 
                });
            } catch (error) {

            }
            
            this.$router.push({ path: '/Cars' })
        },
        async FetchCarData(){
            var url = 'https://localhost:7263/Cars/getCar?'
            const token = localStorage.getItem('token');

            const response = await fetch(url + new URLSearchParams({
                carId: this.$route.params.id
            }),
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const responseJson = await response.json();
            var fetchCar = responseJson.car;

            this.id = fetchCar.id;
            this.brand = fetchCar.brand;
            this.model = fetchCar.model;
            this.year = fetchCar.year;
            this.engineCapacity = fetchCar.engineCapacity;
            this.horsePower = fetchCar.horsePower;
            this.seats = fetchCar.seats;
            this.maxLoad = fetchCar.maxLoad;
        },
        goToCars(){
            this.$router.push('/Cars');
        }
    }
}
</script>