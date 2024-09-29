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
                    <input class="form-control form-control-lg" placeholder="Brand"/>
                </div>
            </div>
        </div>
        
        <div class="row">
            <div class="d-flex flex-column w-100">
                <div class="text-start mx-1">
                    <p class="text-dark-50 m-0">Model</p>
                </div>
                <div class="form-outline form-dark mb-4">
                    <input class="form-control form-control-lg" placeholder="Model"/>
                </div>
            </div>
        </div>
        
        <div class="row">
            <div class="d-flex flex-column col-4">
                <div class="text-start mx-1">
                    <p class="text-dark-50 m-0">Year</p>
                </div>
                <div class="form-outline form-dark mb-4">
                    <input type="number" class="form-control form-control-lg" placeholder="Year"/>
                </div>
            </div>
            <div class="d-flex flex-column col-4">
                <div class="text-start mx-1">
                    <p class="text-dark-50 m-0">Engine capacity (cm³)</p>
                </div>
                <div class="form-outline form-dark mb-4">
                    <input type="number" class="form-control form-control-lg" placeholder="Capacity"/>
                </div>
            </div>
            <div class="d-flex flex-column col-4">
                <div class="text-start mx-1">
                    <p class="text-dark-50 m-0">Horsepower (KM)</p>
                </div>
                <div class="form-outline form-dark mb-4">
                    <input type="number" class="form-control form-control-lg" placeholder="Horse power"/>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="d-flex flex-column w-50">
                <div class="text-start mx-1">
                    <p class="text-dark-50 m-0">Seats</p>
                </div>
                <div class="form-outline form-dark mb-4">
                    <!-- <input type="number" class="form-control form-control-lg" placeholder="Seats"/> -->
                    <select class="form-select form-select-lg" placeholder="Choose option">
                        
                        <option disabled selected>Choose option</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                        <option value="4">Three</option>
                    </select>
                </div>
            </div>
            <div class="d-flex flex-column w-50">
                <div class="text-start mx-1">
                    <p class="text-dark-50 m-0">Max load (kg)</p>
                </div>
                <div class="form-outline form-dark mb-4">
                    <input type="number" class="form-control form-control-lg" placeholder="Max load"/>
                </div>
            </div>
        </div>

        <!-- <p class="small mb-3 pb-lg-2"><a class="text-dark-50" href="#!">Forgot password?</a></p> -->
        <div class="mt-4">
            <a href="/">
                <button class="btn btn-outline-danger btn-lg px-5" type="submit">Cancell</button>
            </a>
            <button class="btn btn-outline-success btn-lg px-5" type="submit" @click="AddCar">Add new car</button>
        </div>
    </white-card-50>
</template>

<script> 
import WhiteCard50 from '../LayoutComponents/WhiteCard50.vue';

export default {
  components: { WhiteCard50 },
    data() {
        return {
            email: '',
            password: '',
            error: null
        };
    },
    methods: {
        async AddCar() {
            console.log("AddedCar");
        },
        HomeRedirect() {
            router.push({ path: '/' })
        }
    }
}
</script>