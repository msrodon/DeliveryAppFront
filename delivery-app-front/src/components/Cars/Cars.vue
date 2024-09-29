<template>
  <white-card-80>
    <h2 class="fw-bold mb-2 text-uppercase">Lista samochodów</h2>
    <hr>
    <div class="mt-4">
      <b-container fluid>
        <b-row class="mb-3">
          <!-- PER PAGE -->
          <b-col sm="5" md="6" class="my-1">
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
      
        <b-col sm="7" md="6" class="my-1">
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
            <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">
              Edytuj
            </b-button>
          </template>
        </b-table>
          
          <!-- <div>
            Sorting By: <b>{{ sortBy }}</b>, Sort Direction:
            <b>{{ sortDesc ? 'Descending' : 'Ascending' }}</b>
        </div> -->
      </b-container>
    </div>
    <button class="btn btn-primary" v-on:click="changeBusyState()">Załaduj TEST</button>
    <button class="btn btn-secondary" v-on:click="resetSort()">Reset</button>
  </white-card-80>
</template>

<script>
import WhiteCard80 from '../LayoutComponents/WhiteCard80.vue'
  export default {
  components: { WhiteCard80 },
    data() {
      return {
        sortBy: null,
        sortDesc: false,
        totalRows: 0,
        currentPage: 0,
        perPage: 5,
        pageOptions: [1, 5, 10, 25, 50,100],
        busyState: false,
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
        items: [
          { id: 1, brand: 'Ford', model: 'Transit', year: 2001, seats: 1, engineCapacity: 2300, horsePower: 150, maxLoad: 2000 },
          { id: 2, brand: 'Dacia', model: 'Logan', year: 2020, seats: 3, engineCapacity: 1400, horsePower: 220, maxLoad: 1500 },
          { id: 3, brand: 'Ford', model: 'Focus ST', year: 2015, seats: 4, engineCapacity: 2000, horsePower: 125, maxLoad: 2400 },
          { id: 4, brand: 'Fiat', model: 'Ducato', year: 2023, seats: 2, engineCapacity: 3000, horsePower: 160, maxLoad: 2400 },
          { id: 5, brand: 'Inveco', model: 'Dayli', year: 2014, seats: 3, engineCapacity: 3600, horsePower: 306, maxLoad: 2500 },
          { id: 6, brand: 'Mercedes-Benz', model: 'Sprinter', year: 2020, seats: 1, engineCapacity: 1500, horsePower: 255, maxLoad: 2600 }
        ],
        
      }
    },
    mounted() {
      // Set the initial number of items
      this.totalRows = this.items.length
      this.currentPage = 1.
    },
    methods:{
      changeBusyState(){
        this.busyState = !this.busyState;
      },
      resetSort(){
        this.sortBy = "id";
        this.sortDesc = true;
        this.perPage = 5;
        this.currentPage = 1;
      },
      info(item, index, button) {
        console.log(item);
        console.log(item.id);
      },
    }
  }
</script>
