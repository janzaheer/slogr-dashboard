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
          <!-- Use v-for to iterate over the groups -->
          <div v-for="group in groups" :key="group.id" class="d-flex justify-content-between align-items-center">
            <label class="form-check-label" :for="'flexSwitchCheckDefault_' + group.id">{{ group.name }}</label>
            <div class="form-check form-switch">
              <!-- <input class="form-check-input fs-4" type="checkbox" role="switch" :id="'flexSwitchCheckDefault_' + group.id" @change="handleToggleGroup(group.id)"> -->
              <input class="form-check-input fs-4" type="checkbox" role="switch" :id="'flexSwitchCheckDefault_' + group.id" v-model="groupSwitches[group.id]" @change="handleToggleGroup(group.id, groupSwitches[group.id])">
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
import { fetchClusters, fetchSessions, fetchAgentlinks, fetchGroups } from '../services/agent_services';

export default {
  data() {
    return {
      map: null,
      groups: [],
      clusters: [],
      groupSwitches: {},
      activeGroups: [],
    };
  },
  async mounted() {
    this.handleToggleGroup = this.handleToggleGroup.bind(this);
    var clusters = await this.handleClusters('');
    var sessions = await this.handleSessions('');
    mapboxgl.accessToken = 'pk.eyJ1Ijoicmh3b3JrcyIsImEiOiJjazBmZmE0bGIwNzh3M25wMjBhOHI2em56In0.317s4zEB48T9QC33pf6sVw#13';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v11',
      center: [0, 20],
      zoom: 2,
    });
    const nav = new mapboxgl.NavigationControl();
    this.map.addControl(nav, "bottom-right");
    this.handleGroups();
    this.map.on('load', () => {
      this.showClusters(clusters);
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
    async handleToggleGroup(groupId, switchValue) {
  console.log('Toggled group with ID:', groupId);
  const loader = document.getElementById('loader');
  loader.style.display = 'block';

  // Update the list of active groups based on the switch state
  if (switchValue) {
    this.activeGroups.push(groupId);
  } else {
    // Remove the group from the list of active groups
    const index = this.activeGroups.indexOf(groupId);
    if (index !== -1) {
      this.activeGroups.splice(index, 1);
    }
  }


  // Clear all layers and sources
  this.clearAll();

  // Show clusters and draw lines for each active group
  for (const activeGroup of this.activeGroups) {
    await this.showClusters(activeGroup, await this.handleClusters(activeGroup));
    this.drawLines(this.map, await this.handleSessions(activeGroup));
  }

  loader.style.display = 'none';
},
async handleClusters(groupId) {
  try {
    const respData = await fetchClusters(groupId);

    // Check if the fetched data is a valid GeoJSON object
    if (!respData || !respData.features || !Array.isArray(respData.features)) {
      console.error('Invalid clusters data:', respData);
      return null; // Return null or handle the error accordingly
    }

    return respData;
  } catch (error) {
    console.error('Error fetching clusters:', error);
    return null; // Return null or handle the error accordingly
  }
},
    async handleSessions(groupId) {
      const respData = await fetchSessions(groupId);
      return respData;
    },
    async handleAgentlinks(id) {
      const respData = await fetchAgentlinks(id);
      return respData;
    },
    async handleGroups() {
      try {
        const response = await fetchGroups();
        this.groups = response;
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    },
    showClusters(clusters, groupId) {
  // Use a unique source ID for each group
  const sourceId = `earthquakes-${groupId}`;

  // Remove existing source and layers if they exist
  if (this.map.getSource(sourceId)) {
    this.map.removeLayer(`clusters-${groupId}`);
    this.map.removeLayer(`cluster-count-${groupId}`);
    this.map.removeLayer(`unclustered-point-${groupId}`);
    this.map.removeSource(sourceId);
  }

  // Ensure clusters is a valid GeoJSON object
  if (!clusters || !clusters.features || !Array.isArray(clusters.features)) {
    console.error('Invalid clusters data:', clusters);
    return;
  }

  // Add a new source from our GeoJSON data and set the 'cluster' option to true.
  // GL-JS will add the point_count property to your source data.
  this.map.addSource(sourceId, {
    type: 'geojson',
    data: clusters,
    cluster: true,
    clusterMaxZoom: 14,
    clusterRadius: 50,
  });

  this.map.addLayer({
    id: `clusters-${groupId}`,
    type: 'circle',
    source: sourceId,
    filter: ['has', 'point_count'],
    paint: {
      'circle-color': [
        'step',
        ['get', 'point_count'],
        '#8cb63d',
        100,
        '#f1f075',
        750,
        '#f28cb1',
      ],
      'circle-radius': [
        'step',
        ['get', 'point_count'],
        20,
        100,
        30,
        750,
        40,
      ],
    },
  });

  this.map.addLayer({
    id: `cluster-count-${groupId}`,
    type: 'symbol',
    source: sourceId,
    filter: ['has', 'point_count'],
    layout: {
      'text-field': ['get', 'point_count_abbreviated'],
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 12,
    },
  });

  // Add unclustered points layer with dynamically set colors
  this.map.addLayer({
    id: `unclustered-point-${groupId}`,
    type: 'circle',
    source: sourceId,
    filter: ['!', ['has', 'point_count']],
    paint: {
      'circle-color': [
        'match',
        ['get', 'organization'],
        'GCP', '#8cb63d',
        'AZURE', '#f1f075',
        '#f28cb1',
      ],
      'circle-radius': 8,
      'circle-stroke-width': 3,
      'circle-stroke-color': '#fff',
    },
  });
},

    getColor(organization) {
      // Add your logic here to determine the color based on the organization
      // For example, you can use a switch statement or if-else conditions
      console.log(organization);
      switch (organization) {
        case 'GCP':
          return '#8cb63d'; // Green
        case 'AZURE':
          return '#f1f075'; // Yellow
        default:
          return '#f28cb1'; // Default color
      }
    },
    drawLines(map, lines) {
  // Check if lines is an object with a features array
  if (lines && lines.features && Array.isArray(lines.features)) {
    // Extract the array of lines from the features property
    lines = lines.features;
  } else {
    console.error('Invalid lines data:', lines);
    return;
  }

  lines.forEach((line, index) => {
    const uniqueId = `line-${Date.now()}-${index}`;

    // Create a Bezier spline from the original line coordinates
    const curvedLine = turf.bezierSpline({
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: line.geometry.coordinates,
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
        'line-color': line.properties.color,
        'line-width': 1, // Adjust the line width as needed
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
    clearAll() {
  const map = this.map;

  // Remove cluster layers and associated cluster count layers
  this.activeGroups.forEach((groupId) => {
    // Remove cluster layers
    map.removeLayer(`clusters-${groupId}`);
    map.removeLayer(`cluster-count-${groupId}`);
    
    // Remove unclustered-point layer
    const unclusteredLayerId = `unclustered-point-${groupId}`;
    if (map.getLayer(unclusteredLayerId)) {
      map.removeLayer(unclusteredLayerId);
    }

    // Remove cluster sources
    const sourceId = `earthquakes-${groupId}`;
    if (map.getSource(sourceId)) {
      map.removeSource(sourceId);
    }

    // Remove cluster count layer (if exists for the group)
    const clusterCountLayer = map.getLayer(`cluster-count-${groupId}`);
    if (clusterCountLayer) {
      map.removeLayer(`cluster-count-${groupId}`);
    }
  });

  // Remove connection layers
  map.getStyle().layers.forEach((layer) => {
    if (layer.id.startsWith('line-')) {
      map.removeLayer(layer.id);
    }
  });

  // Remove cluster count layer (if exists globally)
  const globalClusterCountLayer = map.getLayer('cluster-count');
  if (globalClusterCountLayer) {
    map.removeLayer('cluster-count');
  }

      // // Remove cluster sources
      // ['earthquakes'].forEach((source) => {
      //   if (map.getSource(source)) {
      //     map.removeSource(source);
      //   }
      // });
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