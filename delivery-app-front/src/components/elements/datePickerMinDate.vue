<template>
  <div class="container mt-4">
    <!-- <div class="card p-3"> -->
      <div class="d-flex justify-content-center align-items-center">
        <button class="btn btn-outline-primary me-2" @click="previousDay" :disabled="isMinDate">
          &#9664;
        </button>
        <input 
          type="date" 
          class="form-control w-auto" 
          v-model="selectedDate" 
          :min="minDate"
          @change="emitDate" 
          @keydown.left="previousDay" 
          @keydown.right="nextDay">
        <button class="btn btn-outline-primary ms-2" @click="nextDay">
          &#9654;
        </button>
      </div>
    </div>
  <!-- </div> -->
</template>

<script>
export default {
  data() {
    return {
      selectedDate: this.getTomorrow(),
      minDate: this.getTomorrow()
    };
  },
  computed: {
    isMinDate() {
      return this.selectedDate <= this.minDate;
    }
  },
  created() {
    this.emitDate();
  },
  methods: {
    getTomorrow() {
      const date = new Date();
      date.setDate(date.getDate() + 1);
      return date.toISOString().split('T')[0];
    },
    previousDay() {
      if (!this.isMinDate) {
        const date = new Date(this.selectedDate);
        date.setDate(date.getDate() - 1);
        this.selectedDate = date.toISOString().split('T')[0];
        this.emitDate();
      }
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