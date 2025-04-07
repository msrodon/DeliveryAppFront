<template>
  <white-card-80>
    
    <base-dialog :show="!!showDialog" title="Delete car confirm" @close="showDialog = !showDialog">
  
    </base-dialog>
  
    <h2 class="fw-bold mb-2 text-uppercase">Registered drivers</h2>
    <hr>
    <div class="mt-4">
      <table class="table" v-if="users.length > 0">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Active status</th>
            <th scope="col">Login</th>
            <th scope="col">FirstName</th>
            <th scope="col">LastName</th>
            <th scope="col">Email</th>
            <th scope="col">Phone number</th>
            <th scope="col">Car</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="user.id" :class="{ deactiveUser: !user.activeStatus }">
            
            <th scope="row">{{ index + 1 }}</th>
            <td> <span 
              :class="{'green-circle': user.activeStatus, 'red-circle': !user.activeStatus}"
              class="status-circle"
            ></span> </td>
            <th>{{ user.userName }}</th>
            <td>{{ user.firstName }}</td>
            <td>{{ user.lastName }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.phoneNumber }}</td>
            <td>{{ this.findDriver(user.id) }}</td>
            <td>
              <router-link class="me-3 btn btn-primary" :to="`/Drivers/EditDriver/${this.userId}`">Cancell</router-link>
            </td>
          </tr>
        </tbody>
      </table> 
      <div v-else>
        <h1>NO USERS FOUND</h1>
      </div> 
    </div>
  </white-card-80>
</template>
  
<script>
import { Enums } from '@/constants/statuses';
export default {
  data() {
    return {
      users: [],
      drivers: [],
      userTypesEnum: []
    }
  },
  mounted() {
    this.userTypesEnum = Enums.UserTypes;
    this.getUsersData();
    this.getDriversData();
  },
  methods:{
    async getUsersData(){
      const data = await this.$api.get('Users/getAllUsers',{
        userTypeId: this.userTypesEnum.Delivery
      });

      if(data.success)
        this.users = data.users || [];
    },
    async getDriversData(){
      const data = await this.$api.get('Drivers/getDrivers');

      if(data.success)
        this.drivers = data.drivers || [];
    },
    findDriver(userId) {
      const driver = this.drivers.find((x) => x.baseUserId === userId);
      return driver == null 
      ? "" 
      : driver.car.id + "# " + driver.car.brand + " " + driver.car.model + " " + driver.car.year ;
    },
  }
}
</script>
  