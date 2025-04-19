<template>
  <white-card-80>

  <h2 class="fw-bold mb-2 text-uppercase">My deliveries</h2>
  <hr>
    <div class="mt-4">
      <table class="table" v-if="deliveries.length > 0">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Delivery ID</th>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(delivery, index) in deliveries" :key="delivery.id">
            
            <th scope="row">{{ index + 1 }}</th>
            <th>{{ delivery.transportationId }}</th>
            <td>{{ delivery.dateOfTransport }}</td>
            <td>
              <span :class="getStatusClass(delivery.transportationStatus)">
                {{ findDictionary(transportationStatuses, delivery.transportationStatus) }}
              </span>
            </td>
          </tr>
        </tbody>
      </table> 
      <div v-else>
        <h1>NO DELIVERIES YET</h1>
      </div> 
          
    </div>
  </white-card-80>
</template>
  
<script>
import { Enums } from '@/constants/statuses';

  export default {
    inject: ['notify'],
    data() {
      return {
        deliveries: [],
        transportationStatuses: [],
        transportationStatusEnum: []
      }
    },
    
    async mounted() {
      this.transportationStatusEnum = Enums.TransportationStatuses;

      this.getDeliveriesHistory()

      this.transportationStatuses = await this.getDictionaries(10);
    },
    methods:{
      resetSort(){
      },
      async getDeliveriesHistory(){
        const data = await this.$api.get('Transportations/getTransportationsHistory');

        if(data.success){
          data.transportations.forEach(el => {
            el.dateOfTransport = this.formatDate(el.dateOfTransport);
          });

          this.deliveries = data.transportations || []
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
      },
      formatDate(date){
        return new Date(date).toISOString().split('T')[0]
      },
      getStatusClass(status) {
        const statusClasses = {
          [this.transportationStatusEnum.Scheduled]: "badge bg-primary",
          [this.transportationStatusEnum.Started]: "badge bg-warning",
          [this.transportationStatusEnum.Finished]: "badge bg-success",
        };
        
        return statusClasses[status] || "badge bg-secondary";
      },
    }
  }
</script>