<template>
  <div id="map">
  </div>
  <!-- Pop-up element for no connections message -->
  <div id="no-connections-popup" class="popup">
    <p>No connections available</p>
  </div>
  <div id="loader" class="loader">Loading...</div>
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
          <div class="d-flex justify-content-between align-items-center">
            <label class="form-check-label" for="flexSwitchCheckDefault3">Clear Connections</label>
            <div class="form-check form-switch mb-0">
              <button @click="clearLines">Clear Lines</button>
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
import * as turf from '@turf/turf';
import { fetchClusters, fetchSessions, fetchAgentlinks } from '../services/agent_services';

export default {
  data() {
    return {
      map: null,
    };
  },
  async mounted() {
    var clusters = await this.handleClusters();
    var sessions = await this.handleSessions();
    mapboxgl.accessToken = 'pk.eyJ1Ijoicmh3b3JrcyIsImEiOiJjazBmZmE0bGIwNzh3M25wMjBhOHI2em56In0.317s4zEB48T9QC33pf6sVw#13';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v11',
      center: [0, 20],
      zoom: 2,
    });
    const nav = new mapboxgl.NavigationControl();
    this.map.addControl(nav, "bottom-right");
    
    this.map.on('load', () => {
      // Add a new source from our GeoJSON data and
      // set the 'cluster' option to true. GL-JS will
      // add the point_count property to your source data.
      this.map.addSource('earthquakes', {
        type: 'geojson',
        // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
        // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
        data: clusters,
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
      });
      
      this.map.addLayer({
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
      
      this.map.addLayer({
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
      
      this.map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'earthquakes',
        filter: ['!', ['has', 'point_count']],
        paint: {
        'circle-color': '#11b4da',
        'circle-radius': 8,
        'circle-stroke-width': 3,
        'circle-stroke-color': '#fff'
        }
      });
      
      // inspect a cluster on click
      this.map.on('click', 'clusters', (e) => {
        const features = this.map.queryRenderedFeatures(e.point, {
        layers: ['clusters']
      });
      const clusterId = features[0].properties.cluster_id;
      this.map.getSource('earthquakes').getClusterExpansionZoom(
          clusterId,
          (err, zoom) => {
            if (err) return;
            
            this.map.easeTo({
              center: features[0].geometry.coordinates,
              zoom: zoom
              });
            }
        );
      });
      this.map.on('click', 'unclustered-point', async (e) => {
        this.map.getCanvas().style.cursor = 'pointer';
        const markerId = e.features[0].properties.id;
        const agentLinks = await this.handleAgentlinks(markerId);
        console.log('Links', agentLinks);

        const popupElement = document.getElementById('no-connections-popup');
        const loader = document.getElementById('loader');

        // Show the loader while waiting for the asynchronous action
        loader.style.display = 'block';

        // Hide the loader and show the popup (if needed) after 2 seconds
        setTimeout(() => {
          loader.style.display = 'none';
          if (agentLinks.length === 0) {
            popupElement.style.left = e.point.x + 'px';
            popupElement.style.top = e.point.y + 'px';
            popupElement.style.display = 'block';
            setTimeout(() => {
              popupElement.style.display = 'none';
            }, 1000);
          } else {
            popupElement.style.display = 'none';
            this.drawLines(this.map, agentLinks);
          }
        }, 1000);
      });


      this.map.on('mouseenter', 'clusters', () => {
        this.map.getCanvas().style.cursor = 'pointer';
      });
      this.map.on('mouseleave', 'clusters', () => {
        this.map.getCanvas().style.cursor = '';
      });
      
      // When a marker is clicked, call displayConnections
      this.map.on('click', 'markers', (e) => {
        const markerCoordinates = e.features[0].geometry.coordinates;
        const markerId = e.features[0].properties.id;

        // Find connections for the clicked marker using markerId
        const connections = sessions.filter((session) => session.from === markerId);

        if (connections.length > 0) {
          // If there are connections, display them
          this.displayConnections(markerCoordinates, connections);
        }
      });
    });
    this.map.setProjection('Mercator');
  },
  methods: {
    async handleClusters() {
      const respData = await fetchClusters();
      return respData;
    },
    async handleSessions() {
      const respData = await fetchSessions();
      return respData;
    },
    async handleAgentlinks(id) {
      const respData = await fetchAgentlinks(id);
      return respData;
    },
    drawLines(map, lines) {
      lines.forEach((line, index) => {
        const uniqueId = `line-${Date.now()}-${index}`;

        // Create a Bezier spline from the original line coordinates
        const curvedLine = turf.bezierSpline({
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: line.coordinates,
          },
        });

        map.addLayer({
          id: uniqueId,
          type: 'line',
          source: {
            type: 'geojson',
            data: curvedLine,
          },
          paint: {
            'line-color': line.color,
            'line-width': 2, // Adjust the line width as needed
          },
        });

        // Add hover and mouse leave event listeners
        map.on('mouseenter', uniqueId, (e) => {
          this.handleLineHover(e);
        });
        map.on('mouseleave', uniqueId, (e) => {
          this.resetLineHover(e);
        });
      });
    },
    clearLines() {
      const map = this.map;

      // Iterate through the layers to find and remove layers with 'line-' prefix
      map.getStyle().layers.forEach((layer) => {
        if (layer.id.startsWith('line-')) {
          map.removeLayer(layer.id);
        }
      });
    },
    handleLineHover(e) {
      const map = this.map;
      const lineId = e.features[0].layer.id;

      // Change the line color when hovering (you can customize the effect as needed)
      map.setPaintProperty(lineId, '#11b4da', 'white');
    },
    resetLineHover(e) {
      const map = this.map;
      const lineId = e.features[0].layer.id;
      // Reset the line color to its original color when the mouse leaves
      map.setPaintProperty(lineId, '#11b4da', 'white');
    }
  },
};
</script>


<style scoped>
#map {
width: 100%;
height: 90%;
position: absolute;
}
.popup {
  position: absolute;
  background: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 4px;
  z-index: 10;
  display: none;
}
#loader {
  display: none; /* Initially hide the loader */
  position: fixed;
  top: 50%;
  left: 50%;
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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