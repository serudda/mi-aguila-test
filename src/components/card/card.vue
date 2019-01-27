<!-- Template -->
<template>
  <div class="ma-card" :class="cardClass" @click="onCardClick">
    <div class="ma-card__info p-3 w-100">
      <span class="ma-badge ma-badge--xs ma-badge--neutral mb-3">
        <span class="font-weight-9 mr-2">id</span>
        92915593-d070-49d4-94d1-4e4bff65772d
      </span>
      <div class="dates">
        <div class="dates__detail mb-2">
          <span class="title color-slate font-weight-9">start</span>
          <span class="address color-silver">
            {{ data.start.pickup_address }}
          </span>
        </div>
        <div class="dates__detail dates__detail--end">
          <span class="title color-slate font-weight-9">end</span>
          <span class="address color-silver">{{ data.end.pickup_address }}</span>
        </div>
      </div>
      <div class="time"></div>
    </div>
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
    cardClass() {
      return {
        'ma-card': true,
        'ma-card--positive': this.data.status === 'onWay',
        'ma-card--info': this.data.status === 'started',
        'ma-card--warning': this.data.status === 'near'
      }
    },
  },
  methods: {
    onCardClick() {
      const startLat = this.data.start.pickup_location.coordinates[1];
      const startLng = this.data.start.pickup_location.coordinates[0];
      const endLat = this.data.end.pickup_location.coordinates[1];
      const endLng = this.data.end.pickup_location.coordinates[0];
      this.$emit('drive-changed',
      {
        start: { lat: startLat, lng: startLng },
        end: { lat: endLat, lng: endLng }
      });
    },
  }
};
</script>
