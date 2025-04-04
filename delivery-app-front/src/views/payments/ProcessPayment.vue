<template>
    <div class="payment-container">
      <router-link class="btn btn-lg btn-outline-secondary position-absolute top-0 end-0 m-3" :to="`/Packages`">X</router-link>
        <div class="payment-box">
            <h2>Payment summary</h2>
            <p>Order number: <strong>#{{ paymentId }}#</strong></p>
            <p>Payment method: <strong>{{ findDictionary(paymentTypes, paymentTypeId) }} </strong></p>
            <p>Payment currency: <strong>{{ paymentCurrency.name }} </strong></p>
            <p>Payment amount: <strong>{{ paymentPrice }} ({{ paymentCurrency.shortcut }})</strong></p>
            <button v-if="paymentStatusId == paymentStatusEnum.Unpaid" @click="payNow">Pay now</button>
            <p v-else class="text-success fs-4">This order has already been paid.</p>
        </div>
    </div>
</template>
  
<script>
import { Enums } from '@/constants/statuses';
export default {
    data() {
        return {
            paymentId:"",
            paymentTypeId:"",
            paymentStatusId:"",
            paymentCurrency: {},
            paymentPrice: "",
            //
            token: "",
            currencies: [],
            paymentTypes: [],
            paymentStatusEnum: []
        };
    },
    async mounted(){
        this.token = localStorage.getItem('token');
        this.paymentStatusEnum = Enums.PaymentStatuses;
        await this.getCurrencies();
        await this.getPaymentTypes();
        await this.getPaymentData();
    },
    methods: {
        async payNow() {
            alert('Płatność przetwarzana...');

            try {
                const response = await fetch('https://localhost:7263/Payments/setPaymentAsPaid', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}`
                    },
                        body: JSON.stringify({
                            paymentId: this.paymentId
                    }),
                    credentials: 'include' 
                });
            } catch (error) {

            }
            this.$router.push('/Packages')
        },
        async getPaymentData(){
            var url = 'https://localhost:7263/Payments/getPaymentByPackageId?'
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
            var fetchPayment = responseJson.payment;

            this.paymentId = fetchPayment.id;
            this.paymentTypeId = fetchPayment.paymentTypeId;
            this.paymentStatusId = fetchPayment.paymentStatusId;
            this.paymentCurrency = this.findCurrency(fetchPayment.currencyId);
            this.paymentPrice = fetchPayment.price;
        },
        async getPaymentTypes(){
            var url = 'https://localhost:7263/Dictionaries/getDictionariesByType?';
            const response = await fetch(url + new URLSearchParams({
                dictionaryTypeId: 8
            }), 
            {
                method: "GET",
                headers: {
                    'accept': '',
                    'Authorization': `Bearer ${this.token}`,
                    'DictionaryTypeId': 8	
                }
            });

            const responseJson = await response.json();
            this.paymentTypes = responseJson.dictionaries
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
        },
        findDictionary(dictionaryList, dictionaryId) {
          const dictionary = dictionaryList.find((x) => x.dictionaryId === dictionaryId);
          return dictionary ? dictionary.name : 'Unknown';
        },
        findCurrency(currencyId) {
          return this.currencies.find((x) => x.id === currencyId);
        }
    }
};
</script>
  
<style scoped>
.payment-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f4f4f4;
    position: relative;
}

.payment-box {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    position: relative;
}

.close-btn:hover {
    color: #000;
}

h2 {
    font-size: 3rem;
    margin-bottom: 1rem;
}

p {
    font-size: 1.2rem;
    margin: 0.5rem 0;
}

button {
    margin-top: 1rem;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    color: white;
    background-color: #28a745;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #218838;
}
</style>