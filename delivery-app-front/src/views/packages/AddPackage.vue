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
                        <label class="form-check-label" for="oneTimeAddressCheck">
                        Use one-time address instead
                        </label>
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
            
            <button class="btn btn-outline-danger btn-lg px-5 me-4" type="submit" v-on:click="cancell()">Cancell</button>
            <button class="btn btn-outline-success btn-lg px-5" type="submit" v-on:click="addPackage()">Pay & Send</button>
        </div>
    </white-card-50>
</div>
</template>

<script> 

export default {
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
            selectedCurrency: ""
        };
    },
    mounted(){
        this.getCountries();
        this.getCurrencies();
        this.getPackageTypes();
        this.getAddressTypes();
        this.getUserAddresses();
        this.getPaymentTypes();
    },
    methods: {
        async addPackage() {

            const token = localStorage.getItem('token');
            const body = { 
                reciverEmail: this.reciverEmail,
                packageTypeId: this.packageTypeId,
                paymentTypeId: this.paymentTypeId,
                currencyId: this.currencyId,
                price: this.totalPrice
            };
            console.log(body);

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
            try {
                const response = await fetch('https://localhost:7263/Packages/addPackage', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(body),
                    credentials: 'include'
                });
                
                const responseJson = await response.json();
                const path = "/Payment/"+ responseJson.newPackageId
                this.$router.push({ path });
            } catch (error) {
                console.error("Error adding package:", error);
            }
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
        async getUserAddresses(){
            const token = localStorage.getItem('token');
            const response = await fetch('https://localhost:7263/Addresses/getUserAddresses', {
            method: "GET",
            headers: {
                'accept': '',
                'Authorization': `Bearer ${token}`
            }
            });

            const responseJson = await response.json();
            this.userAddresses = responseJson.userAddresses
        },
        async getAddressTypes(){
            const token = localStorage.getItem('token');
            var url = 'https://localhost:7263/Dictionaries/getDictionariesByType?';
            const response = await fetch(url + new URLSearchParams({
                dictionaryTypeId: 9
            }), 
            {
                method: "GET",
                headers: {
                    'accept': '',
                    'Authorization': `Bearer ${token}`,
                    'DictionaryTypeId': 9
                }
            });

            const responseJson = await response.json();
            this.addressTypes = responseJson.dictionaries
        },
        async getPaymentTypes(){
            const token = localStorage.getItem('token');
            var url = 'https://localhost:7263/Dictionaries/getDictionariesByType?';
            const response = await fetch(url + new URLSearchParams({
                dictionaryTypeId: 8
            }), 
            {
                method: "GET",
                headers: {
                    'accept': '',
                    'Authorization': `Bearer ${token}`,
                    'DictionaryTypeId': 8	
                }
            });

            const responseJson = await response.json();
            this.paymentTypes = responseJson.dictionaries
        },
        async getCountries(){
            const token = localStorage.getItem('token');
            const response = await fetch('https://localhost:7263/Countries/getCountries', {
            method: "GET",
            headers: {
                'accept': '',
                'Authorization': `Bearer ${token}`
            }
            });

            const responseJson = await response.json();
            this.countries = responseJson.countries
        },
        async getCurrencies(){
        this.busyState = true;

        const token = localStorage.getItem('token');
        const response = await fetch('https://localhost:7263/Currencies/getCurrencies', {
          method: "GET",
          headers: {
            'accept': '',
            'Authorization': `Bearer ${token}`
          }
        });

        const responseJson = await response.json();
        this.currencies = responseJson.currencies
        this.busyState = false;
        },
        async getPackagePrice(){
            var url = 'https://localhost:7263/PackagePrices/getPackagePrices?'
            const token = localStorage.getItem('token');

            const response = await fetch(url + new URLSearchParams({
                currencyId: this.currencyId
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
            
            this.selectedCurrency = this.currencies.find(p => p.id == this.currencyId);
            this.recalculatePrice();
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
        cancell(){
          var route = "/";
          this.$router.push({ path: route });
        }
    }
}
</script>