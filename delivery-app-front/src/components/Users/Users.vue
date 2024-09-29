<template>
  <white-card-80>
    <h2 class="fw-bold mb-2 text-uppercase">Registered users</h2>
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

          <template #cell(activeStatus)="row">
            <b-icon-circle-fill scale="1" :variant=setStatusColor(row.item.activeStatus) ></b-icon-circle-fill>
          </template>

          <template #cell(buttons)="row">
            <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">
              Edit
            </b-button>
          </template>
        </b-table>
          
          <!-- <div>
            Sorting By: <b>{{ sortBy }}</b>, Sort Direction:
            <b>{{ sortDesc ? 'Descending' : 'Ascending' }}</b>
        </div> -->
      </b-container>
    </div>
    <button class="btn btn-primary" v-on:click="changeBusyState()">Load data TEST</button>
    <button class="btn btn-secondary" v-on:click="resetSort()">Reset sort</button>
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
          { key: 'activeStatus', sortable: true },
          { key: 'firstName', sortable: true },
          { key: 'lastName', sortable: true },
          { key: 'userType', sortable: true },
        ],
        items: [
          { id: 1, activeStatus: true, firstName: 'Mario', lastName: 'Bros', userType: "Szef" },
          { id: 2, activeStatus: true, firstName: 'Luigi', lastName: 'Bros', userType: "Pomocnik" },
          { id: 3, activeStatus: true, firstName: 'Yoshi', lastName: 'Leonardi', userType: "Pomocnik" },
          { id: 4, activeStatus: false, firstName: 'Peach', lastName: 'Princessa', userType: "Baba" },
          { id: 5, activeStatus: false, firstName: 'Toad', lastName: 'Mushroomski', userType: "Grzyb" },
          { id: 6, activeStatus: true, firstName: 'Koopa', lastName: 'Troopa', userType: "Zolwww" }
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
      setStatusColor(status){
        return status ? "success" : "danger";
      }
    }
  }
</script>
