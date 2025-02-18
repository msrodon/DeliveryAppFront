<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
import DefaultLayout from '@/components/layouts/DefaultLayout.vue';
import PaymentLayout from '@/components/layouts/PaymentLayout.vue';

export default {
  components: {
    DefaultLayout,
    PaymentLayout
  },
  computed: {
    layout() {
      return this.$route.meta.layout ? this.$route.meta.layout : 'default-layout';
    }
  }
}
</script>