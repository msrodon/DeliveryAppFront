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
            <router-link class="btn btn-outline-danger btn-lg px-5 me-3" :to="`/Cars`">Cancell</router-link>
            <button class="btn btn-outline-success btn-lg px-5" @click="editCar()">Save changes</button>
        </div>
    </white-card-50>
</template>

<script> 

export default {
    inject: ['notify'],
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

            const data = await this.$api.post('Cars/editCar', {
                id: this.id,
                brand: this.brand,
                model: this.model,
                year: this.year,
                engineCapacity: this.engineCapacity,
                horsePower: this.horsePower,
                seats: this.seats,
                maxLoad: this.maxLoad
            });

            if(data.success == true)
                this.$router.push({ path: '/Cars' })
        },
        async FetchCarData(){
            const data = await this.$api.get('Cars/getCar',{
                carId: this.$route.params.id
            });

            if(data.success){
                var fetchCar = data.car;

                this.id = fetchCar.id;
                this.brand = fetchCar.brand;
                this.model = fetchCar.model;
                this.year = fetchCar.year;
                this.engineCapacity = fetchCar.engineCapacity;
                this.horsePower = fetchCar.horsePower;
                this.seats = fetchCar.seats;
                this.maxLoad = fetchCar.maxLoad;
            }
        }
    }
}
</script>