import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    light: false,
    dark: true,
    themes: {
      dark: {
        primary: '#2f93ad',
        secondary: '#ffffff',
        accent: '#ff2715',

        qteal: '#2ac8e8',
        qwhite: '#bfc8cf'
      },
    },
  },
});
