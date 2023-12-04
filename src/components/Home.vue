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
      <div class="card bg-light" style="width: 190px; height: 200px;">
        <div class="card-body">
          <h6 class="card-title mb-0">Legend</h6>
          <hr class="hr1">
          <perfect-scrollbar style="height: 100px;">
            <!-- Use v-for to iterate over the groups -->
            <div class="text-center m-2" v-if="loading">
              <VueSpinner size="60" color="#8cb63d" />
            </div>
            <div v-else>
              <div v-for="group in groups" :key="group.id" class="d-flex justify-content-between align-items-center">
                <label class="form-check-label" :for="'flexSwitchCheckDefault_' + group.id">{{ group.name }}</label>
                <div class="form-check form-switch">
                  <input class="form-check-input fs-5" type="checkbox" role="switch"
                    :id="'flexSwitchCheckDefault_' + group.id" v-model="groupSwitches[group.id]"
                    @change="handleToggleGroup(group.id, groupSwitches[group.id])">
                </div>
              </div>
            </div>
          </perfect-scrollbar>
          <hr class="hr">
          <div class="d-flex justify-content-between align-items-center">
            <label class="form-check-label" @click="clearLines">Clear Connections</label>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="position-relative bg-secondary mt-md-4 ms-md-3 opacity-75" style="width: 190px; top: 190px;">
    <div class="position-absolute p-2">
      <div class="card bg-light" style="width: 190px; height: 290px;">
        <div class="card-body">
          <h6 class="card-title mb-0">Monitoring Profile</h6>
          <hr class="hr1">
          <perfect-scrollbar style="height: 150px;">
            <div class="text-center m-2" v-if="loading">
              <VueSpinner size="60" color="#8cb63d" />
            </div>
            <div v-else>
              <div v-for="profile in profiles" :key="profile.id" class="d-flex justify-content-between align-items-center">
                <label class="form-check-label" :for="'profileDefault' + profile.id">{{ profile.name }}</label>
                <div class="form-check form-switch">
                  <input class="form-check-input fs-5" type="checkbox" role="switch" v-model="profileSwitches[profile.id]"
                    :id="'profileDefault' + profile.id" @change="handleProfileToggle(profile.id, profile.name)">
                </div>
              </div>
            </div>
          </perfect-scrollbar>
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
import { VueSpinner } from 'vue3-spinners';
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import mapboxgl from 'mapbox-gl';
import { fetchClusters, fetchAgentlinks, fetchGroups, fetchGroupData, fetchClustersData } from '../services/agent_services';
import {ProfileList} from '../services/monitor_profile_Services'

export default {
  data() {
    return {
      map: null,
      groups: [],
      groupdata: {},
      clusterdata: {},
      clusters: [],
      groupSwitches: {},
      profileSwitches: {},
      profileSwitchesData: {},
      profiles: null,
      loading: false,
      initialGroupGeoJsonData: {}
    };
  },
  components: {
    PerfectScrollbar,
    VueSpinner
  },
  async mounted() {

    var clusters = await this.handleClusters('');
    var sessions = await this.handleSessions('');
    mapboxgl.accessToken = 'pk.eyJ1Ijoicmh3b3JrcyIsImEiOiJjazBmZmE0bGIwNzh3M25wMjBhOHI2em56In0.317s4zEB48T9QC33pf6sVw#13';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v11',
      center: [0, 20],
      zoom: 1.8,
      minZoom: 1.8
    });

    const nav = new mapboxgl.NavigationControl();
    this.map.addControl(nav, "bottom-right");


    this.handleGroups();
    this.handleProfiles();
    this.handleClusterData();
    this.handleGroupData();



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

      let popup = new mapboxgl.Popup({ offset: [0, -15] });
      this.map.on('mouseenter', 'clusters', async (e) => {
        const features = this.map.queryRenderedFeatures(e.point, {
          layers: ['clusters']
        });

        if (features.length > 0) {
          var clusterId = features[0].properties.cluster_id;
          let clusterPointCount = features[0].properties.point_count

          let map = this.map
          var allPointsInCluster = [];
          async function getAllSubChildPoints(clusterId, callback) {
            function querySubCluster(subClusterId) {
              map.getSource('earthquakes').getClusterChildren(subClusterId, function (err, features) {
                if (err) return callback(err);

                features.forEach(async function (feature) {
                  if (feature.properties.cluster) {
                      // If it's another cluster, recursively query its children
                      await querySubCluster(feature.properties.cluster_id);
                  } else {
                      // If it's a point, add it to the list
                      allPointsInCluster.push(feature);
                  }
                });

                if (features.length === 0) {
                    // No more features in the current sub-cluster, callback with the result
                    callback(null, allPointsInCluster);
                }

                if (allPointsInCluster.length === clusterPointCount) {
                  let subPropObj = {}
                  allPointsInCluster.forEach(function (sub) {
                    if (!subPropObj[sub.properties.organization]) {
                      subPropObj[sub.properties.organization] = 1
                    } else {
                      subPropObj[sub.properties.organization] += 1
                    }
                  })

                  let nodesCount = '';
                  for (const [key, value] of Object.entries(subPropObj)) {
                    nodesCount += `<p>${key}: ${value}</p>`
                  }

                  popup.setLngLat(features[0].geometry.coordinates)
                  .setHTML(`<h5>Cluster nodes: ${clusterPointCount}</h5> ${nodesCount}`)
                  .setLngLat(features[0].geometry.coordinates).addTo(map);
                }
              });
            }
            // Start the recursive query
            await querySubCluster(clusterId);
          }

          // Call the recursive function to get all sub-child points
          await getAllSubChildPoints(clusterId, function (err, subChildPoints) {});
        }
      });
      this.map.on('mouseleave', 'clusters', () => {
        popup.remove();
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
    async handleProfileToggle(profileId, profileName) {

      let isProfile = this.profileSwitches[profileId]
      let map = this.map
      let sourceId = this.map.getLayer('line-1').source
      let allLines = this.map.querySourceFeatures(sourceId, {sourceLayer: 'line-1'});
      let initialData = this.initialGroupGeoJsonData
      let profileSwitchesData = this.profileSwitchesData

      if (isProfile) {
        profileSwitchesData[profileId] = profileName
      } else {
        delete profileSwitchesData[profileId]
      }

      allLines.forEach(function (line) {
        let lineFeature = initialData.features.find(feature => feature.properties.id === line.properties.id);
        if (isProfile) {
          lineFeature.properties.color = line.properties[profileName]
        } else if (Object.keys(profileSwitchesData).length < 1) {
          lineFeature.properties.color = 'blue'
        }
        map.getSource(sourceId).setData(initialData)
      })
    },
    async handleToggleGroup(groupId, switchValue) {
      if (switchValue) {
        // Draw connected lines
        const sessions = await this.handleSessions(groupId)
        this.drawLines(this.map, sessions, groupId);
      } else {
        // Remove the group from the list of active groups
        this.map.removeLayer(`line-${groupId}`);
        this.map.removeSource(`line-${groupId}`);
      }
    },
    async handleClusters(groupId) {
      let respData;
      if (groupId == '') {
        respData = await fetchClusters('');
      } else {
        respData = this.clusterdata[groupId];
      }
      return respData;
    },
    async handleSessions(groupId) {
      const respData = this.groupdata[groupId];
      return respData;
    },
    async handleAgentlinks(id) {
      const respData = await fetchAgentlinks(id);
      return respData;
    },
    async handleGroupData() {
      try {
        const response = await fetchGroupData();
        // const response = await fetchGroups();
        this.groupdata = response;
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    },
    async handleClusterData() {
      try {
        const response = await fetchClustersData();
        // const response = await fetchGroups();
        this.clusterdata = response;
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    },
    async handleGroups() {
      try {
        this.loading = true
        // const response = await fetchGroupData();
        const response = await fetchGroups();
        this.groups = response;
      } catch (error) {
        console.error('Error fetching groups:', error);
      } finally {
        this.loading = false
      }
    },
    async handleProfiles() {
      try {
        this.loading = true
        const resp = await ProfileList()
        this.profiles = resp.profiles;
      } catch (errors) {
        console.log(errors)
      } finally {
        this.loading = false
      }
    },
    showClusters(clusters) {
      // Add a new source from our GeoJSON data and
      // set the 'cluster' option to true. GL-JS will
      // add the point_count property to your source data.
      this.map.addSource('earthquakes', {
        type: 'geojson',
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
      const organizationColors = {};
      console.log(clusters, 'here');
      clusters.features.forEach((feature) => {
        const org = feature.properties.organization;
        if (!(org in organizationColors)) {
          // You can use your getColor function to dynamically set colors
          organizationColors[org] = this.getColor(org);
        }
      });
      // Add unclustered points layer with dynamically set colors
      this.map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'earthquakes',
        filter: ['!', ['has', 'point_count']],
        paint: {
          'circle-color': [
            'match',
            ['get', 'organization'],
            'GCP', '#8cb63d', // Green
            'AZURE', '#f1f075', // Yellow
            '#f28cb1' // Default color
          ],
          'circle-radius': 8,
          'circle-stroke-width': 3,
          'circle-stroke-color': '#fff'
        }
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
    drawLines(map, lines, group_id) {
      let uniqueId = "line-" + group_id
      let lineFeatures = []
      let checkLineIds = []
      lines['features'].forEach(function(line){
        if (!checkLineIds.includes(line['properties']['session_id'])) {
          const  obj = {
            type: 'Feature',
            geometry: line['geometry'],
            properties: line['properties']
          }
          lineFeatures.push(obj)
          checkLineIds.push(line['properties']['session_id'])
        }
      })

      this.initialGroupGeoJsonData = {
        type: 'FeatureCollection',
        features: lineFeatures
      }

      this.map.addSource(uniqueId, {
        type: 'geojson',
        data: this.initialGroupGeoJsonData
      });

      this.map.addLayer({
        id: uniqueId,
        type: 'line',
        source: uniqueId,
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': ['get', 'color'],
          'line-width': 0.5, // Maximum line width at higher zoom levels
        },
      });
    },
    clearLines() {

      const map = this.map;

      // Iterate through the layers to find and remove layers with 'line-' prefix
      map.getStyle().layers.forEach((layer) => {
        if (layer.id.startsWith('line-')) {
          map.removeLayer(layer.id);
          map.removeSource(layer.id);
        }
      });
    },
    clearAll() {
      const map = this.map;

      // Remove cluster layers
      map.getStyle().layers.forEach((layer) => {
        if (layer.id.startsWith('clusters') || layer.id.startsWith('unclustered-point')) {
          map.removeLayer(layer.id);
        }
      });

      // Remove connection layers
      map.getStyle().layers.forEach((layer) => {
        if (layer.id.startsWith('line-')) {
          map.removeLayer(layer.id);
        }
      });

      // Remove cluster count layer
      const clusterCountLayer = map.getLayer('cluster-count');
      if (clusterCountLayer) {
        map.removeLayer('cluster-count');
      }

      // Remove cluster sources
      ['earthquakes'].forEach((source) => {
        if (map.getSource(source)) {
          map.removeSource(source);
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
  display: none;
  /* Initially hide the loader */
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
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
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