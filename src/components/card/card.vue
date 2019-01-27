<!-- Template -->
<template>
  <div class="ma-card">
    <div :class="statusClass">
      <span>{{ data.status | capitalize }}</span>
    </div>
    <div class="ma-card__info"></div>
    <div class="ma-card__time"></div>
  </div>
</template>

<!-- Script -->
<script>
import './card.scss';

export default {
  name: 'ma-card',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {
    statusClass() {
      return {
        'ma-card__status': true,
        'ma-bg-positive': this.data.status === 'onWay',
        'ma-bg-info': this.data.status === 'started',
        'ma-bg-warning': this.data.status === 'near'
      }
    },
  }
};
</script>
