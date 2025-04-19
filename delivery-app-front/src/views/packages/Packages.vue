<template>
  <div>
    <white-card-80>
      <router-link class="btn btn-outline-secondary position-absolute top-0 end-0 m-3" :to="`/`">X</router-link>

      <h2 class="fw-bold mb-2 text-uppercase">My sent packages</h2>
      <hr>
      <div class="mt-4">
        <table class="table" v-if="postedFromUser.length > 0">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Reciver email</th>
              <th scope="col">Package type</th>
              <th scope="col">Package status</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(pack, index) in postedFromUser" :key="pack.id">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ pack.reciverEmail }}</td>
              <td>{{ findDictionary(packageTypes, pack.packageTypeId) }}</td>
              <td>{{ findDictionary(packageStatuses, pack.packageStatusId) }}</td>
              <td>
                <router-link class="btn btn-outline-primary px-5 my-2 mx-2" :to="`/Packages/PackageInfo/${pack.packageId}`">
                  Package info
                </router-link>

                <router-link class="btn btn-outline-warning px-5 my-2 mx-2" :to="`/Payment/${pack.paymentId}`" v-if="pack.packageStatusId == packageStatusEnum.New">
                  Continue payment
                </router-link>

                <router-link class="btn btn-outline-info px-5 my-2 mx-2" :to="`/Packages/SendPackage/${pack.packageId}`" v-if="pack.packageStatusId == packageStatusEnum.Paid">
                  Mark as send
                </router-link>
              </td>
            </tr>
          </tbody>
        </table> 
        <div v-else>
          <h4>NO PACKAGES SENT</h4>
        </div> 
            
      </div>
      <router-link class="btn btn-outline-success px-5 my-2" :to="`/Packages/addPackage`">
        Send new package
      </router-link>
    </white-card-80>
    
    <white-card-80>
  
      <h2 class="fw-bold mb-2 text-uppercase">My packages to collect</h2>
      <hr>
      <div class="mt-4">
        <table class="table" v-if="postedToUser.length > 0">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Sender email</th>
              <th scope="col">Package type</th>
              <th scope="col">Package status</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(pack, index) in postedToUser" :key="pack.id">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ pack.senderEmail }}</td>
              <td>{{ findDictionary(packageTypes, pack.packageTypeId) }}</td>
              <td>{{ findDictionary(packageStatuses, pack.packageStatusId) }}</td>
              <td>
                <router-link class="btn btn-outline-warning px-5 my-2" :to="`/Packages/CollectPackage/${pack.packageId}`" v-if="pack.packageStatusId == packageStatusEnum.Delivered">
                  Collect package
                </router-link>
              </td>
            </tr>
          </tbody>
        </table> 
        <div v-else>
          <h4>NO PACKAGES TO COLLECT</h4>
        </div> 
            
      </div>
    </white-card-80>
  </div>
</template>
  
  <script>
    import { Enums } from '@/constants/statuses';
    export default {
      data() {
        return {
          postedFromUser: [],
          postedToUser: [],
          currencies: [],
          packageTypes: [],
          packageStatuses: [],
          packageStatusEnum: []
        }
      },
      async mounted() {
        this.packageStatusEnum = Enums.PackageStatuses;
        this.packageTypes = await this.getDictionaries(5);
        this.packageStatuses = await this.getDictionaries(2);

        this.getPackages();
      },
      methods:{
        async getPackages(){
          const data = await this.$api.get('Packages/getUserPackages');

          if(data.success){
            this.postedFromUser = data.postedFromUser;
            this.postedToUser = data.postedToUser;
          }
        },
        async getDictionaries(dictionaryTypeId){
          const data = await this.$api.get('Dictionaries/getDictionariesByType',{
                dictionaryTypeId: dictionaryTypeId
            });

            if(data.success)
                return data.dictionaries || [];
        },
        findDictionary(dictionaryList, dictionaryId) {
          const dictionary = dictionaryList.find((dictionary) => dictionary.dictionaryId === dictionaryId);
          return dictionary ? dictionary.name : 'Unknown';
        }
      }
    }
  </script>