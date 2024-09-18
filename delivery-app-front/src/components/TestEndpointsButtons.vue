<template>
    <div>
        <button @click="loadTest">Test GET CAR endpoint</button>
    </div>
</template>

<script>

export default {
  components: {
    NavBar
  },
  methods: {
    loadTest(){
      fetch('https://localhost:7263/cars/Cars/getCar', {
        method: "GET",
        headers: {
          // 'Content-Type': 'application/json',
          'accept': ''
        }
      });
    }
  }
}

</script>