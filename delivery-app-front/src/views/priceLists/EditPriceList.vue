<template>
    <white-card-50>
        <h2 class="fw-bold mb-2 text-uppercase">Edit price list - {{ this.currency.name + "(" + this.currency.shortcut + ")" }}</h2>
        <p class="text-dark-50 mb-5">pass price of packages information</p>
        
        <hr>

        <div class="mt-4">
        <table class="table" v-if="packageTypes.length > 0">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Type</th>
              <th scope="col">Price</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(pType, index) in packageTypes" :key="pType.dictionaryId">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ pType.name }}</td>
                <td>
                    <input 
                        type="number" 
                        class="form-control form-control-md"
                        v-model="formattedPrices[pType.dictionaryId]" 
                        @focusout="formatPrice(pType.dictionaryId, $event.target.value)"
                        min="0"
                    />
                </td>
                <td>{{ this.currency.shortcut }}</td>
            </tr>
          </tbody>
        </table> 
        <div v-else>
          <h1>NO PACKAGES FOUND</h1>
        </div> 
  
            <!-- <template #table-busy>
              <div class="text-center text-primary my-5">
                <b-spinner class="align-middle"></b-spinner>
                <strong> Loading...</strong>
              </div>
            </template>
             -->
            
      </div>

        <div class="mt-4">
            <button class="btn btn-outline-danger btn-lg px-5 me-3" @click="goToPriceLists()">Cancell</button>
            <button class="btn btn-outline-success btn-lg px-5" @click="editPriceList()">Save changes</button>
        </div>
    </white-card-50>
</template>

<script> 

export default {
    data() {
        return {
            name: '',
            shortcut: '',
            currency: {},
            packageTypes: [],
            packagePrices: []
        };
    },
    computed: {
        formattedPrices() {
        return this.packagePrices.reduce((map, item) => {
            map[item.packageTypeId] = item.price.toFixed(2);
            return map;
        }, {});
        }
    },
    mounted(){
        this.getPackagePricesData();
        this.getPackageTypes();
        this.getCurrency();
    },
    methods: {

        async editPriceList() {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('https://localhost:7263/PackagePrices/editPackagePrice', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                        body: JSON.stringify({
                            currencyId: this.$route.params.id,
                            packagePrices: this.packagePrices
                    }),
                    credentials: 'include' 
                });
            } catch (error) {

            }
            
            this.$router.push({ path: '/PriceLists' })
        },
        async getCurrency(){
            var url = 'https://localhost:7263/Currencies/getCurrency?'
            const token = localStorage.getItem('token');

            const response = await fetch(url + new URLSearchParams({
                currencyId: this.$route.params.id
            }),
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const responseJson = await response.json();
            console.log(responseJson);
            this.currency = responseJson.currency;
        },
        async getPackagePricesData(){
            var url = 'https://localhost:7263/PackagePrices/getPackagePrices?'
            const token = localStorage.getItem('token');

            const response = await fetch(url + new URLSearchParams({
                currencyId: this.$route.params.id
            }),
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const responseJson = await response.json();
            this.packagePrices = responseJson.packagePrices;
        },
        async getPackageTypes(){
            const token = localStorage.getItem('token');
            var url = 'https://localhost:7263/Dictionaries/getDictionariesByType?';
            const response = await fetch(url + new URLSearchParams({
                dictionaryTypeId: 5
            }), 
            {
                method: "GET",
                headers: {
                    'accept': '',
                    'Authorization': `Bearer ${token}`,
                    'DictionaryTypeId': 5
                }
            });

            const responseJson = await response.json();
            this.packageTypes = responseJson.dictionaries
        },
        formatPrice(dictionaryId, value) {
            let sanitizedValue = value.replace(",", ".");
            let numericValue = parseFloat(sanitizedValue);
            
            if (!isNaN(numericValue)) {
                let priceObj = this.packagePrices.find(p => p.dictionaryId === dictionaryId);
                if (priceObj) {
                    priceObj.price = parseFloat(numericValue.toFixed(2));
                } else {
                    this.packagePrices.push({ packageTypeId:dictionaryId, price: parseFloat(numericValue.toFixed(2)) });
                }
            }
        },
        goToPriceLists(){
            this.$router.push('/PriceLists');
        }
    }
}
</script>