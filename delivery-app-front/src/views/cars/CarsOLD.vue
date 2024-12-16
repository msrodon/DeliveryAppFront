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
          <tr v-for="car in items" :key="car.id">
            <th scope="row">{{ car.id }}</th>
            <td>{{ car.brand }}</td>
            <td>{{ car.model }}</td>
            <td>{{ car.year }}</td>
            <td>{{ car.seats }}</td>
            <td>{{ car.engineCapacity }}</td>
            <td>{{ car.horsePower }}</td>
            <td>{{ car.maxLoad }}</td>
            <td>
              <button size="sm" @click="editCar(car.id)" class="mr-1">
              Edit
            </button>
            <button size="sm" @click="deleteCar(car.id)" class="mr-1 btn-danger">
              Delete
            </button>
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
    <button class="btn btn-secondary" v-on:click="resetSort()">Reset sort</button>
  </white-card-80>
</template>

            <!-- <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1"> -->
            <!-- <b-button size="sm" @click="deleteCarDialog(row.item)" class="mr-1 btn-danger"> -->
             
          <!-- <div>
            Sorting By: <b>{{ sortBy }}</b>, Sort Direction:
            <b>{{ sortDesc ? 'Descending' : 'Ascending' }}</b>
        </div> -->
<script>
  export default {
    data() {
      return {
        // sortBy: null,
        // sortDesc: false,
        // totalRows: 0,
        // currentPage: 0,
        // perPage: 5,
        // pageOptions: [1, 5, 10, 25, 50,100],
        // busyState: false,
        // showDialog: false,
        // fields: [
        //   { key: 'id', sortable: true },
        //   { key: 'brand', sortable: true },
        //   { key: 'model', sortable: true },
        //   { key: 'year', sortable: true },
        //   { key: 'seats', sortable: true },
        //   { key: 'engineCapacity', sortable: true },
        //   { key: 'horsePower', sortable: true },
        //   { key: 'maxLoad', sortable: true },
        //   { key: 'buttons', label: "", sortable: false}
        // ],
        items: []
      }
    },
    
    mounted() {
      // Set the initial number of items
      // this.totalRows = this.items.length
      // this.currentPage = 1

      // this.busyState = true;
      this.getCarsData()
    },
    methods:{
      resetSort(){
        // this.sortBy = "id";
        // this.sortDesc = true;
        // this.perPage = 5;
        // this.currentPage = 1;
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
        console.log(responseJson.cars);
        this.busyState = false;
      },
      deleteCarDialog(){
        // this.showDialog = true;
      },
      async deleteCar(item){
      
        const token = localStorage.getItem('token');
        try {
          const response = await fetch('https://localhost:7263/Cars/removeCar', {
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
                body: JSON.stringify({
                  carId: item.id
            }),
              credentials: 'include' 
        });
        } catch (error) {

        }

        this.$router.push({ path: '/Cars' })
      },
      editCar(item){
        var route = "/Cars/EditCar/"+ item.id

        this.$router.push({ path: route })
      },
      addNewCar(){
        this.$router.push("/Cars/AddCar")
      }
    }
  }
</script>
