<template>
    <div class="notification-container">
      <transition-group name="fade" tag="div">
        <div
          v-for="(note) in notifications"
          :key="note.id"
          :class="['alert', alertClass(note.type), 'shadow-sm', 'mb-2']"
          role="alert"
        >
          <strong v-if="note.title">{{ note.title }}</strong>
          <div>{{ note.message }}</div>
        </div>
      </transition-group>
    </div>
  </template>
  
  <script>
  let idCounter = 0;
  
  export default {
    data() {
      return {
        notifications: []
      };
    },
    methods: {
      show({ message, type = 'info', title = '' }) {
        const id = idCounter++;
        if(this.notifications.length<8){   
            this.notifications.push({ id, message, type, title });
        }else if(this.notifications.length == 8){
            this.notifications.push({ id, message: "Bro slow down... ಠ_ಠ", type:"error", title });
        }else{
            return;
        }
  
        setTimeout(() => {
          this.notifications = this.notifications.filter(n => n.id !== id);
        }, 7000);
      },
      alertClass(type) {
        switch (type) {
          case 'success': return 'alert-success';
          case 'error': return 'alert-danger';
          case 'warning': return 'alert-warning';
          case 'info': return 'alert-info';
          default: return 'alert-secondary';
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .notification-container {
    position: fixed;
    top: 100px;
    right: 20px;
    z-index: 9999;
    width: 260px;
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
  </style>