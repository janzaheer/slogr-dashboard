<template>
  <!-- NAVBAR -->
  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
    <div class="container-fluid px-4">

      <!-- LOGO -->
      <RouterLink class="navbar-brand" to="/">
        <img src="../../assets/group-2420.svg" class="logo-img" />
      </RouterLink>

      <!-- MOBILE TOGGLE -->
      <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navMenu">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- MENU -->
      <div class="collapse navbar-collapse" id="navMenu">

        <!-- LEFT LINKS -->
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 align-items-lg-center gap-lg-3">

          <li class="nav-item">
            <RouterLink class="nav-link d-flex align-items-center gap-2" to="/">
              <img src="../../assets/Home.svg" class="icon-img" />
               <!-- <i class="fa-regular fa-house"></i> -->
              <span>Home</span>
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink class="nav-link d-flex align-items-center gap-2" to="/sentinel">
              <i class="fa-solid fa-location-dot"></i>
              <span>Sentinel</span>
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink class="nav-link d-flex align-items-center gap-2" to="/sessions">
              <img src="../../assets/group-24551.svg" class="icon-img" />
              <span>Sessions</span>
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink class="nav-link d-flex align-items-center gap-2" to="/monitor">
              <i class="fa-regular fa-eye"></i>
              <span>Profile</span>
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink class="nav-link d-flex align-items-center gap-2" to="/groups">
              <img src="../../assets/group-25271.svg" class="icon-img" />
              <span>Groups</span>
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink class="nav-link d-flex align-items-center gap-2" to="/alerts">
              <i class="fa-regular fa-bell"></i>
              <span>Alerts</span>
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink class="nav-link d-flex align-items-center gap-2" to="/reports">
              <i class="fa-solid fa-chart-line"></i>
              <span>Reports</span>
            </RouterLink>
          </li>

        </ul>

        <!-- RIGHT ACTIONS -->
        <div class="d-flex align-items-center gap-2 nav-right">
          <!-- <FilterDropdown /> -->
          <button class="btn-icon">
            <i class="fa-regular fa-bell"></i>
          </button>

          <RouterLink to="/dashboard" class="btn-icon">
            <i class="fa-solid fa-users text-secondary"></i>
          </RouterLink>

          <div class="btn-group">
            <button class="user-circle dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              {{ userData?.user?.name?.substring(0, 2) }}
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <h6 class="dropdown-header">
                  <i class="fa-regular fa-user"></i>
                   {{ userData?.user?.name }}
                </h6>
              </li>
              <li>
                <button class="dropdown-item" @click="logoutUser">
                  <i class="fa-solid fa-right-from-bracket"></i> Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <!-- NAVBAR SPACER -->
  <div class="nav-spacer"></div>

  <RouterView />
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import { useAuth0 } from "@auth0/auth0-vue";
import FilterDropdown from "./FilterDropdown.vue";

export default {
  name: "Header",
  setup() {
    const { logout } = useAuth0();
    return {
      logout: () => logout(),
    };
  },

  components: {
    FilterDropdown
  },

  computed: {
    userData() {
      return this.$store.getters.getUserData;
    },
  },

  methods: {
    logoutUser() {
      this.$store.dispatch("logout");
      this.logout();
    },
  },
};
</script>

<style scoped>
/* ===== LOGO ===== */
.logo-img {
  height: 42px;
}

/* ===== NAV LINKS ===== */
.nav-link {
  color: #444;
  font-size: 15px;
  font-weight: 500;
  transition: 0.2s;
}

.nav-link:hover {
  color: var(--primary_color);
}

/* Active Link */
.router-link-exact-active {
  color: var(--primary_color);
  font-weight: 600;
}

/* ===== ICONS ===== */
.icon-img {
  height: 18px;
}

.nav-link i {
  font-size: 16px;
}

/* ===== RIGHT BUTTONS ===== */
.btn-icon {
  border: 1px solid #e5e5e5;
  padding: 8px 10px;
  border-radius: 8px;
  background: white;
  transition: 0.2s;
}

.btn-icon:hover {
  border-color: var(--primary_color);
}

/* USER CIRCLE */
.btn-user {
  background: #f1f1f1;
  border: none;
  padding: 8px 12px;
  border-radius: 50%;
  font-weight: bold;
}

/* NAVBAR HEIGHT SPACE */
.nav-spacer {
  height: 70px;
}

/* profile dropdown */
.user-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%; /* CIRCLE */
  background: white; /* WHITE BG */
  border: 1px solid #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  color: #555;
  padding: 0;
}

/* Hover Effect */
.user-circle:hover {
  border-color: var(--primary_color);
  background: #f8f9fa;
}

/* Remove bootstrap arrow ugly style */
.user-circle::after {
  display: none !important;
}

/* ===== MOBILE RESPONSIVE ===== */
@media (max-width: 991px) {
  .nav-right {
    margin-top: 10px;
    justify-content: center;
  }

  .navbar-nav {
    text-align: center;
  }

  .nav-link {
    justify-content: center;
    padding: 10px 0;
  }
}
</style>