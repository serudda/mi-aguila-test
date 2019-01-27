<! Template >
<template>
  <div class="ma-map h-100">
    <div :ref="mapName" :id="mapName" class="h-100"></div>
  </div>
</template>

<! Script >
<script>
  import './map.scss';
  import { Promise } from 'es6-promise';

  //import pinImage from 'images/pin.png';

  export default {
    name: 'ma-map',
    props: {
      name: {
        type: String
      },
      originCoord: {
        type: Object
      },
      destinationCoord: {
        type: Object
      }
    },
    data() {
      return {
        defaultZoom: 16,
        mapName: `${this.name}-map`,
        map: null,
        marker: null,
        markers: [],
        directionsService: null,
        directionsDisplay: null
      }
    },
    watch: {
      originCoord(newOriginCoord, oldOriginCoord) {
        if(newOriginCoord === oldOriginCoord) { return; }
        this.calculateAndDisplayRoute(this.directionsService, this.directionsDisplay);
      },
      destinationCoord(newDestinationCoord, oldDestinationCoord) {
        if(newDestinationCoord === oldDestinationCoord) { return; }
        this.calculateAndDisplayRoute(this.directionsService, this.directionsDisplay);
      }
    },
    mounted() {
      this.initMap();
    },
    methods: {
      initMap() {
        const element = this.$refs[this.mapName];
        this.directionsService = new google.maps.DirectionsService();
        this.directionsDisplay = new google.maps.DirectionsRenderer();
        const origin = new google.maps.LatLng(this.originCoord.lat, this.originCoord.lng);
        const options = {
          zoom: this.defaultZoom,
          center: origin,
          mapTypeControl: false,
          streetViewControl: false,
          zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT
          }
        };
        // Init map instance
        this.map = new google.maps.Map(element, options);
        this.directionsDisplay.setMap(this.map);
        this.calculateAndDisplayRoute(this.directionsService, this.directionsDisplay);
      },

      calculateAndDisplayRoute(directionsService, directionsDisplay) {
        const origin = new google.maps.LatLng(this.originCoord.lat, this.originCoord.lng);
        const destination = new google.maps.LatLng(this.destinationCoord.lat, this.destinationCoord.lng);
        directionsService.route({
          origin,
          destination,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }
    }
  }
</script>
