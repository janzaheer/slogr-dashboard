<template>
    <div class="pageHeight">
        <div class="bg">
            <Header />
            <div class="container-fluid sentinel mt-2">
                <div class="d-flex justify-content-end">
                    <h1 class="me-2">
                        <RouterLink to="/groups"> <i class="fa-solid fa-xmark fa-xs" style="color: #d8dce2;"></i>
                        </RouterLink>
                    </h1>
                </div>
            </div>
            <div>
                <ReportsChild :id="$route.params.id" />
            </div>
        </div>
    </div>
</template>

<script>
import {
    RouterLink
} from 'vue-router';
import Header from '../common/Header.vue'
import ReportsChild from '../Sentinel/ReportsChild.vue';

export default {
    name: 'GroupReports',
    components: {
        Header,
        RouterLink,
        ReportsChild
    },
    data() {
        return {
  
        }
    },
    mounted() {

    },
    methods: {

    },
}
</script>

<style>
.ps {
    height: 300px;
}

.hr {
    margin: 0.4rem 0;
    color: inherit;
    border: 0;
    border-top: var(--bs-border-width) solid;
    opacity: 0.25;
}

#container {
    height: 400px;
}

#container2 {
    height: 400px;
}

#container3 {
    height: 400px;
}

.highcharts-figure,
.highcharts-data-table table {
    min-width: 320px;
    max-width: 800px;
    margin: 1em auto;
}

.highcharts-data-table table {
    font-family: Verdana, sans-serif;
    border-collapse: collapse;
    border: 1px solid #ebebeb;
    margin: 10px auto;
    text-align: center;
    width: 100%;
    max-width: 500px;
}

.highcharts-data-table caption {
    padding: 1em 0;
    font-size: 1.2em;
    color: #555;
}

.highcharts-data-table th {
    font-weight: 600;
    padding: 0.5em;
}

.highcharts-data-table td,
.highcharts-data-table th,
.highcharts-data-table caption {
    padding: 0.5em;
}

.highcharts-data-table thead tr,
.highcharts-data-table tr:nth-child(even) {
    background: #f8f8f8;
}

.highcharts-data-table tr:hover {
    background: #f1f7ff;
}
</style>
