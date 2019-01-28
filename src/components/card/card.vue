<!-- Template -->
<template>
  <div class="ma-card"
    :class="cardClass"
    @click="onCardClick"
    @mouseover="onCardMouseover"
    @mouseleave="onCardMouseleave">
    <div class="ma-card__reload" v-if="showReloadBtn">
      <span class="icon-btn icon-btn--neutral icon-btn--sm" @click="onReloadClick">
        <img class="icon" v-bind:src="reloadIcon" />
      </span>
    </div>
    <div class="ma-card__status">{{ data.status | capitalize }}</div>
    <div class="ma-card__info p-3 w-100">
      <div class="title mb-3">
        <span class="ma-badge ma-badge--xs ma-badge--neutral">
          <span class="color-slate font-weight-9 mr-2">id</span>
          {{ data.check_code }}
        </span>
        <span class="color-silver font-size-md mx-3">·</span>
        <span class="ma-badge ma-badge--xs ma-badge--primary">
          <span class="color-dark-primary font-weight-8 mr-2">plate</span> {{ data.car.plate }}</span>
      </div>
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
    </div>
    <div
      class="ma-card__time p-3 d-flex flex-column"
      v-if="!loading">
      <span class="time mb-1">{{ estimatedTime.text }}</span>
      <span class="label">estimated time</span>
    </div>
    <div
      class="ma-card__time p-3 d-flex flex-column"
      v-if="loading">
      <span class="time mb-1">reloading...</span>
    </div>
  </div>
</template>

<!-- Script -->
<script>
import './card.scss';
import reloadIcon from '../../assets/reload.svg';

export default {
  name: 'ma-card',
  props: {
    cardIndex: {
      type: Number,
    },
    cardActive: {
      type: Number,
    },
    data: {
      type: Object,
      required: true,
    },
    estimatedTime: {
      type: Object,
      default: () => { return {text: '-', value: null}}
    }
  },
  data() {
    return {
      showReloadBtn: false,
      loading: false,
      active: this.cardIndex === this.cardActive,
    };
  },
  computed: {
    reloadIcon() {
      return reloadIcon;
    },
    cardClass() {
      return {
        'ma-card': true,
        'active': this.active,
        'ma-card--positive': this.data.status === 'onWay',
        'ma-card--info': this.data.status === 'started',
        'ma-card--warning': this.data.status === 'near',
      };
    },
  },
  watch: {
    cardActive(newCardActive) {
      this.active = this.cardIndex === newCardActive;
    },
  },
  methods: {
    onCardMouseover() {
      this.showReloadBtn = true;
    },
    onCardMouseleave() {
      this.showReloadBtn = false;
    },
    onCardClick() {
      const startLat = this.data.start.pickup_location.coordinates[1];
      const startLng = this.data.start.pickup_location.coordinates[0];
      const endLat = this.data.end.pickup_location.coordinates[1];
      const endLng = this.data.end.pickup_location.coordinates[0];
      const waypointLat = this.data.driver_location.coordinates[1];
      const waypointLng = this.data.driver_location.coordinates[0];
      this.$emit('drive-changed', this.cardIndex,
        { start:
          { lat: startLat, lng: startLng },
          end:
          { lat: endLat, lng: endLng },
          waypoint:
          { lat: waypointLat, lng: waypointLng }
        });
      this.onReloadClick();
      this.active = this.cardIndex === this.cardActive;
    },
    onReloadClick() {
      // NOTE: Simulate reloading data
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 3000);
    }
  },
};
</script>
