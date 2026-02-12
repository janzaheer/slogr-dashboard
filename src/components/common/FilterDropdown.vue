<template>
  <div class="dropdown filter-wrapper">
    <!-- Button -->
    <button
      class="filter-btn"
      data-bs-toggle="dropdown"
      data-bs-display="static"
    >
      <span>Filter</span>
      <i class="bi bi-three-dots"></i>
    </button>

    <!-- Dropdown Panel -->
    <div class="dropdown-menu filter-panel dropdown-menu-end">
      <!-- Search -->
      <div class="search-box">
        <i class="bi bi-search"></i>
        <input type="text" placeholder="Search Filter..." v-model="search" />
      </div>

      <!-- Filters -->
      <div class="filter-row" v-for="(item,i) in filters" :key="i">
        <div class="left">
          <div class="green-box"></div>
          <div>
            <p class="title">{{ item.title }}</p>
            <p class="desc">{{ item.desc }}</p>
          </div>
        </div>

        <label class="switch">
          <input type="checkbox" v-model="item.active" />
          <span class="slider"></span>
        </label>
      </div>

      <!-- Slider -->
      <div class="range-box">
        <p class="title">Tony Soap</p>
        <div class="range-row">
          <span>{{ yearMin }}</span>
          <input type="range" v-model="yearMin" min="2021" max="2054" />
          <!-- <input type="range" v-model="yearMax" min="2021" max="2054" /> -->
          <span>{{ yearMax }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilterDropdown",
  data() {
    return {
      search: "",
      yearMin: 2021,
      yearMax: 2054,
      filters: [
        { title: "Subsea only", desc: "Lorem ipsum dolor sit amet, consectetur", active: false },
        { title: "Active Only", desc: "Lorem ipsum dolor sit amet, consectetur", active: false },
        { title: "Future only (RFS)", desc: "Lorem ipsum dolor sit amet, consectetur", active: true },
      ],
    };
  },
};
</script>

<style scoped>
/* Button */
.filter-btn {
  background: white;
  border: 1px solid #eee;
  padding: 10px 14px;
  border-radius: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
}

/* Panel */
.filter-panel {
  width: 360px;
  padding: 15px;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.08);
  border: 0;
}

/* Search */
.search-box {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f6f7f9;
  padding: 8px 12px;
  border-radius: 10px;
  margin-bottom: 12px;
}
.search-box input {
  border: none;
  outline: none;
  background: transparent;
  width: 100%;
}

/* Filter Row */
.filter-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}
.filter-row:last-child {
  border-bottom: none;
}

.left {
  display: flex;
  gap: 10px;
}

/* Green Box */
.green-box {
  width: 22px;
  height: 22px;
  background: #8cc63f;
  border-radius: 6px;
}

/* Text */
.title {
  font-size: 14px;
  font-weight: 600;
  margin: 0;
}
.desc {
  font-size: 12px;
  color: #999;
  margin: 0;
}

/* Switch Toggle (Custom like Picture) */
.switch {
  position: relative;
  width: 40px;
  height: 22px;
}
.switch input {
  opacity: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  background: #ddd;
  border-radius: 30px;
  inset: 0;
  transition: .3s;
}
.slider:before {
  content: "";
  position: absolute;
  width: 16px;
  height: 16px;
  background: white;
  border-radius: 50%;
  left: 3px;
  top: 3px;
  transition: .3s;
}
.switch input:checked + .slider {
  background: #8cc63f;
}
.switch input:checked + .slider:before {
  transform: translateX(18px);
}

/* Range */
.range-box {
  margin-top: 12px;
}
.range-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.range-row input {
  flex: 1;
  height: 4px;
}
</style>