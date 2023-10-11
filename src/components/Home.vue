<template>
  <div id="map">
  </div>
  <div class="position-relative bg-secondary mt-md-5 ms-md-3 opacity-75">
    <div class="position-absolute p-2">
      <div class="card bg-light" style="width: 200px; height: 220px;">
        <div class="card-body">
          <h6 class="card-title mb-0">Legend</h6>
          <hr>
          <div class="d-flex justify-content-between align-items-center">
            <label class="form-check-label" for="flexSwitchCheckDefault">Group 1</label>
            <div class="form-check form-switch">
              <input class="form-check-input fs-4" type="checkbox" role="switch" id="flexSwitchCheckDefault">
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-center my-3">
            <label class="form-check-label" for="flexSwitchCheckDefault2">Group 2</label>
            <div class="form-check form-switch">
              <input class="form-check-input fs-4" type="checkbox" role="switch" id="flexSwitchCheckDefault2">
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <label class="form-check-label" for="flexSwitchCheckDefault3">Group 3</label>
            <div class="form-check form-switch">
              <input class="form-check-input fs-4" type="checkbox" role="switch" id="flexSwitchCheckDefault3">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="position-relative bg-secondary mt-md-3 ms-md-3 opacity-75" style="width: 200px; top: 250px;">
    <div class="position-absolute p-2">
      <div class="card bg-light" style="width: 200px; height: 350px;">
        <div class="card-body">
          <h6 class="card-title mb-0">Monitoring Profile</h6>
          <hr>
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <span class="" style="font-size: 14px;">Monitoring</span>
              <label class="form-check-label" for="flexSwitchCheckDefault4">Profile 01</label>
            </div>
            <div class="form-check form-switch">
              <input class="form-check-input fs-4" type="checkbox" role="switch" id="flexSwitchCheckDefault4">
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-center my-3">
            <div>
              <span class="" style="font-size: 14px;">Monitoring</span>
              <label class="form-check-label" for="flexSwitchCheckDefault5">Profile 02</label>
            </div>
            <div class="form-check form-switch">
              <input class="form-check-input fs-4" type="checkbox" role="switch" id="flexSwitchCheckDefault5">
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <span class="" style="font-size: 14px;">Monitoring</span>
              <label class="form-check-label" for="flexSwitchCheckDefault6">Profile 03</label>
            </div>
            <div class="form-check form-switch">
              <input class="form-check-input fs-4" type="checkbox" role="switch" id="flexSwitchCheckDefault6">
            </div>
          </div>
          <hr>
          <div>
            <h6 class="card-title my-3">Monitoring</h6>

          </div>
          <span><i class="fa-solid fa-gear" style="color: var(--primary_color); margin-top: 12px;"></i> Profile
            Setting</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './common/Header.vue';
import mapboxgl from "mapbox-gl";

export default {
  name: 'Home',
  components: {
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
#map {
  width: 100%;
  height: 90%;
  position: absolute;
}

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