<template>
  <div>
    <notification ref="notifier" />
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
import DefaultLayout from '@/components/layouts/DefaultLayout.vue';
import PaymentLayout from '@/components/layouts/PaymentLayout.vue';
import Notification from '@/components/elements/notification.vue';

export default {
  components: {
    Notification,
    DefaultLayout,
    PaymentLayout
  },
  provide(){
    return{
        notify: this.notify
    }
  },  
  methods: {
    notify({ message, type = 'info', title = '' }) {
      this.$refs.notifier.show({ message, type, title });
    }
  },
  computed: {
    layout() {
      return this.$route.meta.layout ? this.$route.meta.layout : 'default-layout';
    }
  }
}
</script>