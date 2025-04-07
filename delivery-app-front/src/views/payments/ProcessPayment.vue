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
            currencies: [],
            paymentTypes: [],
            paymentStatusEnum: []
        };
    },
    async mounted(){
        this.paymentStatusEnum = Enums.PaymentStatuses;
        await this.getCurrencies();
        await this.getPaymentTypes();
        await this.getPaymentData();
    },
    methods: {
        async payNow() {
            alert('Payment processing...');

            const data = await this.$api.post('Payments/setPaymentAsPaid',{
                paymentId: this.paymentId
            });

            if(data.success)
                this.$router.push('/Packages')
        },
        async getPaymentData(){
            const data = await this.$api.get('getPaymentByPackageId',{
                packageId: this.$route.params.id
            });

            if(data.success){
                var fetchPayment = data.payment;
                this.paymentId = fetchPayment.id;
                this.paymentPrice = fetchPayment.price;
                this.paymentTypeId = fetchPayment.paymentTypeId;
                this.paymentStatusId = fetchPayment.paymentStatusId;
                this.paymentCurrency = this.findCurrency(fetchPayment.currencyId);
            }
        },
        async getPaymentTypes(){
            const data = await this.$api.get('Dictionaries/getDictionariesByType',{
                dictionaryTypeId: 8
            });

            if(data.success)
                this.paymentTypes = data.dictionaries || [];
        },
        async getCurrencies(){
            const data = await this.$api.get('Currencies/getCurrencies');

            if(data.success)
                this.currencies = data.currencies || [];
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