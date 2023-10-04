
<script>
import Header from './common/Header.vue';
export default{
    name: 'Home',
    components:{
        Header
    }
}
</script>

<style>
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

<template>
    <!-- <Header/> -->
    <div class="">
        <div class="map">
            <img src="../assets/map.png" class="screenshot20210522At336" alt="">
            <img src="../assets/add5.svg" class="addIcon" alt="">
            <img src="../../src/assets/group-23971.svg" class="mapInner" alt="">
        </div>
    </div>
</template>