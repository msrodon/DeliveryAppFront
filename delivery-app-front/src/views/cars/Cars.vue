<template>
  <white-card-80>

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
              <router-link class="me-3 btn btn-primary" :to="`/Cars/EditCar/${car.carId}`">Edit</router-link>
              <button size="sm" @click="deleteCar(car.id)" class="btn btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table> 
      <div v-else>
        <h1>NO CARS FOUND</h1>
      </div> 
          
    </div>
    <router-link class="btn btn-outline-success px-5 mt-3" :to="`/Cars/AddCar`">Add new car</router-link>
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
      async getCarsData(){
        const data = await this.$api.get('Cars/getCars');

        if(data.success)
          this.items = data.cars
      },

      async deleteCar(carId){
        const data = await this.$api.delete('Cars/removeCar',{
          carId: carId
        });

        if(data.success)
          this.getCarsData()
      }
    }
  }
</script>
