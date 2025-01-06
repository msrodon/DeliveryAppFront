<template>
  <white-card-80>
    
    <base-dialog :show="!!showDialog" title="Delete car confirm" @close="showDialog = !showDialog">
  
    </base-dialog>
  
    <h2 class="fw-bold mb-2 text-uppercase">Registered users</h2>
    <hr>
      <div class="mt-4">
        <table class="table" v-if="items.length > 0">
          <thead>
            <tr>
              <th scope="col">Active status</th>
              <th scope="col">User type</th>
              <th scope="col">Login</th>
              <th scope="col">FirstName</th>
              <th scope="col">LastName</th>
              <th scope="col">Email</th>
              <th scope="col">Phone number</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in items" :key="user.id" :class="{ deactiveUser: !user.activeStatus }">
              <td> <span 
                :class="{'green-circle': user.activeStatus, 'red-circle': !user.activeStatus}"
                class="status-circle"
              ></span> </td>
              <td>{{ user.userType }}</td>
              <th>{{ user.userName }}</th>
              <td>{{ user.firstName }}</td>
              <td>{{ user.lastName }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.phoneNumber }}</td>
              <td v-if="user.activeStatus" class="text-start ms-2">
                <button size="sm" @click="editUser(user.id)" class="me-3 btn btn-primary">Edit</button>
                <button size="sm" @click="changeActiveStatus(user.id, false)" class="me-3 btn btn-danger">Deactivate</button>
                <!-- <button size="sm" @click="deleteUser(user.id)" class="btn btn-danger">Delete</button> -->
              </td>
              <td v-else class="text-start ms-2">
                <button size="sm" @click="editUser(user.id)" class="me-3 btn btn-primary">Edit</button>
                <button size="sm" @click="changeActiveStatus(user.id, true)" class="me-3 btn btn-success">Activate</button>
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
export default {
  data() {
    return {
      items: []
    }
  },
  mounted() {
    this.getUsersData()
  },
  methods:{
    async getUsersData(){
        this.busyState = true;

        const token = localStorage.getItem('token');
        const response = await fetch('https://localhost:7263/Users/getAllUsers', {
          method: "GET",
          headers: {
            'accept': '',
            'Authorization': `Bearer ${token}`
          }
        });

        const responseJson = await response.json();
        this.items = responseJson.users
        this.busyState = false;
      },
    changeBusyState(){
      this.busyState = !this.busyState;
    },
    editUser(userId){
      var route = "/Users/EditUser/" + userId;

      this.$router.push({ path: route });
    },
    async changeActiveStatus(userId, newActiveStatus){
      const token = localStorage.getItem('token');

      try {
        const response = await fetch('https://localhost:7263/Users/changeActiveStatus', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
              body: JSON.stringify({
                id: userId,
                newActiveStatus
          }),
            credentials: 'include' 
      });
      } catch (error) {

      }
      window.location.href = window.location.href;
    },
  }
}
</script>
