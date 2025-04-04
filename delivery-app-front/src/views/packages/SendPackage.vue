<template>
    <div>
        <white-card-50>
            <h2 class="fw-bold mb-2 text-uppercase">Send your package</h2>
            <div v-if="pack?.packageStatusId == packageStatusEnum.Paid">
                <p class="mb-0 mt-3">by clicking on this button you confirm leaving your shipment at the collecting point</p> 
                <p>a further step it will be picked up by the courier</p>
                <router-link class="btn btn-outline-secondary px-5 mt-3 me-3" :to="`/Packages`">CANCELL</router-link>
                <button class="btn btn-outline-success btn-md px-5 mt-3 me-4" @click="sendPackage()">SEND</button>
            </div>
            <div v-else>
                <p class="mt-3">This package is not in the right status to be sent</p>
                <router-link class="btn btn-outline-secondary px-5 mt-3" :to="`/Packages`">GO BACK</router-link>
            </div>
        </white-card-50>
    </div>
</template>

<script>
import { Enums } from '@/constants/statuses';
export default {
    data() {
        return {
            packageStatusEnum: [],
            pack: ""
        }
    },
    mounted(){
        this.token = localStorage.getItem('token');
        this.packageStatusEnum = Enums.PackageStatuses;
        this.getPackage();
    },
    methods: {
        async getPackage(){
            var url = 'https://localhost:7263/Packages/getPackage?'
            const response = await fetch(url + new URLSearchParams({
                packageId: this.$route.params.id
            }), 
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
            },
                credentials: 'include'
            });
  
          const responseJson = await response.json();
          this.pack = responseJson.package;
        },
        async sendPackage() {
            try {
                const response = await fetch('https://localhost:7263/Packages/sendPackage', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                    body: JSON.stringify({
                    packageId: this.$route.params.id
                }),
                    credentials: 'include'
                });
            } catch (error) {
                console.error("Error adding package:", error);
            }
            this.$router.push('/Packages')
        }
    }
}
</script>