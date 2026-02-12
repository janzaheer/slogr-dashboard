<template>
    <div class="table-responsive placeholder-glow">
        <table class="table table-striped table-hover text-center custom-table">
            <thead>
                <tr>
                    <!-- Table headers with skeleton placeholders -->
                    <th><span class="placeholder col-8"></span></th>
                    <th><span class="placeholder col-7"></span></th>

                    <!-- Jitter column with badges -->
                    <th>
                        <span class="placeholder col-10"></span>
                        <br>
                        <div class="d-flex justify-content-center">
                            <span class="placeholder badge text-bg-success me-1 col-2"></span>
                            <span class="placeholder badge text-bg-danger col-2"></span>
                        </div>
                    </th>

                    <!-- Downlink column -->
                    <th>
                        <span class="placeholder col-9"></span><br>
                        <div class="d-flex justify-content-center">
                            <span class="placeholder badge text-bg-success me-1 col-2"></span>
                            <span class="placeholder badge text-bg-danger col-2"></span>
                        </div>
                    </th>

                    <!-- Downlink Bandwidth column -->
                    <th>
                        <span class="placeholder col-12"></span>
                        <div class="d-flex justify-content-center">
                            <span class="placeholder badge text-bg-success me-1 col-2"></span>
                            <span class="placeholder badge text-bg-danger col-2"></span>
                        </div>
                    </th>

                    <!-- Loss column -->
                    <th>
                        <span class="placeholder col-5"></span><br>
                        <div class="d-flex justify-content-center">
                            <span class="placeholder badge text-bg-success me-1 col-2"></span>
                            <span class="placeholder badge text-bg-danger col-2"></span>
                        </div>
                    </th>

                    <!-- RTT column -->
                    <th>
                        <span class="placeholder col-4"></span><br>
                        <div class="d-flex justify-content-center">
                            <span class="placeholder badge text-bg-success me-1 col-2"></span>
                            <span class="placeholder badge text-bg-danger col-2"></span>
                        </div>
                    </th>

                    <!-- Uplink column -->
                    <th>
                        <span class="placeholder col-6"></span><br>
                        <div class="d-flex justify-content-center">
                            <span class="placeholder badge text-bg-success me-1 col-2"></span>
                            <span class="placeholder badge text-bg-danger col-2"></span>
                        </div>
                    </th>

                    <!-- Uplink Bandwidth column -->
                    <th>
                        <span class="placeholder col-14"></span><br>
                        <div class="d-flex justify-content-center">
                            <span class="placeholder badge text-bg-success me-1 col-2"></span>
                            <span class="placeholder badge text-bg-danger col-2"></span>
                        </div>
                    </th>

                    <!-- Remaining columns -->
                    <th><span class="placeholder col-10"></span></th>
                    <th><span class="placeholder col-11"></span></th>
                    <th><span class="placeholder col-9"></span></th>

                    <!-- Delay column -->
                    <th>
                        <span class="placeholder col-6"></span><br>
                        <div class="d-flex justify-content-center">
                            <span class="placeholder badge text-bg-success me-1 col-2"></span>
                            <span class="placeholder badge text-bg-danger col-2"></span>
                        </div>
                    </th>

                    <th><span class="placeholder col-8"></span></th>
                    <th><span class="placeholder col-5"></span></th>
                    <th><span class="placeholder col-7"></span></th>
                </tr>
            </thead>
            <tbody>
                <!-- Skeleton rows (5 rows as example) -->
                <tr v-for="i in 5" :key="i">
                    <td><span class="placeholder col-12"></span></td>
                    <td><span class="placeholder col-10"></span></td>

                    <!-- Jitter values -->
                    <td>
                        <span class="placeholder col-3 me-1"></span>
                        <span class="placeholder col-3"></span>
                    </td>

                    <!-- Downlink values -->
                    <td>
                        <span class="placeholder col-3 me-1"></span>
                        <span class="placeholder col-3"></span>
                    </td>

                    <!-- Downlink Bandwidth values -->
                    <td>
                        <span class="placeholder col-3 me-1"></span>
                        <span class="placeholder col-3"></span>
                    </td>

                    <!-- Loss values -->
                    <td>
                        <span class="placeholder col-3 me-1"></span>
                        <span class="placeholder col-3"></span>
                    </td>

                    <!-- RTT values -->
                    <td>
                        <span class="placeholder col-3 me-1"></span>
                        <span class="placeholder col-3"></span>
                    </td>

                    <!-- Uplink values -->
                    <td>
                        <span class="placeholder col-3 me-1"></span>
                        <span class="placeholder col-3"></span>
                    </td>

                    <!-- Uplink Bandwidth values -->
                    <td>
                        <span class="placeholder col-3 me-1"></span>
                        <span class="placeholder col-3"></span>
                    </td>

                    <!-- Other columns -->
                    <td><span class="placeholder col-8"></span></td>
                    <td><span class="placeholder col-7"></span></td>
                    <td><span class="placeholder col-9"></span></td>

                    <!-- Delay values -->
                    <td>
                        <span class="placeholder col-3 me-1"></span>
                        <span class="placeholder col-3"></span>
                    </td>

                    <td><span class="placeholder col-6"></span></td>
                    <td><span class="placeholder col-4"></span></td>

                    <!-- Actions column -->
                    <td>
                        <span class="placeholder col-8"></span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    name: "Skeleton"
}
</script>