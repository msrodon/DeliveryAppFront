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
                <h4>NO PACKAGES FOUND</h4>
            </div> 
        </div>

        <div class="mt-4">
            <router-link class="btn btn-outline-danger btn-lg px-5 me-3" :to="`/PriceLists`">Cancell</router-link>
            <button class="btn btn-outline-success btn-lg px-5" @click="editPriceList()">Save changes</button>
        </div>
    </white-card-50>
</template>

<script> 

export default {
    inject: ['notify'],
    data() {
        return {
            name: '',
            shortcut: '',
            currency: {},
            packageTypes: [],
            packagePrices: [],
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
    async mounted(){
        await this.getPackagePricesData();
        await this.getPackageTypes();
        await this.getCurrency();
    },
    methods: {
        async editPriceList() {
            const data = await this.$api.post('PackagePrices/editPackagePrice',{
                currencyId: this.$route.params.id,
                packagePrices: this.packagePrices
            });

            if(data.success)
                this.$router.push({ path: '/PriceLists' })
        },
        async getCurrency(){
            const data = await this.$api.get('Currencies/getCurrency',{
                currencyId: this.$route.params.id
            });

            if(data.success)
                this.currency = data.currency || [];
        },
        async getPackagePricesData(){
            const data = await this.$api.get('PackagePrices/getPackagePrices',{
                currencyId: this.$route.params.id
            });

            if(data.success)
                this.packagePrices = data.packagePrices || [];
        },
        async getPackageTypes(){
            const data = await this.$api.get('Dictionaries/getDictionariesByType',{
                dictionaryTypeId: 5
            });

            if(data.success)
                this.packageTypes = data.dictionaries || [];
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
        }
    }
}
</script>