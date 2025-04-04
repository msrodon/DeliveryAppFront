<template>
    <div>
        <white-card-50>
            <router-link class="btn btn-outline-secondary position-absolute top-0 end-0 m-3" :to="`/Packages`">X</router-link>
            <h2 class="fw-bold mb-2 text-uppercase">Package info</h2>
            <p class="text-dark-50 mb-3">package information details</p>
            
            <hr>
            <div class="row">
                <div class="d-flex flex-column w-50">
                    <div class="text-start mx-1">
                        <p class="text-dark-50 m-0">Sender e-mail</p>
                    </div>
                    <div class="form-outline form-dark mb-2">
                        <input class="form-control form-control-lg" v-bind:placeholder="senderEmail" disabled/>
                    </div>
                </div>

                <div class="d-flex flex-column w-50">
                    <div class="text-start mx-1">
                        <p class="text-dark-50 m-0">Reciver e-mail</p>
                    </div>
                    <div class="form-outline form-dark mb-2">
                        <input class="form-control form-control-lg" v-bind:placeholder="reciverEmail" disabled/>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="d-flex flex-column col-8">
                    <div class="text-start mx-1">
                        <p class="text-dark-50 m-0">Package status</p>
                    </div>
                    <div class="form-outline form-dark mb-2">
                        <select class="form-select form-select-lg" v-bind:value="packageStatusId" disabled>
                            <option disabled selected>Choose option</option>
                            <option v-for="x in packageStatuses" :value="x.dictionaryId" :key="x.dictionaryId">{{x.name}}</option>
                        </select>
                    </div>
                </div>

                <div class="d-flex flex-column col-4">
                    <div class="text-start mx-1">
                        <p class="text-dark-50 m-0">Package size</p>
                    </div>
                    <div class="form-outline form-dark mb-2">
                        <select class="form-select form-select-lg" v-bind:value="packageTypeId" disabled>
                            <option disabled selected>Choose option</option>
                            <option v-for="x in packageTypes" :value="x.dictionaryId" :key="x.dictionaryId">{{x.name}}</option>
                        </select>
                    </div>
                </div>
            </div>

            <hr>
            <h5>Payment</h5>
            <div class="row">
                <div class="d-flex flex-column w-100">
                    <div class="text-start mx-1">
                        <p class="text-dark-50 m-0">Payment status</p>
                    </div>
                    <div class="form-outline form-dark mb-2">
                        <select class="form-select form-select-lg" v-bind:value="paymentStatusId" disabled>
                            <option disabled selected>Choose option</option>
                            <option v-for="x in paymentStatuses" :value="x.dictionaryId" :key="x.dictionaryId">{{x.name}}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="d-flex flex-column col-4">
                    <div class="text-start mx-1">
                        <p class="text-dark-50 m-0">Payment method</p>
                    </div>
                    <div class="form-outline form-dark mb-2">
                        <select class="form-select form-select-lg" v-bind:value="paymentTypeId" disabled>
                            <option disabled selected>Choose option</option>
                            <option v-for="x in paymentTypes" :value="x.dictionaryId" :key="x.dictionaryId">{{x.name}}</option>
                        </select>
                    </div>
                </div>
                
                <div class="d-flex flex-column col-4">
                    <div class="text-start mx-1">
                        <p class="text-dark-50 m-0">Price</p>
                    </div>
                    <div class="form-outline form-dark mb-2">
                        <input class="form-control form-control-lg" v-bind:placeholder="price" disabled/>
                    </div>
                </div>

                <div class="d-flex flex-column col-4">
                    <div class="text-start mx-1">
                        <p class="text-dark-50 m-0">Currency</p>
                    </div>
                    <div class="form-outline form-dark mb-2">
                        <select class="form-select form-select-lg" v-bind:value="currencyId" disabled>
                            <option disabled selected>Choose option</option>
                            <option v-for="currency in currencies" :value="currency.id" :key="currency.id">{{currency.shortcut}}</option>
                        </select>
                    </div>
                </div>
            </div>

            <hr>
            <h5>Address</h5>
            <div class="row mb-2">

                <div class="mb-2 ms-2">
                    <div class="form-check d-flex">
                        <input class="form-check-input me-3" type="checkbox" v-model="guestAddress" readonly/>
                        <label class="form-check-label">One-time address</label>
                    </div>
                </div>

                <div class="row">
                    <div class="d-flex flex-column w-100">
                        <div class="text-start mx-1">
                            <p class="text-dark-50 m-0">Address type</p>
                        </div>
                        <div class="form-outline form-dark mb-2">
                            <select class="form-select form-select-lg" v-bind:value="addressTypeId" disabled>
                                <option disabled selected>Choose option</option>
                                <option v-for="x in addressTypes" :value="x.dictionaryId" :key="x.dictionaryId">{{x.name}}</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="d-flex flex-column col-6">
                        <div class="text-start mx-1">
                            <p class="text-dark-50 m-0">Country</p>
                        </div>
                        <div class="form-outline form-dark mb-2">
                            <input class="form-control form-control-lg" v-bind:placeholder="country" disabled/>
                        </div>
                    </div>

                    <div class="d-flex flex-column col-6">
                        <div class="text-start mx-1">
                            <p class="text-dark-50 m-0">Post code</p>
                        </div>
                        <div class="form-outline form-dark mb-2">
                            <input class="form-control form-control-lg" v-bind:placeholder="postCode" disabled/>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="d-flex flex-column col-4">
                        <div class="text-start mx-1">
                            <p class="text-dark-50 m-0">City</p>
                        </div>
                        <div class="form-outline form-dark mb-2">
                            <input class="form-control form-control-lg" v-bind:placeholder="city" disabled/>
                        </div>
                    </div>

                    <div class="d-flex flex-column col-4">
                        <div class="text-start mx-1">
                            <p class="text-dark-50 m-0">Street</p>
                        </div>
                        <div class="form-outline form-dark mb-2">
                            <input class="form-control form-control-lg" v-bind:placeholder="street" disabled/>
                        </div>
                    </div>

                    <div class="d-flex flex-column col-4">
                        <div class="text-start mx-1">
                            <p class="text-dark-50 m-0">Number</p>
                        </div>
                        <div class="form-outline form-dark mb-2">
                            <input class="form-control form-control-lg" v-bind:placeholder="number" disabled/>
                        </div>
                    </div>
                </div>
            </div>
        </white-card-50>
</div>
</template>

<script> 

export default {
    data() {
        return {
            //PACKAGE
            reciverEmail: '',
            senderEmail: '',
            packageStatusId: '',
            packageTypeId: '',

            //PAYMENT
            paymentStatusId: '',
            paymentTypeId: '',
            currencyId: '',
            price: 0,

            //ADDRESS
            country: '',
            postCode: '',
            city: '',
            street: '',
            number: '',
            addressTypeId: '',
            guestAddress: false,
            
            //DICTIONARIES
            packageStatuses: [],
            packageTypes: [],
            paymentStatuses: [],
            paymentTypes: [],
            currencies: [],
            addressTypes: [],

            token: ''
        };
    },
    async mounted(){
        this.token = localStorage.getItem('token');

        this.packageStatuses = await this.getDictionaries(2);
        this.paymentStatuses = await this.getDictionaries(7);
        this.packageTypes = await this.getDictionaries(5);
        this.paymentTypes = await this.getDictionaries(8);
        this.addressTypes = await this.getDictionaries(9);

        await this.getCurrencies();
        await this.getPackageDetails();
    },
    methods: {
        async getPackageDetails(){
            var url = 'https://localhost:7263/Packages/getPackageDetails?'
            const response = await fetch(url + new URLSearchParams({
                packageId: this.$route.params.id
            }),
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                }
            });
            const responseJson = await response.json();
            const packageDetails = responseJson.packageDetails;

            this.reciverEmail = packageDetails.reciverEmail;
            this.senderEmail = packageDetails.senderEmail;
            this.packageStatusId = packageDetails.packageStatusId;
            this.packageTypeId = packageDetails.packageTypeId;

            this.paymentStatusId = packageDetails.payment.paymentStatusId;
            this.paymentTypeId = packageDetails.payment.paymentTypeId;
            this.currencyId = packageDetails.payment.currencyId;
            this.price = packageDetails.payment.price;

            this.country = packageDetails.destinationAddress.country;
            this.postCode = packageDetails.destinationAddress.postCode;
            this.city = packageDetails.destinationAddress.city;
            this.street = packageDetails.destinationAddress.street;
            this.number = packageDetails.destinationAddress.number;
            this.addressTypeId = packageDetails.destinationAddress.addressTypeId;
            this.guestAddress = packageDetails.destinationAddress.guestAddress;
        },
        async getDictionaries(dictionaryTypeId){
            var url = 'https://localhost:7263/Dictionaries/getDictionariesByType?';
            const response = await fetch(url + new URLSearchParams({
                dictionaryTypeId: dictionaryTypeId
            }), 
            {
                method: "GET",
                headers: {
                    'accept': '',
                    'Authorization': `Bearer ${this.token}`
                }
            });

            const responseJson = await response.json();
            return responseJson.dictionaries
        },
        async getCurrencies(){

        const response = await fetch('https://localhost:7263/Currencies/getCurrencies', {
          method: "GET",
          headers: {
            'accept': '',
            'Authorization': `Bearer ${this.token}`
          }
        });

        const responseJson = await response.json();
        this.currencies = responseJson.currencies;
        }
    }
}
</script>