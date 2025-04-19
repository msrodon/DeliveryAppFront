<template>
    <div>
        <white-card-50>
            <h2 class="fw-bold mb-2 text-uppercase">Collect your package</h2>
            <div v-if="pack?.packageStatusId == packageStatusEnum.Delivered">
                <p class="mb-0 mt-3">by clicking on this button you confirm collecting your package from collection point</p>
                
                <router-link class="btn btn-outline-secondary px-5 mt-3 me-3" :to="`/Packages`">CANCELL</router-link>
                <button class="btn btn-outline-success btn-md px-5 mt-3 me-4" @click="sendPackage()">COLLECT</button>
            </div>
            <div v-else>
                <p class="mt-3">This package is not in the right status to be collected</p>
                <router-link class="btn btn-outline-secondary px-5 mt-3" :to="`/Packages`">GO BACK</router-link>
            </div>
        </white-card-50>
    </div>
</template>

<script>
import { Enums } from '@/constants/statuses';
export default {
    inject: ['notify'],
    data() {
        return {
            packageStatusEnum: [],
            pack: ""
        }
    },
    mounted(){
        this.packageStatusEnum = Enums.PackageStatuses;
        this.getPackage();
    },
    methods: {
        async getPackage(){
            const data = await this.$api.get('Packages/getPackage',{
                packageId: this.$route.params.id
            });

            if(data.success)
                this.pack = data.package || [];
        },
        async sendPackage() {
            const data = await this.$api.post('Packages/collectPackage', {
                packageId: this.$route.params.id
            });

            if(data.success == true)
                this.$router.push('/Packages');
        }
    }
}
</script>