<!-- Template -->
<template>
  <div class="drive-view">
    {{ drives }}
  </div>
</template>

<!-- Script -->
<script>
import './drive.scss';

import driveService from './drive_service';

export default {
  name: 'drive-view',
  components: {},
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
