<!-- Template -->
<template>
  <div class="drive-view">
    <ma-map></ma-map>
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
        :data="drive"
        class="mb-3">
      </ma-card>
    </div>
  </div>
</template>

<!-- Script -->
<script>
import './drive.scss';

import driveService from './drive_service';

import card from '../../components/card/card';
import map from '../../components/map/map';

export default {
  name: 'drive-view',
  components: {
    'ma-card': card,
    'ma-map': map
  },
  data() {
    return {
      drives: [],
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
  },
};
</script>
