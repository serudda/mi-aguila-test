<!-- Template -->
<template>
  <drive-view></drive-view>
</template>


<!-- Script -->
<script>
import driveView from './views/drive/drive.vue';

export default {
  name: 'app',
  components: {
    'drive-view': driveView,
  },
  data() {
    return {
    };
  },
};
</script>
