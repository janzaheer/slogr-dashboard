<template>
  
    <div id="map">

      <div class="position-absolute top-0 start-0 p-2 bg-info">

<div class="card bg-secondary">
  <div class="card-body">
<h6 class="card-title">Legend</h6>
<p class="card">asdasd</p>
  </div>
</div>
      </div>
    </div>
    
</template>

<script>
import Header from './common/Header.vue';
import mapboxgl from "mapbox-gl";

export default{
    name: 'Home',
    components:{
        Header
    },
    data() {
      return {
        accessToken: 'pk.eyJ1Ijoicmh3b3JrcyIsImEiOiJjazBmZmE0bGIwNzh3M25wMjBhOHI2em56In0.317s4zEB48T9QC33pf6sVw#13'
      }
    },
    mounted() {
    mapboxgl.accessToken = this.accessToken;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v11',
      center: [103.811279, 1.345399],
      zoom: 9,
    });

    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, "bottom-right");

    const marker = new mapboxgl.Marker()
    .setLngLat([103.811279, 1.345399])
    .addTo(map);

    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    });

    map.addControl(geolocate, "bottom-right")

    map.setProjection('Mercator');
  },
}
</script>

<style scoped>
#map {width: 100%; height: 90%; position: absolute;}

.map {
  position: relative;
  background-color: #c2c8ca;
  width: 100%;
  height: 1115px;
  overflow: hidden;
  text-align: left;
  font-size: var(--font-size-base);
  color: var(--color-black);
  font-family: var(--font-inter);
}
.screenshot20210522At336 {
  position: absolute;
   top: 1px;
  /* left: 156px; */
  width: 1920px;
  height: 1027px;
  object-fit: cover;
}
.addIcon {
  position: absolute;
  height: 9.66%;
  width: 5.61%;
  top: 10.76%;
  right: 1.74%;
  bottom: 79.58%;
  left: 92.66%;
  max-width: 100%;
  overflow: hidden;
  max-height: 100%;
}
.mapInner {
  position: absolute;
  top: 100px;
  left: 142px;
  width: 1330px;
  height: 900.43px;
}
</style>