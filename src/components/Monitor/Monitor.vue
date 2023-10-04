<script>
import Header from '../common/Header.vue';
export default {
    name: 'Monitor',
    components: {
        Header
    }
}
</script>

<style>
.pageHeight {
    height: 100vh;
}

.addBtn {
    background-color: #8CB63D;
    border-radius: 6px;
    border: 1px solid #8CB63D;
    padding: 7px 15px;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.addBtn:hover {
    background-color: #72962f;
}

.addBtnSessions {
    background-color: white;
    border-radius: 6px;
    border: 1px solid #8CB63D;
    padding: 7px 15px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    color: #8CB63D;
}

.addBtnSessions:hover {
    background-color: #8CB63D;
    color: white;
}

.addBtn2 {
    background-color: white;
    border-radius: 6px;
    border: 1px solid #8CB63D;
    padding: 10px 15px;
    color: #8CB63D;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.addBtn2:hover {
    background-color: #72962f;
    color: white;
}

.modelSaveBtn {
    background-color: #8CB63D;
    border-radius: 6px;
    border: 1px solid #8CB63D;
    padding: 7px 50px;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.modelSaveBtn:hover {
    background-color: #72962f;
}

.modelCancelBtn {
    border: none;
    background-color: white;
    color: darkgray;
    padding: 7px 30px;
    text-decoration: none;
}

.modelCancelBtn:hover {
    color: #8CB63D;
}

.createGroupBtn {
    background-color: white;
    border-radius: 6px;
    border: 1px solid #8CB63D;
    padding: 7px 40px;
    color: #8CB63D;
    cursor: pointer;
}

.createGroupBtn:hover {
    background-color: #8CB63D;
    color: white;
}

.css{
    line-height: 1.2;
}

.bg {
    background-color: #f7f7f8;
    min-height: 100vh;
    top: 1;
}

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
}

.prevBtn,
.nextBtn {
    padding: 10px 15px;
    /* font-size: 16px; */
    border-radius: 6px;
    /* background-color:  #8CB63D; */
    border: 1px solid #8CB63D;
    /* color: #8CB63D; */
    cursor: pointer;
    transition: background-color 0.3s ease;
    background-color: white;
}

.prevBtn:hover,
.nextBtn:hover {
    background-color: #8CB63D;
    color: white;
}

.pageNumber {
    font-size: 15px;
    margin: 0 20px;
    color: darkgray;
}

.pageBtn {
    background-color: #8CB63D;
    padding: 5px 15px;
    border-radius: 7px;
    color: white;
}

.tableDiv {
    padding-bottom: 22px;
}

.pointer {
    cursor: pointer;
    color: darkgrey;
}

.modelText {
    font-size: 20px;
}

p {
    margin-bottom: 0 !important;
}

.tableP {
    font-size: 18px;
    margin-top: 15px !important;
    margin-bottom: 10px !important;
    display: inline-block;
}

.tableHead {
    text-decoration: none;
    color: #000;
    margin-top: 10px !important;
    margin-bottom: 10px !important;
    font-size: 16px;
    display: inline-block;
}

.ApplyBtn {
    background-color: #8CB63D;
    color: white;
    border-radius: 6px;
    border: 1px solid #8CB63D;
    padding: 5px 0;

}

.ApplyBtn:hover {
    background-color: #72962f;
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
                                <h3 class="text-secondary ms-3 mt-2">Monitor</h3>
                            </div>
                            <div class="d-flex align-items-center">
                                <h6 class="mx-1 mt-2 text-muted">Home </h6>
                                <h6 class="me-4 mt-2"> - Monitor</h6>
                                <button class="addBtn" data-bs-toggle="modal" data-bs-target="#staticBackdrop"> <i
                                        class="fa-solid fa-plus fa-lg"></i> Create New Monitor Profile</button>
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
                                        <th><a href="#" class="tableHead">Date</a></th>
                                        <th><a href="#"
                                                class="tableHead">Name</a></th>
                                        <th><a href="#"
                                                class="tableHead">Round Trip Jitter </a></th>
                                        <th><a href="#"
                                                class="tableHead">Packet Loss</a> </th>
                                        <th><a href="#"
                                                class="tableHead">Packet Recorder%</a></th>
                                        <th><a href="#"
                                                class="tableHead">Delay <br><p class="fw-light"> Min/ Max /Avg.</p></a>
                                        </th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <p class="tableP">5/3/1997</p>
                                        </td>
                                        <td>
                                            <p class="tableP">VOIP PROFILE</p>
                                        </td>
                                        <td>
                                            <p class="tableP">02</p>
                                        </td>
                                        <td>
                                            <p class="tableP">02</p>
                                        </td>
                                        <td>
                                            <p class="tableP">02</p>
                                        </td>
                                        <td>
                                            <p class="tableP css">1.0 MB</p>
                                            <p class="css fw-lighter">300/ 150/ 250</p>
                                        </td>
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
                                            <p class="tableP">5/3/1997</p>
                                        </td>
                                        <td>
                                            <p class="tableP">VOIP PROFILE</p>
                                        </td>
                                        <td>
                                            <p class="tableP">02</p>
                                        </td>
                                        <td>
                                            <p class="tableP">02</p>
                                        </td>
                                        <td>
                                            <p class="tableP">02</p>
                                        </td>
                                        <td>
                                            <p class="tableP css">1.0 MB</p>
                                            <p class="css fw-lighter">300/ 150/ 250</p>
                                        </td>
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
                                            <p class="tableP">5/3/1997</p>
                                        </td>
                                        <td>
                                            <p class="tableP">VOIP PROFILE</p>
                                        </td>
                                        <td>
                                            <p class="tableP">02</p>
                                        </td>
                                        <td>
                                            <p class="tableP">02</p>
                                        </td>
                                        <td>
                                            <p class="tableP">02</p>
                                        </td>
                                        <td>
                                            <p class="tableP css">1.0 MB</p>
                                            <p class="css fw-lighter">300/ 150/ 250</p>
                                        </td>
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
                                            <p class="tableP">5/3/1997</p>
                                        </td>
                                        <td>
                                            <p class="tableP">VOIP PROFILE</p>
                                        </td>
                                        <td>
                                            <p class="tableP">02</p>
                                        </td>
                                        <td>
                                            <p class="tableP">02</p>
                                        </td>
                                        <td>
                                            <p class="tableP">02</p>
                                        </td>
                                        <td>
                                            <p class="tableP css">1.0 MB</p>
                                            <p class="css fw-lighter">300/ 150/ 250</p>
                                        </td>
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
                                            <p class="tableP">5/3/1997</p>
                                        </td>
                                        <td>
                                            <p class="tableP">VOIP PROFILE</p>
                                        </td>
                                        <td>
                                            <p class="tableP">02</p>
                                        </td>
                                        <td>
                                            <p class="tableP">02</p>
                                        </td>
                                        <td>
                                            <p class="tableP">02</p>
                                        </td>
                                        <td>
                                            <p class="tableP css">1.0 MB</p>
                                            <p class="css fw-lighter">300/ 150/ 250</p>
                                        </td>
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
                                            <p class="tableP">5/3/1997</p>
                                        </td>
                                        <td>
                                            <p class="tableP">VOIP PROFILE</p>
                                        </td>
                                        <td>
                                            <p class="tableP">02</p>
                                        </td>
                                        <td>
                                            <p class="tableP">02</p>
                                        </td>
                                        <td>
                                            <p class="tableP">02</p>
                                        </td>
                                        <td>
                                            <p class="tableP css">1.0 MB</p>
                                            <p class="css fw-lighter">300/ 150/ 250</p>
                                        </td>
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
                                            <p class="tableP">5/3/1997</p>
                                        </td>
                                        <td>
                                            <p class="tableP">VOIP PROFILE</p>
                                        </td>
                                        <td>
                                            <p class="tableP">02</p>
                                        </td>
                                        <td>
                                            <p class="tableP">02</p>
                                        </td>
                                        <td>
                                            <p class="tableP">02</p>
                                        </td>
                                        <td>
                                            <p class="tableP css">1.0 MB</p>
                                            <p class="css fw-lighter">300/ 150/ 250</p>
                                        </td>
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
                                            <p class="tableP">5/3/1997</p>
                                        </td>
                                        <td>
                                            <p class="tableP">VOIP PROFILE</p>
                                        </td>
                                        <td>
                                            <p class="tableP">02</p>
                                        </td>
                                        <td>
                                            <p class="tableP">02</p>
                                        </td>
                                        <td>
                                            <p class="tableP">02</p>
                                        </td>
                                        <td>
                                            <p class="tableP css">1.0 MB</p>
                                            <p class="css fw-lighter">300/ 150/ 250</p>
                                        </td>
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
                                            <p class="tableP">5/3/1997</p>
                                        </td>
                                        <td>
                                            <p class="tableP">VOIP PROFILE</p>
                                        </td>
                                        <td>
                                            <p class="tableP">02</p>
                                        </td>
                                        <td>
                                            <p class="tableP">02</p>
                                        </td>
                                        <td>
                                            <p class="tableP">02</p>
                                        </td>
                                        <td>
                                            <p class="tableP css">1.0 MB</p>
                                            <p class="css fw-lighter">300/ 150/ 250</p>
                                        </td>
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

    <!-- Modal  edit-->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header d-flex justify-content-center align-items-center">
                    <div class="">
                        <h2 class="text-dark">New Monitoring Profile</h2>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="">
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label ms-1">Profile Name</label>
                            <input type="text" class="form-control form-control-lg" placeholder="Type Name"
                                        aria-label="First name">
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label ms-1">Round Trip Jitter (ms)</label>
                            <input type="text" class="form-control form-control-lg" placeholder="Jitter (ms)"
                                        aria-label="First name">
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label ms-1">Round Trip Packet Loss (%)</label>
                            <input type="text" class="form-control form-control-lg" placeholder="Packet Loss"
                                        aria-label="First name">
                        </div>
                        <div class="mb-3">
                            <div class="">
                                <label for="exampleFormControlInput1" class="form-label ms-1">Packet Re-order (%)</label>
                            <input type="text" class="form-control form-control-lg" placeholder=" Re-order %"
                                        aria-label="First name">
                            </div>
                        </div>
                        <div class="mb-3">
                            <div class="row g-2">
                                <label for="exampleFormControlInput1" class="form-label ms-1">Round Trip</label>
                                <div class="col-md-4">
                                    <input type="text" class="form-control form-control-lg" placeholder="Min (ms)"
                                        aria-label="First name">
                                </div>
                                <div class="col-md-4">
                                    <input type="text" class="form-control form-control-lg" placeholder="Max (ms)"
                                        aria-label="Text Messages (1-1000)">
                                </div>
                                <div class="col-md-4">
                                    <input type="text" class="form-control form-control-lg" placeholder="Average (ms)"
                                        aria-label="TPayload Length (40-1456)">
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