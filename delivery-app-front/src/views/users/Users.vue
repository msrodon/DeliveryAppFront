<template>
  <white-card-80>
    
    <base-dialog :show="!!showDialog" title="Delete car confirm" @close="showDialog = !showDialog">
  
    </base-dialog>
  
    <h2 class="fw-bold mb-2 text-uppercase">Registered users</h2>
    <hr>
      <div class="mt-4">
        <table class="table" v-if="users.length > 0">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Active status</th>
              <!-- <th scope="col">User ID</th> -->
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
            <tr v-for="(user, index) in users" :key="user.id" :class="{ deactiveUser: !user.activeStatus }">
              
              <th scope="row">{{ index + 1 }}</th>
              <td> <span 
                :class="{'green-circle': user.activeStatus, 'red-circle': !user.activeStatus}"
                class="status-circle"
              ></span> </td>
              <!-- <td>{{ user.id }}</td> -->
              <td>{{ findDictionary(userTypes ,user.userType) }}</td>
              <th>{{ user.userName }}</th>
              <td>{{ user.firstName }}</td>
              <td>{{ user.lastName }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.phoneNumber }}</td>
              <td v-if="user.activeStatus" class="text-start ms-2">
                <button size="sm" @click="goToEditUser(user.id)" class="me-3 btn btn-primary">Edit</button>
                <button size="sm" @click="changeActiveStatus(user.id, false)" class="me-3 btn btn-outline-danger">Deactivate</button>
                <!-- <button size="sm" @click="deleteUser(user.id)" class="btn btn-danger">Delete</button> -->
              </td>
              <td v-else class="text-start ms-2">
                <button size="sm" @click="goToEditUser(user.id)" class="me-3 btn btn-primary">Edit</button>
                <button size="sm" @click="changeActiveStatus(user.id, true)" class="me-3 btn btn-outline-success">Activate</button>
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
      users: [],
      //
      userTypes: [],
      token: ''
    }
  },
  mounted() {
    this.token = localStorage.getItem('token');
    this.getUsersData();
    this.getUserTypes();
  },
  methods:{
    async getUsersData(){
      const response = await fetch('https://localhost:7263/Users/getAllUsers', {
        method: "GET",
        headers: {
          'accept': '',
          'Authorization': `Bearer ${this.token}`
        }
      });

      const responseJson = await response.json();
      this.users = responseJson.users
    },
    async changeActiveStatus(userId, newActiveStatus){
      try {
        const response = await fetch('https://localhost:7263/Users/changeActiveStatus', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
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
    async getUserTypes(){
            var url = 'https://localhost:7263/Dictionaries/getDictionariesByType?';
            const response = await fetch(url + new URLSearchParams({
                dictionaryTypeId: 1
            }), 
            {
                method: "GET",
                headers: {
                    'accept': '',
                    'Authorization': `Bearer ${this.token}`,
                    'DictionaryTypeId': 1
                }
            });

            const responseJson = await response.json();
            this.userTypes = responseJson.dictionaries;
        },
    goToEditUser(userId){
      var route = "/Users/EditUser/" + userId;
      this.$router.push({ path: route });
    },
    findDictionary(dictionaryList, dictionaryId) {
      const dictionary = dictionaryList.find((x) => x.dictionaryId === dictionaryId);
      return dictionary ? dictionary.name : 'Unknown';
    }
  }
}
</script>
