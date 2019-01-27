<!-- Template -->
<template>
  <div class="ma-map h-100">
    <div :ref="mapName" :id="mapName" class="h-100"></div>
  </div>
</template>

<!-- Script -->
<script>
import './map.scss';
import markerStartIcon from '../../assets/pin-start.svg';
import markerEndIcon from '../../assets/pin-end.svg';
import markerWaypointIcon from '../../assets/pin-waypoint.svg';

export default {
  name: 'ma-map',
  props: {
    name: {
      type: String,
    },
    originCoord: {
      type: Object,
    },
    destinationCoord: {
      type: Object,
    },
    waypointCoord: {
      type: Object,
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
      directionsDisplay: null,
    };
  },
  watch: {
    originCoord(newOriginCoord, oldOriginCoord) {
      if(newOriginCoord === oldOriginCoord) { return; }
      this.calculateAndDisplayRoute(this.directionsService, this.directionsDisplay);
    },
    destinationCoord(newDestinationCoord, oldDestinationCoord) {
      if(newDestinationCoord === oldDestinationCoord) { return; }
      this.calculateAndDisplayRoute(this.directionsService, this.directionsDisplay);
    },
    waypointCoord(newWaypointCoord, oldWaypointCoord) {
      if(newWaypointCoord === oldWaypointCoord) { return; }
      this.calculateAndDisplayRoute(this.directionsService, this.directionsDisplay);
    },
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      const element = this.$refs[this.mapName];
      this.directionsService = new google.maps.DirectionsService();
      this.directionsDisplay = new google.maps.DirectionsRenderer({
        polylineOptions: {
          strokeColor: '#3C4858'
        },
        suppressMarkers: true
      });
      const origin = new google.maps.LatLng(this.originCoord.lat, this.originCoord.lng);
      const options = {
        zoom: this.defaultZoom,
        center: origin,
        mapTypeControl: false,
        streetViewControl: false,
        zoomControlOptions: {
          position: google.maps.ControlPosition.LEFT,
        },
      };

      // Init map instance
      this.map = new google.maps.Map(element, options);
      this.directionsDisplay.setMap(this.map);
      this.calculateAndDisplayRoute(this.directionsService, this.directionsDisplay);
    },

    calculateAndDisplayRoute(directionsService, directionsDisplay) {
      const origin = new google.maps.LatLng(this.originCoord.lat, this.originCoord.lng);
      const destination = new google.maps.LatLng(this.destinationCoord.lat, this.destinationCoord.lng);
      const waypoint = new google.maps.LatLng(this.waypointCoord.lat, this.waypointCoord.lng);

      directionsService.route({
        origin,
        destination,
        waypoints: [{ location: waypoint }],
        optimizeWaypoints: true,
        travelMode: 'DRIVING',
      }, (response, status) => {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
          this.clearMarkers();
          const {start, end, current} = this.createMarkerImage();
          this.makeMarker( origin, start);
          this.makeMarker( destination, end);
          this.makeMarker( waypoint, current);
        } else {
          console.log(`Directions request failed due to ${status}`);
        }
      });
    },

    createMarkerImage() {
      return {
        start: new google.maps.MarkerImage(markerStartIcon),
        end: new google.maps.MarkerImage(markerEndIcon),
        current: new google.maps.MarkerImage(markerWaypointIcon)
      };
    },

    makeMarker(position, icon, title = '') {
      const marker = new google.maps.Marker({
        position,
        map: this.map,
        icon,
        title
      });
      this.markers.push(marker);
    },

    clearMarkers() {
      this.markers.forEach(marker => {
        marker.setMap(null);
      });
    },
  },
};
</script>
