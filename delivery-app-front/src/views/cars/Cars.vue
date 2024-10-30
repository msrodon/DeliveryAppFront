<template>
  <white-card-80>
    
  <base-dialog :show="!!showDialog" title="Delete car confirm" @close="showDialog = !showDialog">


  </base-dialog>
    <h2 class="fw-bold mb-2 text-uppercase">Registered cars</h2>
    <hr>
    <div class="mt-4">
      <b-container fluid>
        <b-row class="mb-3">
          <!-- PER PAGE -->
          <b-col sm="5" md="4" class="my-1">
            <b-form-group
            label="Per page"
            label-for="per-page-select"
            label-cols-sm="6"
            label-cols-md="4"
            label-cols-lg="3"
            label-align-sm="right"
            label-size="sm"
            class="mb-0"
            >
            <b-form-select
            id="per-page-select"
            v-model="perPage"
            :options="pageOptions"
            size="sm"
            ></b-form-select>
          </b-form-group>
        </b-col>
      
          <b-col sm="7" md="8" class="my-1 d-flex justify-content-end">
            <button class="btn btn-lg btn-outline-success m-0" @click="addNewCar">Add new car</button>
          </b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col sm="12" class="my-1">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="fill"
            size="sm"
            class="my-0"
            ></b-pagination>
          </b-col>
        </b-row>
          
          <b-table
          :items="items"
          :fields="fields"
          :sort-by="sortBy"
          :sort-desc="sortDesc"
          :current-page="currentPage"
          :per-page="perPage"
          :hover= true
          :busy="busyState"
          responsive="sm"
          label-sort-asc=""
          label-sort-desc=""
          label-sort-clear=""
          >
        
          <template #table-busy>
            <div class="text-center text-primary my-5">
              <b-spinner class="align-middle"></b-spinner>
              <strong> Loading...</strong>
            </div>
          </template>

          <template #cell(buttons)="row">
            <!-- <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1"> -->
            <b-button size="sm" @click="editCar(row.item)" class="mr-1">
              Edit
            </b-button>
            <!-- <b-button size="sm" @click="deleteCarDialog(row.item)" class="mr-1 btn-danger"> -->
            <b-button size="sm" @click="deleteCar(row.item)" class="mr-1 btn-danger">
              Delete
            </b-button>
          </template>
        </b-table>
          
          <!-- <div>
            Sorting By: <b>{{ sortBy }}</b>, Sort Direction:
            <b>{{ sortDesc ? 'Descending' : 'Ascending' }}</b>
        </div> -->
      </b-container>
    </div>
    <button class="btn btn-secondary" v-on:click="resetSort()">Reset sort</button>
  </white-card-80>
</template>

<script>
  export default {
    data() {
      return {
        sortBy: null,
        sortDesc: false,
        totalRows: 0,
        currentPage: 0,
        perPage: 5,
        pageOptions: [1, 5, 10, 25, 50,100],
        busyState: false,
        showDialog: false,
        fields: [
          { key: 'id', sortable: true },
          { key: 'brand', sortable: true },
          { key: 'model', sortable: true },
          { key: 'year', sortable: true },
          { key: 'seats', sortable: true },
          { key: 'engineCapacity', sortable: true },
          { key: 'horsePower', sortable: true },
          { key: 'maxLoad', sortable: true },
          { key: 'buttons', label: "", sortable: false}
        ],
        items: []
      }
    },
    
    mounted() {
      // Set the initial number of items
      this.totalRows = this.items.length
      this.currentPage = 1

      this.busyState = true;
      this.getCarsData()
    },
    methods:{
      resetSort(){
        this.sortBy = "id";
        this.sortDesc = true;
        this.perPage = 5;
        this.currentPage = 1;
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
        this.showDialog = true;
      },
      async deleteCar(item){
      
        try {
          const response = await fetch('https://localhost:7263/Cars/removeCar', {
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json',
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
