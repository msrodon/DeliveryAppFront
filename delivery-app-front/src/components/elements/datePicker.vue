<template>
    <div class="container mt-4">
      <!-- <div class="card p-3"> -->
        <div class="d-flex justify-content-center align-items-center">
          <button class="btn btn-outline-primary me-3" @click="previousDay">
            &#9664;
          </button>
          <input 
            type="date" 
            class="form-control w-auto fs-5" 
            v-model="selectedDate" 
            @change="emitDate" 
            @keydown.left="previousDay" 
            @keydown.right="nextDay">
          <button class="btn btn-outline-primary ms-3" @click="nextDay">
            &#9654;
          </button>
        </div>
      <!-- </div> -->
    </div>
</template>
  
<script>
  export default {
    data() {
      return {
        selectedDate: new Date().toISOString().split('T')[0]
      };
    },
    created() {
      this.emitDate();
    },
    methods: {
      previousDay() {
        const date = new Date(this.selectedDate);
        date.setDate(date.getDate() - 1);
        this.selectedDate = date.toISOString().split('T')[0];
        this.emitDate();
      },
      nextDay() {
        const date = new Date(this.selectedDate);
        date.setDate(date.getDate() + 1);
        this.selectedDate = date.toISOString().split('T')[0];
        this.emitDate();
      },
      emitDate() {
        this.$emit('date-selected', this.selectedDate);
      }
    }
  };
</script>
  