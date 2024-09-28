<template>
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-10 col-lg-10 col-xl-8">
          <div class="card bg-white text-dark" style="border-radius: 1rem;">
            <div class="card-body p-5 text-center">
  
              <div class="mt-md-4 pb-5">
  
                <h2 class="fw-bold mb-2 text-uppercase">Add new delivery car</h2>
                <p class="text-dark-50 mb-5">pass car information</p>
                
                <hr>

                <div class="row">
                    <div class="d-flex flex-column w-50">
                        <div class="text-start mx-1">
                            <p class="text-dark-50 m-0">Brand</p>
                        </div>
                        <div class="form-outline form-dark mb-4">
                            <input class="form-control form-control-lg" placeholder="Brand"/>
                        </div>
                    </div>
                    <div class="d-flex flex-column w-50">
                        <div class="text-start mx-1">
                            <p class="text-dark-50 m-0">Model</p>
                        </div>
                        <div class="form-outline form-dark mb-4">
                            <input class="form-control form-control-lg" placeholder="Model"/>
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="d-flex flex-column w-50">
                        <div class="text-start mx-1">
                            <p class="text-dark-50 m-0">Year</p>
                        </div>
                        <div class="form-outline form-dark mb-4">
                            <input type="number" class="form-control form-control-lg" placeholder="Year"/>
                        </div>
                    </div>
                    <div class="d-flex flex-column w-50">
                        <div class="text-start mx-1">
                            <p class="text-dark-50 m-0">Engine capacity (cm³)</p>
                        </div>
                        <div class="form-outline form-dark mb-4">
                            <input type="number" class="form-control form-control-lg" placeholder="Capacity"/>
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
  
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script> 

export default {
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