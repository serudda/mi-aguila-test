<!-- Template -->
<template>
  <div class="drive-view">
    <ma-map></ma-map>
    <div style="padding-top: 300px;" class="px-5">
      <div>
        <h3 class="color-silver m-0 mb-3">
          Routes
        </h3>
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
