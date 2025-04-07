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
              <td>{{ findDictionary(userTypes ,user.userType) }}</td>
              <th>{{ user.userName }}</th>
              <td>{{ user.firstName }}</td>
              <td>{{ user.lastName }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.phoneNumber }}</td>

              <td v-if="user.activeStatus" class="text-start ms-2">
                <router-link class="me-3 btn btn-primary" :to="`/Users/EditUser/${user.id}`">Edit</router-link>
                <button @click="changeActiveStatus(user.id, false)" class="me-3 btn btn-outline-danger">Deactivate</button>
              </td>

              <td v-else class="text-start ms-2">
                <router-link class="me-3 btn btn-primary" :to="`/Users/EditUser/${user.id}`">Edit</router-link>
                <button @click="changeActiveStatus(user.id, true)" class="me-3 btn btn-outline-success">Activate</button>
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
  inject: ['notify'],
  data() {
    return {
      users: [],
      userTypes: []
    }
  },
  mounted() {
    this.getUsersData();
    this.getUserTypes();
  },
  methods:{
    async getUsersData(){
      const data = await this.$api.get('Users/getAllUsers');
      
      if(data.success)
        this.users = data.users;
    },

    async changeActiveStatus(userId, newActiveStatus){
      const data = await this.$api.post('Users/changeActiveStatus', {
        id: userId, 
        newActiveStatus
      });

      if(data.success == true)
          this.getUsersData();
    },

    async getUserTypes(){
      const data = await this.$api.get('Dictionaries/getDictionariesByType',{
        dictionaryTypeId: 1
      });

      if(data.success)
        this.userTypes = data.dictionaries || [];
    },
    findDictionary(dictionaryList, dictionaryId) {
      const dictionary = dictionaryList.find((x) => x.dictionaryId === dictionaryId);
      return dictionary ? dictionary.name : 'Unknown';
    }
  }
}
</script>
