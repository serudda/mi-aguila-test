<!-- Template -->
<template>
  <div class="pt-lg-3 pl-lg-3 pr-lg-3" v-cloak>
    <drive-view></drive-view>
  </div>
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
