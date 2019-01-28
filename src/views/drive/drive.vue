<!-- Template -->
<template>
  <div class="drive-view">
    <div class="map-section">
      <ma-map
        name="routes"
        :card-index="cardClicked"
        :origin-coord="originCoord"
        :destination-coord="destinationCoord"
        :waypoint-coord="waypointCoord"
        @estimated-time="getEstimatedTime"></ma-map>
    </div>
    <div class="drives-section px-5">
      <div class="title d-flex align-items-center mb-3">
        <h3 class="color-silver m-0 mr-4">
          Routes
        </h3>
        <div class="help-text mr-3">
          <span class="icon ma-bg-info mr-2"></span>
          <span class="color-silver font-size-sm">Started</span>
        </div>
        <div class="help-text mr-3">
          <span class="icon ma-bg-warning mr-2"></span>
          <span class="color-silver font-size-sm">Near</span>
        </div>
        <div class="help-text">
          <span class="icon ma-bg-positive mr-2"></span>
          <span class="color-silver font-size-sm">On way</span>
        </div>
      </div>
      <ma-card
        v-for="(drive, index) in drives"
        :key="index"
        :card-index="index"
        :data="drive"
        :estimated-time="estimatedTimes[index]"
        @drive-changed="changeDrive"
        class="mb-4">
      </ma-card>
    </div>
  </div>
</template>

<!-- Script -->
<script>
import Vue from 'vue';
import './drive.scss';

import driveService from './drive_service';

import card from '../../components/card/card.vue';
import map from '../../components/map/map.vue';

export default {
  name: 'drive-view',
  components: {
    'ma-card': card,
    'ma-map': map,
  },
  data() {
    return {
      drives: [],
      originCoord: {lat: 4.6633728, lng: -74.0522469},
      destinationCoord: {lat: 4.7432147, lng: -74.0404901},
      waypointCoord: {lat: 4.7432147, lng: -74.0404901},
      estimatedTimes: [],
      cardClicked: 0,
    };
  },
  beforeMount() {
    driveService.getDrives().then((data) => {
      this.init(data);
    }).catch((error) => {
      console.log(error);
    });
  },
  methods: {
    init(data) {
      // Init drive props
      this.drives = data;
    },
    changeDrive(id, { start, end, waypoint }) {
      this.originCoord = start;
      this.destinationCoord = end;
      this.waypointCoord = waypoint;
      this.cardClicked = id;
    },
    getEstimatedTime(id, time = 0) {
      //NOTE: This was needed since I need to re render the component.
      Vue.set(this.estimatedTimes, id, time);
    }
  },
};
</script>
