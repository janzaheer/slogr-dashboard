<template>
  <div id="map">
  </div>
  <div class="position-relative bg-secondary mt-md-2 ms-md-3 opacity-75">
    <div class="position-absolute p-2">
      <div class="card bg-light" style="width: 190px; height: 180px;">
        <div class="card-body">
          <h6 class="card-title mb-0">Legend</h6>
          <hr class="hr1">
          <div class="d-flex justify-content-between align-items-center">
            <label class="form-check-label" for="flexSwitchCheckDefault">Group 1</label>
            <div class="form-check form-switch">
              <input class="form-check-input fs-4" type="checkbox" role="switch" id="flexSwitchCheckDefault">
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-center my-2 my-lg-1">
            <label class="form-check-label" for="flexSwitchCheckDefault2">Group 2</label>
            <div class="form-check form-switch">
              <input class="form-check-input fs-4" type="checkbox" role="switch" id="flexSwitchCheckDefault2">
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <label class="form-check-label" for="flexSwitchCheckDefault3">Group 3</label>
            <div class="form-check form-switch mb-0">
              <input class="form-check-input fs-4" type="checkbox" role="switch" id="flexSwitchCheckDefault3">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="position-relative bg-secondary mt-md-3 ms-md-3 opacity-75" style="width: 190px; top: 190px;">
    <div class="position-absolute p-2">
      <div class="card bg-light" style="width: 190px; height: 290px;">
        <div class="card-body">
          <h6 class="card-title mb-0">Monitoring Profile</h6>
          <hr class="hr1">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <span class="" style="font-size: 14px;">Monitoring</span>
              <label class="form-check-label" for="flexSwitchCheckDefault4">Profile 01</label>
            </div>
            <div class="form-check form-switch">
              <input class="form-check-input fs-4" type="checkbox" role="switch" id="flexSwitchCheckDefault4">
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-center my-2 my-lg-1">
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
          <hr class="hr1">
            <h6 class="my-1">Monitoring</h6>
          <span><i class="fa-solid fa-gear" style="color: var(--primary_color); margin-top: 5px;"></i> Profile
            Setting</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from './common/Header.vue';
import mapboxgl from 'mapbox-gl';
import supercluster from 'supercluster';

export default {
  mounted() {
    mapboxgl.accessToken = 'pk.eyJ1Ijoicmh3b3JrcyIsImEiOiJjazBmZmE0bGIwNzh3M25wMjBhOHI2em56In0.317s4zEB48T9QC33pf6sVw#13';
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-98.5795, 39.8283],
      zoom: 4
    });
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, "bottom-right");
    
    map.on('load', () => {
      // Add a new source from our GeoJSON data and
      // set the 'cluster' option to true. GL-JS will
      // add the point_count property to your source data.
      map.addSource('earthquakes', {
        type: 'geojson',
        // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
        // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
        data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
      });
      
      map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'earthquakes',
        filter: ['has', 'point_count'],
          paint: {
          // Use step expressions (https://docs.mapbox.com/style-spec/reference/expressions/#step)
          // with three steps to implement three types of circles:
          //   * Blue, 20px circles when point count is less than 100
          //   * Yellow, 30px circles when point count is between 100 and 750
          //   * Pink, 40px circles when point count is greater than or equal to 750
          'circle-color': [
          'step',
          ['get', 'point_count'],
          '#8cb63d',
          100,
          '#f1f075',
          750,
          '#f28cb1'
          ],
          'circle-radius': [
              'step',
              ['get', 'point_count'],
              20,
              100,
              30,
              750,
              40
            ]
          }
      });
      
      map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'earthquakes',
        filter: ['has', 'point_count'],
        layout: {
        'text-field': ['get', 'point_count_abbreviated'],
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 12
        }
      });
      
      map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'earthquakes',
        filter: ['!', ['has', 'point_count']],
        paint: {
        'circle-color': '#11b4da',
        'circle-radius': 4,
        'circle-stroke-width': 1,
        'circle-stroke-color': '#fff'
        }
      });
      
      // inspect a cluster on click
      map.on('click', 'clusters', (e) => {
        const features = map.queryRenderedFeatures(e.point, {
        layers: ['clusters']
      });
      const clusterId = features[0].properties.cluster_id;
        map.getSource('earthquakes').getClusterExpansionZoom(
          clusterId,
          (err, zoom) => {
            if (err) return;
            
            map.easeTo({
              center: features[0].geometry.coordinates,
              zoom: zoom
              });
            }
        );
      });
      
      
      map.on('mouseenter', 'clusters', () => {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'clusters', () => {
        map.getCanvas().style.cursor = '';
        });
      });
      map.setProjection('Mercator');
  }
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
.hr1 {
    margin: 0.6rem 0;
    color: inherit;
    border: 0;
    border-top: var(--bs-border-width) solid;
    opacity: 0.25;
}
</style>