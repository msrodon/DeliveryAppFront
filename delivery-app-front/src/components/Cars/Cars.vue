<template>
  <white-card-80>
    <h2 class="fw-bold mb-2 text-uppercase">Twoje przesyłki</h2>
    <hr>
    <div>
      <b-container fluid>
        <b-row>
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
          responsive="sm"
          label-sort-asc=""
          label-sort-desc=""
          label-sort-clear=""
          ></b-table>
          
          <!-- <div>
            Sorting By: <b>{{ sortBy }}</b>, Sort Direction:
            <b>{{ sortDesc ? 'Descending' : 'Ascending' }}</b>
        </div> -->
      </b-container>
    </div>
  </white-card-80>
</template>

<script>
import WhiteCard80 from '../WhiteCard80.vue'
  export default {
  components: { WhiteCard80 },
    data() {
      return {
        sortBy: 'age',
        sortDesc: false,
        totalRows: 0,
        currentPage: 0,
        perPage: 5,
        pageOptions: [1, 5, 10, 25, 50,100],

        fields: [
          { key: 'last_name', sortable: true },
          { key: 'first_name', sortable: true },
          { key: 'age', sortable: true },
          { key: 'isActive', sortable: false }
        ],
        items: [
          { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' },
          { isActive: false, age: 89, first_name: 'Luija', last_name: 'Clark' },
          { isActive: true, age: 11, first_name: 'Yami', last_name: 'Carney' }
        ],
        
      }
    },
    mounted() {
      // Set the initial number of items
      this.totalRows = this.items.length
      this.currentPage = 1.
    }
  }
</script>
