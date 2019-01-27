module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import '~bootstrap/scss/functions';
          @import '~bootstrap/scss/variables';
          @import '~bootstrap/scss/mixins';
          @import '~bootstrap/scss/utilities';

          @import './src/theme/core/global';
          @import './src/theme/core/helper';`,
      },
    },
  },
};
