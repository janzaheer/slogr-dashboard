<script>
import Header from '../common/Header.vue';
export default {
    name: 'Sessions',
    components: {
        Header
    }
}
</script>

<style>

.addBtnSessions {
    background-color: var(--white_color);
    border-radius: 6px;
    border: 1px solid  var(--primary_color);
    padding: 7px 15px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    color: var(--primary_color);
}

.addBtnSessions:hover {
    background-color: var(--primary_color_Hover);
    color: var(--white_color);
}
</style>

<template>
    <!-- <Header/> -->
    <div class="pageHeight">
        <div class="bg">
            <Header />
            <div class="container-fluid sentinel mt-2">
                <div class="d-flex justify-content-end">
                    <h1 class="me-2"><i class="fa-solid fa-xmark fa-xs" style="color: #d8dce2;"></i></h1>
                </div>
            </div>
            <div class="container-fluid">
                <div class="card mx-md-2">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center ">
                            <div>
                                <h3 class="text-secondary ms-3 mt-2">Sessions</h3>
                            </div>
                            <div class="d-flex align-items-center">
                                <h6 class="mx-1 mt-2 text-muted">Home </h6>
                                <h6 class="me-4 mt-2"> - Sessions</h6>
                                <button class="addBtnSessions me-2"> <i class="fa-solid fa-plus fa-lg"></i> Add Schedule
                                    Sessions</button>
                                <button class="addBtn" data-bs-toggle="modal" data-bs-target="#staticBackdrop"> <i
                                        class="fa-solid fa-plus fa-lg"></i> Add New Sessions</button>
                                <div class="mx-3"><i class="fa-solid fa-ellipsis fa-2xl"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-fluid tableDiv">
                <div class="card mx-md-2 mt-4 mb-5">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table text-center">
                                <thead>
                                    <tr>
                                        <th scope="col"><a href="#" class="tableHead">End-Point A</a> <img src="../../assets/group.svg" alt=""></th>
                                        <th scope="col"><a href="#"
                                                class="tableHead">End-Point
                                                B</a><img src="../../assets/group.svg" alt="">
                                        </th>
                                        <th scope="col"><a href="#"
                                                class="tableHead">Group </a>
                                            <img src="../../assets/group.svg" alt="">
                                        </th>
                                        <th scope="col"><a href="#"
                                                class="tableHead"> Number of
                                                Sessions <br>
                                                <span>Run in List</span>
                                            </a> <img src="../../assets/group.svg" alt="">
                                        </th>
                                        <th scope="col"><a href="#"
                                                class="tableHead">Message
                                                for Sessions</a>
                                        </th>
                                        <th scope="col"><a href="#"
                                                class="tableHead">Frequency</a>
                                        </th>
                                        <th scope="col"><a href="#"
                                                class="tableHead">Payload Length</a> </th>
                                        <th scope="col"><a href="#"
                                                class="tableHead">DSCP</a> </th>
                                        <th scope="col"> </th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <p class="tableP">Demo-Sentinel-1</p>
                                        </td>
                                        <td>
                                            <p class="tableP">US west 2</p>
                                        </td>
                                        <td>
                                            <p class="tableP">Demo PCo1P</p>
                                        </td>
                                        <td>
                                            <p class="tableP">1.0</p>
                                        </td>
                                        <td>
                                            <p class="tableP">25.0</p>
                                        </td>
                                        <td>
                                            <p class="tableP">1.0</p>
                                        </td>
                                        <td>
                                            <p class="tableP">1.0</p>
                                        </td>
                                        <td>
                                            <p class="tableP">1.0</p>
                                        </td>
                                        <td class="fs-5"><a href="#" class="text-decoration-none text-dark tableP">
                                                <i class="fa-solid fa-circle-play"></i></a></td>
                                        <td class="fs-5 dropstart"><a href="#" class="text-decoration-none text-dark tableP" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i class="fa-solid fa-ellipsis"></i></a>
                                            <ul class="dropdown-menu">
                                                <li><a class="dropdown-item" href="#"><i class="fa-regular fa-pen-to-square"></i> Edit</a></li>
                                                <li><a class="dropdown-item" href="#"><i class="fa-regular fa-eye"></i> Details</a></li>
                                                <li><a class="dropdown-item" href="#"><i class="fa-regular fa-trash-can"></i> Delete</a></li>
                                            </ul>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p class="tableP">Demo-Sentinel-1</p>
                                        </td>
                                        <td>
                                            <p class="tableP">US west 2</p>
                                        </td>
                                        <td>
                                            <p class="tableP">Demo PCo1P</p>
                                        </td>
                                        <td>
                                            <p class="tableP">1.0</p>
                                        </td>
                                        <td>
                                            <p class="tableP">25.0</p>
                                        </td>
                                        <td>
                                            <p class="tableP">1.0</p>
                                        </td>
                                        <td>
                                            <p class="tableP">1.0</p>
                                        </td>
                                        <td>
                                            <p class="tableP">1.0</p>
                                        </td>
                                        <td class="fs-5"><a href="#" class="text-decoration-none text-dark tableP">
                                                <i class="fa-solid fa-circle-play"></i></a></td>
                                        <td class="fs-5 dropstart"><a href="#" class="text-decoration-none text-dark tableP" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i class="fa-solid fa-ellipsis"></i></a>
                                            <ul class="dropdown-menu">
                                                <li><a class="dropdown-item" href="#"><i class="fa-regular fa-pen-to-square"></i> Edit</a></li>
                                                <li><a class="dropdown-item" href="#"><i class="fa-regular fa-eye"></i> Details</a></li>
                                                <li><a class="dropdown-item" href="#"><i class="fa-regular fa-trash-can"></i> Delete</a></li>
                                            </ul>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p class="tableP">Demo-Sentinel-1</p>
                                        </td>
                                        <td>
                                            <p class="tableP">US west 2</p>
                                        </td>
                                        <td>
                                            <p class="tableP">Demo PCo1P</p>
                                        </td>
                                        <td>
                                            <p class="tableP">1.0</p>
                                        </td>
                                        <td>
                                            <p class="tableP">25.0</p>
                                        </td>
                                        <td>
                                            <p class="tableP">1.0</p>
                                        </td>
                                        <td>
                                            <p class="tableP">1.0</p>
                                        </td>
                                        <td>
                                            <p class="tableP">1.0</p>
                                        </td>
                                        <td class="fs-5"><a href="#" class="text-decoration-none text-dark tableP">
                                                <i class="fa-solid fa-circle-play"></i></a></td>
                                        <td class="fs-5 dropstart"><a href="#" class="text-decoration-none text-dark tableP" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i class="fa-solid fa-ellipsis"></i></a>
                                            <ul class="dropdown-menu">
                                                <li><a class="dropdown-item" href="#"><i class="fa-regular fa-pen-to-square"></i> Edit</a></li>
                                                <li><a class="dropdown-item" href="#"><i class="fa-regular fa-eye"></i> Details</a></li>
                                                <li><a class="dropdown-item" href="#"><i class="fa-regular fa-trash-can"></i> Delete</a></li>
                                            </ul>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p class="tableP">Demo-Sentinel-1</p>
                                        </td>
                                        <td>
                                            <p class="tableP">US west 2</p>
                                        </td>
                                        <td>
                                            <p class="tableP">Demo PCo1P</p>
                                        </td>
                                        <td>
                                            <p class="tableP">1.0</p>
                                        </td>
                                        <td>
                                            <p class="tableP">25.0</p>
                                        </td>
                                        <td>
                                            <p class="tableP">1.0</p>
                                        </td>
                                        <td>
                                            <p class="tableP">1.0</p>
                                        </td>
                                        <td>
                                            <p class="tableP">1.0</p>
                                        </td>
                                        <td class="fs-5"><a href="#" class="text-decoration-none text-dark tableP">
                                                <i class="fa-solid fa-circle-play"></i></a></td>
                                        <td class="fs-5 dropstart"><a href="#" class="text-decoration-none text-dark tableP" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i class="fa-solid fa-ellipsis"></i></a>
                                            <ul class="dropdown-menu">
                                                <li><a class="dropdown-item" href="#"><i class="fa-regular fa-pen-to-square"></i> Edit</a></li>
                                                <li><a class="dropdown-item" href="#"><i class="fa-regular fa-eye"></i> Details</a></li>
                                                <li><a class="dropdown-item" href="#"><i class="fa-regular fa-trash-can"></i> Delete</a></li>
                                            </ul>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p class="tableP">Demo-Sentinel-1</p>
                                        </td>
                                        <td>
                                            <p class="tableP">US west 2</p>
                                        </td>
                                        <td>
                                            <p class="tableP">Demo PCo1P</p>
                                        </td>
                                        <td>
                                            <p class="tableP">1.0</p>
                                        </td>
                                        <td>
                                            <p class="tableP">25.0</p>
                                        </td>
                                        <td>
                                            <p class="tableP">1.0</p>
                                        </td>
                                        <td>
                                            <p class="tableP">1.0</p>
                                        </td>
                                        <td>
                                            <p class="tableP">1.0</p>
                                        </td>
                                        <td class="fs-5"><a href="#" class="text-decoration-none text-dark tableP">
                                                <i class="fa-solid fa-circle-play"></i></a></td>
                                        <td class="fs-5 dropstart"><a href="#" class="text-decoration-none text-dark tableP" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i class="fa-solid fa-ellipsis"></i></a>
                                            <ul class="dropdown-menu">
                                                <li><a class="dropdown-item" href="#"><i class="fa-regular fa-pen-to-square"></i> Edit</a></li>
                                                <li><a class="dropdown-item" href="#"><i class="fa-regular fa-eye"></i> Details</a></li>
                                                <li><a class="dropdown-item" href="#"><i class="fa-regular fa-trash-can"></i> Delete</a></li>
                                            </ul>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p class="tableP">Demo-Sentinel-1</p>
                                        </td>
                                        <td>
                                            <p class="tableP">US west 2</p>
                                        </td>
                                        <td>
                                            <p class="tableP">Demo PCo1P</p>
                                        </td>
                                        <td>
                                            <p class="tableP">1.0</p>
                                        </td>
                                        <td>
                                            <p class="tableP">25.0</p>
                                        </td>
                                        <td>
                                            <p class="tableP">1.0</p>
                                        </td>
                                        <td>
                                            <p class="tableP">1.0</p>
                                        </td>
                                        <td>
                                            <p class="tableP">1.0</p>
                                        </td>
                                        <td class="fs-5"><a href="#" class="text-decoration-none text-dark tableP">
                                                <i class="fa-solid fa-circle-play"></i></a></td>
                                        <td class="fs-5 dropstart"><a href="#" class="text-decoration-none text-dark tableP" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i class="fa-solid fa-ellipsis"></i></a>
                                            <ul class="dropdown-menu">
                                                <li><a class="dropdown-item" href="#"><i class="fa-regular fa-pen-to-square"></i> Edit</a></li>
                                                <li><a class="dropdown-item" href="#"><i class="fa-regular fa-eye"></i> Details</a></li>
                                                <li><a class="dropdown-item" href="#"><i class="fa-regular fa-trash-can"></i> Delete</a></li>
                                            </ul>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p class="tableP">Demo-Sentinel-1</p>
                                        </td>
                                        <td>
                                            <p class="tableP">US west 2</p>
                                        </td>
                                        <td>
                                            <p class="tableP">Demo PCo1P</p>
                                        </td>
                                        <td>
                                            <p class="tableP">1.0</p>
                                        </td>
                                        <td>
                                            <p class="tableP">25.0</p>
                                        </td>
                                        <td>
                                            <p class="tableP">1.0</p>
                                        </td>
                                        <td>
                                            <p class="tableP">1.0</p>
                                        </td>
                                        <td>
                                            <p class="tableP">1.0</p>
                                        </td>
                                        <td class="fs-5"><a href="#" class="text-decoration-none text-dark tableP">
                                                <i class="fa-solid fa-circle-play"></i></a></td>
                                        <td class="fs-5 dropstart"><a href="#" class="text-decoration-none text-dark tableP" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i class="fa-solid fa-ellipsis"></i></a>
                                            <ul class="dropdown-menu">
                                                <li><a class="dropdown-item" href="#"><i class="fa-regular fa-pen-to-square"></i> Edit</a></li>
                                                <li><a class="dropdown-item" href="#"><i class="fa-regular fa-eye"></i> Details</a></li>
                                                <li><a class="dropdown-item" href="#"><i class="fa-regular fa-trash-can"></i> Delete</a></li>
                                            </ul>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p class="tableP">Demo-Sentinel-1</p>
                                        </td>
                                        <td>
                                            <p class="tableP">US west 2</p>
                                        </td>
                                        <td>
                                            <p class="tableP">Demo PCo1P</p>
                                        </td>
                                        <td>
                                            <p class="tableP">1.0</p>
                                        </td>
                                        <td>
                                            <p class="tableP">25.0</p>
                                        </td>
                                        <td>
                                            <p class="tableP">1.0</p>
                                        </td>
                                        <td>
                                            <p class="tableP">1.0</p>
                                        </td>
                                        <td>
                                            <p class="tableP">1.0</p>
                                        </td>
                                        <td class="fs-5"><a href="#" class="text-decoration-none text-dark tableP">
                                                <i class="fa-solid fa-circle-play"></i></a></td>
                                        <td class="fs-5 dropstart"><a href="#" class="text-decoration-none text-dark tableP" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i class="fa-solid fa-ellipsis"></i></a>
                                            <ul class="dropdown-menu">
                                                <li><a class="dropdown-item" href="#"><i class="fa-regular fa-pen-to-square"></i> Edit</a></li>
                                                <li><a class="dropdown-item" href="#"><i class="fa-regular fa-eye"></i> Details</a></li>
                                                <li><a class="dropdown-item" href="#"><i class="fa-regular fa-trash-can"></i> Delete</a></li>
                                            </ul>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="d-flex justify-content-between">
                            <div>
                                <button class="addBtn2"><i class="fa-solid fa-chevron-down fa-lg"></i> Go to
                                    Page</button>
                                <button class="addBtn2 mx-2" data-bs-toggle="modal" data-bs-target="#groupModal"><i
                                        class="fa-solid fa-plus fa-lg"></i> Add to
                                    Group</button>
                                <button class="addBtn2"><i class="fa-solid fa-plus fa-lg"></i> Create
                                    Report</button>
                            </div>
                            <div>
                                <div class="pagination">
                                    <button class="prevBtn"><i class="fa-solid fa-angle-left"></i> Prev</button>
                                    <div class="pageNumber">1</div>
                                    <div class="pageNumber">2</div>
                                    <div class="pageNumber pageBtn">3</div>
                                    <div class="pageNumber">4</div>
                                    <div class="pageNumber">5</div>
                                    <button class="nextBtn">Next <i class="fa-solid fa-angle-right"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- go to Modal -->
    <div class="modal fade" id="groupModal" tabindex="-1" aria-labelledby="groupModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="my-4 text-center">
                        <h2 class="text-dark">Add To Group</h2>
                    </div>
                    <div class="container mb-2">
                        <input type="text" class="form-control form-control-lg" style="background-color: #f3f3f3;"
                            id="exampleFormControlInput1" placeholder="">
                    </div>
                    <div class="">
                        <hr>
                        <button class="createGroupBtn"> <i class="fa-solid fa-plus fa-lg"></i> Create New Group</button>
                        <hr>
                    </div>
                    <div class="mx-2">
                        <div class="form-check mb-3">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                            <label class="form-check-label" for="flexCheckDefault">
                                Group 01
                            </label>
                        </div>
                        <div class="form-check mb-3">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault1">
                            <label class="form-check-label" for="flexCheckDefault1">
                                Group 024
                            </label>
                        </div>
                        <div class="form-check mb-3">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault2">
                            <label class="form-check-label" for="flexCheckDefault2">
                                Group Number 021
                            </label>
                        </div>
                        <div class="form-check mb-3">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault3">
                            <label class="form-check-label" for="flexCheckDefault3">
                                Group Number B23
                            </label>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="modelCancelBtn" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="modelSaveBtn ms-2">Add Group</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal  edit-->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="my-2 text-center">
                        <h2 class="text-secondary">New Sessions</h2>
                        <p class="modelText">Fill and select the new session Field</p>
                    </div>
                    <div class="">
                        <div class="mb-4">
                            <label for="exampleFormControlInput1" class="form-label ms-1">Form*</label>
                            <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                                <option class="text-secondary" selected disabled>please select sender sentinel</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                        <div class="mb-4">
                            <label for="exampleFormControlInput1" class="form-label ms-1">To*</label>
                            <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                                <option class="text-secondary" selected disabled>please select receiver sentinel</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                        <div class="mb-4">
                            <label for="exampleFormControlInput1" class="form-label ms-1">Monitoring Profile*</label>
                            <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                                <option class="text-secondary" selected disabled>select here</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <div class="">
                                <label for="exampleFormControlInput1" class="form-label">Scheduel</label>
                                <input type="date" class="form-control form-control-lg" id="exampleFormControlInput1"
                                    placeholder="00:00:00">
                            </div>
                        </div>
                        <div class="mb-3 d-flex justify-content-around align-item-center py-3 rounded"
                            style="background-color: #f3f3f3;">
                            <div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault"
                                        id="flexRadioDefault11">
                                    <label class="form-check-label" for="flexRadioDefault11">
                                        VOIP
                                    </label>
                                </div>
                            </div>
                            <div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault"
                                        id="flexRadioDefault12">
                                    <label class="form-check-label" for="flexRadioDefault12">
                                        Streaming
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <div class="row g-2">
                                <div class="col-md-6">
                                    <input type="text" class="form-control form-control-lg" placeholder="Test Sessions*"
                                        aria-label="First name">
                                </div>
                                <div class="col-md-6">
                                    <input type="text" class="form-control form-control-lg" placeholder="Last name"
                                        aria-label="Text Messages (1-1000)">
                                </div>
                                <div class="col-md-6">
                                    <input type="text" class="form-control form-control-lg" placeholder="Last name"
                                        aria-label="TPayload Length (40-1456)">
                                </div>
                                <div class="col-md-6">
                                    <input type="text" class="form-control form-control-lg" placeholder="Last name"
                                        aria-label="Intervel (0-1000ms)">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="d-flex justify-content-end">
                        <button type="button" class="modelCancelBtn" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="modelSaveBtn ms-2">Create</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>