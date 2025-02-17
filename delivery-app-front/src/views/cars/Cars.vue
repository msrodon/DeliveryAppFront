<template>
  <white-card-80>
    
  <base-dialog :show="!!showDialog" title="Delete car confirm" @close="showDialog = !showDialog">

  </base-dialog>

  <h2 class="fw-bold mb-2 text-uppercase">Registered cars</h2>
  <hr>
    <div class="mt-4">
      <table class="table" v-if="items.length > 0">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Car ID</th>
            <th scope="col">Brand</th>
            <th scope="col">Model</th>
            <th scope="col">Year</th>
            <th scope="col">Seats</th>
            <th scope="col">Engine capacity</th>
            <th scope="col">Horse power</th>
            <th scope="col">Max load</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(car, index) in items" :key="car.id">
            <th scope="row">{{ index + 1 }}</th>
            <th>{{ car.id }}</th>
            <td>{{ car.brand }}</td>
            <td>{{ car.model }}</td>
            <td>{{ car.year }}</td>
            <td>{{ car.seats }}</td>
            <td>{{ car.engineCapacity }}</td>
            <td>{{ car.horsePower }}</td>
            <td>{{ car.maxLoad }}</td>
            <td>
              <button size="sm" @click="editCar(car.id)" class="me-3 btn btn-primary">Edit</button>
              <button size="sm" @click="deleteCar(car.id)" class="btn btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table> 
      <div v-else>
        <h1>NO CARS FOUND</h1>
      </div> 

          <!-- <template #table-busy>
            <div class="text-center text-primary my-5">
              <b-spinner class="align-middle"></b-spinner>
              <strong> Loading...</strong>
            </div>
          </template>
           -->
          
    </div>
    <!-- <button class="btn btn-secondary" v-on:click="resetSort()">Reset sort</button> -->
    <button class="btn btn-outline-success px-5 mt-3" v-on:click="addNewCar()">Add new car</button>
  </white-card-80>
</template>

<script>
  export default {
    data() {
      return {
        items: []
      }
    },
    
    mounted() {
      this.getCarsData()
    },
    methods:{
      resetSort(){
      },
      async getCarsData(){
        this.busyState = true;

        const token = localStorage.getItem('token');
        const response = await fetch('https://localhost:7263/Cars/getCars', {
          method: "GET",
          headers: {
            'accept': '',
            'Authorization': `Bearer ${token}`
          }
        });

        const responseJson = await response.json();
        this.items = responseJson.cars
        this.busyState = false;
      },
      deleteCarDialog(){
        // this.showDialog = true;
      },
      async deleteCar(carId){
      
        const token = localStorage.getItem('token');
        try {
          const response = await fetch('https://localhost:7263/Cars/removeCar', {
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
                body: JSON.stringify({
                  carId: carId
            }),
              credentials: 'include' 
        });
        } catch (error) {

        }
        window.location.href = window.location.href;
      },
      editCar(carId){
        var route = "/Cars/EditCar/"+ carId;

        this.$router.push({ path: route });
      },
      addNewCar(){
        this.$router.push("/Cars/AddCar");
      }
    }
  }
</script>
