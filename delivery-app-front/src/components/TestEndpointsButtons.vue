<template>
    <div>
        <button class="btn btn-success" @click="loadTest">Test GET CAR endpoint</button>
        <button class="btn btn-success" @click="loginTest">Test LOGIN endpoint</button>
    </div>
</template>

<script>

export default {
  methods: {
    loadTest(){
      fetch('https://localhost:7263/Cars/getCar', {
        method: "GET",
        headers: {
          'accept': ''
        }
      });
    }
  }
}

</script>

<style>

.btn {
  margin: 10px;
}

</style>