<template>
    <div>
        <white-card-50>
            <h2 class="fw-bold mb-2 text-uppercase">Send new package</h2>
            <p class="text-dark-50 mb-5">pass package information</p>
            
            <hr>

            <div class="row">
                <div class="d-flex flex-column w-100">
                    <div class="text-start mx-1">
                        <p class="text-dark-50 m-0">Reciver e-mail</p>
                    </div>
                    <div class="form-outline form-dark mb-4">
                        <input class="form-control form-control-lg" placeholder="reciver email" v-model="reciverEmail"/>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="d-flex flex-column w-100">
                    <div class="text-start mx-1">
                        <p class="text-dark-50 m-0">Address</p>
                    </div>
                    <div class="form-outline form-dark mb-4">
                        <select class="form-select form-select-lg" v-model="destinationId" :disabled="useGuestAddress">
                            <option disabled selected>Choose option</option>
                            <option v-for="address in userAddresses" :value="address.id" :key="address.id">{{address.name}}</option>
                        </select>
                    </div>
                </div>

                <div>
                    <div class="form-check d-flex">
                        <input class="form-check-input me-3" type="checkbox" v-model="useGuestAddress" id="oneTimeAddressCheck" />
                        <label class="form-check-label" for="oneTimeAddressCheck">Use one-time address instead</label>
                    </div>
                </div>
            </div>
        </white-card-50>

    <white-card-50 v-if="!!useGuestAddress">
        <h2 class="fw-bold mb-2 text-uppercase">One time addres</h2>
        <p class="text-dark-50 mb-5">pass address data</p>
        
        <hr>
        
        <div class="row">
            <div class="d-flex flex-column w-100">
                <div class="text-start mx-1">
                    <p class="text-dark-50 m-0">Country</p>
                </div>
                <div class="form-outline form-dark mb-4">
                    <select class="form-select form-select-lg" v-model="countryId">
                        <option disabled selected>Choose option</option>
                        <option v-for="country in countries" :value="country.id" :key="country.id">{{country.name}}</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="d-flex flex-column w-50">
                <div class="text-start mx-1">
                    <p class="text-dark-50 m-0">City</p>
                </div>
                <div class="form-outline form-dark mb-4">
                    <input class="form-control form-control-lg" placeholder="City" v-model="city"/>
                </div>
            </div>
            <div class="d-flex flex-column w-50">
                <div class="text-start mx-1">
                    <p class="text-dark-50 m-0">Post code</p>
                </div>
                <div class="form-outline form-dark mb-4">
                    <input class="form-control form-control-lg" placeholder="Post code" v-model="postCode"/>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="d-flex flex-column w-50">
                <div class="text-start mx-1">
                    <p class="text-dark-50 m-0">Street</p>
                </div>
                <div class="form-outline form-dark mb-4">
                    <input class="form-control form-control-lg" placeholder="Street" v-model="street"/>
                </div>
            </div>
            <div class="d-flex flex-column w-50">
                <div class="text-start mx-1">
                    <p class="text-dark-50 m-0">Number</p>
                </div>
                <div class="form-outline form-dark mb-4">
                    <input class="form-control form-control-lg" placeholder="Number" v-model="number"/>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="d-flex flex-column w-100">
                <div class="text-start mx-1">
                    <p class="text-dark-50 m-0">Address type</p>
                </div>
                <div class="form-outline form-dark mb-4">
                    <select class="form-select form-select-lg" v-model="addressTypeId">
                        <option disabled selected>Choose option</option>
                        <option v-for="address in addressTypes" :value="address.dictionaryId" :key="address.dictionaryId">{{address.name}}</option>
                    </select>
                </div>
            </div>
        </div>
    </white-card-50>

    <white-card-50 v-if="!!useGuestAddress || destinationId != ''">
        <h2 class="fw-bold mb-2 text-uppercase">Payment</h2>
        <p class="text-dark-50 mb-5">pass payment details</p>
        
        <hr>
        
        <div class="row">
            <div class="d-flex flex-column w-100">
                <div class="text-start mx-1">
                    <p class="text-dark-50 m-0">Payment type</p>
                </div>
                <div class="form-outline form-dark mb-4">
                    <select class="form-select form-select-lg" v-model="paymentTypeId" >
                        <option disabled selected>Choose option</option>
                        <option v-for="payment in paymentTypes" :value="payment.dictionaryId" :key="payment.dictionaryId">{{payment.name}}</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="d-flex flex-column w-100">
                <div class="text-start mx-1">
                    <p class="text-dark-50 m-0">Package type</p>
                </div>
                <div class="form-outline form-dark mb-4">
                    <select class="form-select form-select-lg" v-model="packageTypeId" @change="recalculatePrice()">
                        <option disabled selected>Choose option</option>
                        <option v-for="type in packageTypes" :value="type.dictionaryId" :key="type.dictionaryId">{{type.name}}</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="d-flex flex-column w-100">
                <div class="text-start mx-1">
                    <p class="text-dark-50 m-0">Select currency</p>
                </div>
                <div class="form-outline form-dark mb-4">
                    <select class="form-select form-select-lg" v-model="currencyId" @change="getPackagePrice()" required>
                        <option disabled selected>Choose option</option>
                        <option v-for="currency in currencies" :value="currency.id" :key="currency.id">{{currency.name + " (" + currency.shortcut + ")"}}</option>
                    </select>
                </div>
            </div>
        </div>
        
        <div class="row text-end">
            <h1>TOTAL: {{ totalPrice }} {{ selectedCurrency.shortcut }} </h1>
        </div>
        
        <div class="mt-4">
            <router-link class="btn btn-outline-danger btn-lg px-5 me-3" :to="`/`">Cancell</router-link>
            <button class="btn btn-outline-success btn-lg px-5" @click="addPackage()">Pay & Send</button>
        </div>
    </white-card-50>
</div>
</template>

<script> 

export default {
    inject: ['notify'],
    data() {
        return {
            reciverEmail: '',
            destinationId: '',
            packageTypeId: '',
            paymentTypeId: '',
            currencyId: '',
            totalPrice: 0,
            //GUEST ADDRESS
            countryId: '',
            postCode: '',
            city: '',
            street: '',
            number: '',
            addressTypeId: '',
            //API DATA
            countries: [],
            currencies: [],
            userAddresses: [],
            packageTypes: [],
            packagePrices: [],
            addressTypes: [],
            paymentTypes: [],
            //SETTINGS
            useGuestAddress: false,
            selectedCurrency: ''
        };
    },
    async mounted(){
        this.packageTypes = await this.getDictionaries(5);
        this.addressTypes = await this.getDictionaries(9);
        this.paymentTypes = await this.getDictionaries(8);

        this.getCountries();
        this.getCurrencies();
        this.getUserAddresses();
    },
    methods: {
        async addPackage() {
            const body = { 
                reciverEmail: this.reciverEmail,
                packageTypeId: this.packageTypeId,
                paymentTypeId: this.paymentTypeId,
                currencyId: this.currencyId,
                price: this.totalPrice
            };

            if (this.useGuestAddress) {
                body.guestAddress = {
                    countryId: this.countryId,
                    postCode: this.postCode,
                    city: this.city,
                    street: this.street,
                    number: this.number,
                    addressTypeId: this.addressTypeId
                };
            } else {
                body.destinationId = this.destinationId;
            }

            const validationMessage = this.validate(body);
            if(validationMessage){
                this.notify({ title: 'Error', message: validationMessage, type: 'error' });
                return;
            }

            const data = await this.$api.post('Packages/addPackage',body);

            if(data.success){
                const path = "/Payment/"+ data.newPackageId
                this.$router.push({ path });
            }
        },
        async getUserAddresses(){
            const data = await this.$api.get('Addresses/getUserAddresses');

            if(data.success)
                this.userAddresses = data.userAddresses || [];
        },
        async getCountries(){
            const data = await this.$api.get('Countries/getCountries');

            if(data.success)
                this.countries = data.countries || [];
        },
        async getCurrencies(){
            const data = await this.$api.get('Currencies/getCurrencies');

            if(data.success)
                this.currencies = data.currencies || [];
        },
        async getPackagePrice(){
            const data = await this.$api.get('PackagePrices/getPackagePrices',{
                currencyId: this.currencyId
            });

            if(data.success){
                this.packagePrices = data.packagePrices || [];
                this.selectedCurrency = this.currencies.find(p => p.id == this.currencyId);
                this.recalculatePrice();
            }
        },
        recalculatePrice() {
            if (!this.packageTypeId || !this.currencyId) {
                this.totalPrice = 0;
                return;
            }
            
            const selectedPackage = this.packagePrices.find(p => p.packageTypeId == this.packageTypeId);
            if (!selectedPackage) {
                this.totalPrice = 0;
                return;
            }

            this.totalPrice = (selectedPackage.price).toFixed(2);
        },
        async getDictionaries(dictionaryTypeId){
            const data = await this.$api.get('Dictionaries/getDictionariesByType',{
                dictionaryTypeId: dictionaryTypeId
            });

            if(data.success)
                return data.dictionaries || [];
        },
        validate(data){
            if (!data.reciverEmail) return("Receiver email is required.");
            if (!data.packageTypeId) return("Package type is required.");
            if (!data.paymentTypeId) return("Payment type is required.");
            if (!data.currencyId) return("Currency is required.");
            if (data.price == null || data.price === "") return("Price is required.");

            if (this.useGuestAddress) {
                const address = data.guestAddress;
                if (!address.countryId) return("Country is required.");
                if (!address.postCode) return("Post code is required.");
                if (!address.city) return("City is required.");
                if (!address.street) return("Street is required.");
                if (!address.number) return("House/flat number is required.");
                if (!address.addressTypeId) return("Address type is required.");
            }
            return '';
        }
    }
}
</script>