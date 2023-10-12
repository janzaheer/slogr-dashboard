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
                                <h3 class="text-secondary ms-3 mt-2">Sentinel</h3>
                            </div>
                            <div class="d-flex align-items-center">
                                <h6 class="mx-1 mt-2 text-muted">Home </h6>
                                <h6 class="me-4 mt-2"> - Sentinel</h6>
                                <button class="addBtn" data-bs-toggle="modal" data-bs-target="#staticBackdrop2"> <i
                                        class="fa-solid fa-plus fa-lg"></i> Add New Sentinel</button>
                                <div class="mx-3"><i class="fa-solid fa-ellipsis fa-2xl"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-fluid tableDiv">
                <div class="row g-2">
                    <div id="col1" class="col-12">
                        <div class="card mx-md-2 mt-4 mb-5">
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table text-center">
                                        <thead>
                                            <tr>
                                                <th scope="col"><a href="#" class="tableHead" data-bs-toggle="dropdown"
                                                        aria-expanded="false">Home <i class="fa-solid fa-filter" style="color: var(--dark_gray_color);"></i></a>
                                                    <ul class="dropdown-menu shadow px-2">
                                                        <li lass="dropdown-item">
                                                            <div class="my-2">
                                                                <div class="d-flex justify-content-between">
                                                                    <p>Name</p>
                                                                    <p class="pointer">X</p>
                                                                </div>

                                                                <input type="text" class="form-control form-control-sm"
                                                                    placeholder="search name...">
                                                            </div>
                                                            <button class="ApplyBtn w-100 mb-2">Apply</button>
                                                        </li>
                                                    </ul>
                                                </th>
                                                <th scope="col"><a href="#"
                                                        class="tableHead" data-bs-toggle="dropdown" aria-expanded="false">Ip
                                                        Address <i class="fa-solid fa-filter" style="color: var(--dark_gray_color);"></i></a>
                                                    <ul class="dropdown-menu shadow px-2">
                                                        <li lass="dropdown-item">
                                                            <div class="my-2">
                                                                <div class="d-flex justify-content-between">
                                                                    <p>Ip Address Form:</p>
                                                                    <p class="pointer">X</p>
                                                                </div>
                                                                <input type="text" class="form-control"
                                                                    placeholder="66655443222">
                                                            </div>
                                                        </li>
                                                        <li lass="dropdown-item">
                                                            <div class="my-3">
                                                                <label for="exampleFormControlInput1" class="form-label">Ip
                                                                    Address
                                                                    To:</label>
                                                                <input type="text" class="form-control"
                                                                    id="exampleFormControlInput1" placeholder="12345677776">
                                                            </div>
                                                            <button class="ApplyBtn w-100 mb-2">Apply</button>
                                                        </li>
                                                    </ul>
                                                </th>
                                                <th scope="col"><a href="#"
                                                        class="tableHead" data-bs-toggle="dropdown"
                                                        aria-expanded="false">System
                                                        Information <i class="fa-solid fa-filter" style="color: var(--dark_gray_color);"></i></a>
                                                    <ul class="dropdown-menu shadow px-2">
                                                        <li lass="dropdown-item">
                                                            <div class="my-2">
                                                                <div class="d-flex justify-content-between">
                                                                    <label for="exampleFormControlInput1"
                                                                        class="form-label">System
                                                                        Information</label>
                                                                    <p class="pointer">X</p>
                                                                </div>
                                                                <div class="mb-3">
                                                                    <input type="text" class="form-control"
                                                                        id="exampleFormControlInput1"
                                                                        placeholder="search System Information...">
                                                                </div>
                                                            </div>
                                                            <button class="ApplyBtn w-100 mb-2">Apply</button>
                                                        </li>
                                                    </ul>
                                                </th>
                                                <th scope="col"><a href="#"
                                                        class="tableHead" data-bs-toggle="dropdown" aria-expanded="false">
                                                        Deployed
                                                        at <i class="fa-solid fa-filter" style="color: var(--dark_gray_color);"></i></a>
                                                    <ul class="dropdown-menu shadow px-2">
                                                        <li lass="dropdown-item">
                                                            <div class="my-2">
                                                                <div class="d-flex justify-content-between">
                                                                    <label for="exampleFormControlInput1"
                                                                        class="form-label">Deployed at:</label>
                                                                    <p class="pointer">X</p>
                                                                </div>
                                                                <input type="text" class="form-control"
                                                                    placeholder="search here...">
                                                            </div>
                                                            <button class="ApplyBtn w-100 mb-2">Apply</button>
                                                        </li>
                                                    </ul>
                                                </th>
                                                <th scope="col"><a href="#"
                                                        class="tableHead" data-bs-toggle="dropdown"
                                                        aria-expanded="false">City <i class="fa-solid fa-filter" style="color: var(--dark_gray_color);"></i></a>
                                                    <ul class="dropdown-menu shadow px-2">
                                                        <li lass="dropdown-item">
                                                            <div class="my-2">
                                                                <div class="d-flex justify-content-between">
                                                                    <label for="exampleFormControlInput1"
                                                                        class="form-label">City</label>
                                                                    <p class="pointer">X</p>
                                                                </div>
                                                                <select class="form-select form-select-sm"
                                                                    aria-label=".form-select-sm example">
                                                                    <option selected>City</option>
                                                                    <option value="1">Quetta</option>
                                                                    <option value="2">Nushki</option>
                                                                    <option value="3">Sialkot</option>
                                                                </select>
                                                            </div>
                                                            <button class="ApplyBtn w-100 mb-2">Apply</button>
                                                        </li>
                                                    </ul>
                                                </th>
                                                <th scope="col"><a href="#"
                                                        class="tableHead" data-bs-toggle="dropdown"
                                                        aria-expanded="false">Country <i class="fa-solid fa-filter" style="color: var(--dark_gray_color);"></i></a>
                                                    <ul class="dropdown-menu shadow px-2">
                                                        <li lass="dropdown-item">
                                                            <div class="my-2">
                                                                <div class="d-flex justify-content-between">
                                                                    <label for="exampleFormControlInput1"
                                                                        class="form-label">Country</label>
                                                                    <p class="pointer">X</p>
                                                                </div>
                                                                <select class="form-select form-select-sm"
                                                                    aria-label=".form-select-sm example">
                                                                    <option selected>Country</option>
                                                                    <option value="1">Pakistan</option>
                                                                    <option value="2">Australia</option>
                                                                    <option value="3">England</option>
                                                                </select>
                                                            </div>
                                                            <button class="ApplyBtn w-100 mb-2">Apply</button>
                                                        </li>
                                                    </ul>
                                                </th>
                                                <th scope="col"></th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="data in agents" :key="data">
                                                <td>
                                                    <p class="tableP">{{ data.name }}</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">{{ data.ipaddress }}</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">-</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">us-west1-a</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">{{ data.location }}</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">United States of America</p>
                                                </td>
                                                <td class="fs-5"><a href="#" class="text-decoration-none text-dark tableP"
                                                        data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                                                        @click="handleUpdateModalData(data.id, data.name)"> <i
                                                            class="fa-solid fa-pen-to-square fa-lg"></i></a></td>
                                                <td class="fs-5"><a href="#" class="text-decoration-none text-dark tableP"
                                                        @click="handleGrids(data.id, data.name)">
                                                        <i class="fa-solid fa-chevron-right"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p class="tableP">SJC-1 T1 Node</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">45.325.326.32</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">-------------</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">us-west1-a</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">The Dalles</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">United States of America</p>
                                                </td>
                                                <td class="fs-5"><a href="#" class="text-decoration-none text-dark tableP"
                                                        data-bs-toggle="modal" data-bs-target="#staticBackdrop"> <i
                                                            class="fa-solid fa-pen-to-square fa-lg"></i></a></td>
                                                <td class="fs-5"><a href="#" class="text-decoration-none text-dark tableP">
                                                        <i class="fa-solid fa-chevron-right"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p class="tableP">SJC-1 T1 Node</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">45.325.326.32</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">-------------</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">us-west1-a</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">The Dalles</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">United States of America</p>
                                                </td>
                                                <td class="fs-5"><a href="#" class="text-decoration-none text-dark"
                                                        data-bs-toggle="modal" data-bs-target="#staticBackdrop"> <i
                                                            class="fa-solid fa-pen-to-square fa-lg"></i></a></td>
                                                <td class="fs-5"><a href="#" class="text-decoration-none text-dark tableP">
                                                        <i class="fa-solid fa-chevron-right"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p class="tableP">SJC-1 T1 Node</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">45.325.326.32</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">-------------</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">us-west1-a</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">The Dalles</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">United States of America</p>
                                                </td>
                                                <td class="fs-5"><a href="#" class="text-decoration-none text-dark"
                                                        data-bs-toggle="modal" data-bs-target="#staticBackdrop"> <i
                                                            class="fa-solid fa-pen-to-square fa-lg"></i></a></td>
                                                <td class="fs-5"><a href="#" class="text-decoration-none text-dark tableP">
                                                        <i class="fa-solid fa-chevron-right"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p class="tableP">SJC-1 T1 Node</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">45.325.326.32</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">-------------</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">us-west1-a</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">The Dalles</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">United States of America</p>
                                                </td>
                                                <td class="fs-5"><a href="#" class="text-decoration-none text-dark"
                                                        data-bs-toggle="modal" data-bs-target="#staticBackdrop"> <i
                                                            class="fa-solid fa-pen-to-square fa-lg"></i></a></td>
                                                <td class="fs-5"><a href="#" class="text-decoration-none text-dark tableP">
                                                        <i class="fa-solid fa-chevron-right"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p class="tableP">SJC-1 T1 Node</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">45.325.326.32</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">-------------</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">us-west1-a</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">The Dalles</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">United States of America</p>
                                                </td>
                                                <td class="fs-5"><a href="#" class="text-decoration-none text-dark"
                                                        data-bs-toggle="modal" data-bs-target="#staticBackdrop"> <i
                                                            class="fa-solid fa-pen-to-square fa-lg"></i></a></td>
                                                <td class="fs-5"><a href="#" class="text-decoration-none text-dark tableP">
                                                        <i class="fa-solid fa-chevron-right"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p class="tableP">SJC-1 T1 Node</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">45.325.326.32</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">-------------</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">us-west1-a</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">The Dalles</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">United States of America</p>
                                                </td>
                                                <td class="fs-5"><a href="#" class="text-decoration-none text-dark"
                                                        data-bs-toggle="modal" data-bs-target="#staticBackdrop"> <i
                                                            class="fa-solid fa-pen-to-square fa-lg"></i></a></td>
                                                <td class="fs-5"><a href="#" class="text-decoration-none text-dark tableP">
                                                        <i class="fa-solid fa-chevron-right"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p class="tableP">SJC-1 T1 Node</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">45.325.326.32</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">-------------</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">us-west1-a</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">The Dalles</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">United States of America</p>
                                                </td>
                                                <td class="fs-5"><a href="#" class="text-decoration-none text-dark"
                                                        data-bs-toggle="modal" data-bs-target="#staticBackdrop"> <i
                                                            class="fa-solid fa-pen-to-square fa-lg"></i></a></td>
                                                <td class="fs-5"><a href="#" class="text-decoration-none text-dark tableP">
                                                        <i class="fa-solid fa-chevron-right"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p class="tableP">SJC-1 T1 Node</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">45.325.326.32</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">-------------</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">us-west1-a</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">The Dalles</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">United States of America</p>
                                                </td>
                                                <td class="fs-5"><a href="#" class="text-decoration-none text-dark"
                                                        data-bs-toggle="modal" data-bs-target="#staticBackdrop"> <i
                                                            class="fa-solid fa-pen-to-square fa-lg"></i></a></td>
                                                <td class="fs-5"><a href="#" class="text-decoration-none text-dark tableP">
                                                        <i class="fa-solid fa-chevron-right"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p class="tableP">SJC-1 T1 Node</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">45.325.326.32</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">-------------</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">us-west1-a</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">The Dalles</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">United States of America</p>
                                                </td>
                                                <td class="fs-5"><a href="#" class="text-decoration-none text-dark"
                                                        data-bs-toggle="modal" data-bs-target="#staticBackdrop"> <i
                                                            class="fa-solid fa-pen-to-square fa-lg"></i></a></td>
                                                <td class="fs-5"><a href="#" class="text-decoration-none text-dark tableP">
                                                        <i class="fa-solid fa-chevron-right"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p class="tableP">SJC-1 T1 Node</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">45.325.326.32</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">-------------</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">us-west1-a</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">The Dalles</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">United States of America</p>
                                                </td>
                                                <td class="fs-5"><a href="#" class="text-decoration-none text-dark"
                                                        data-bs-toggle="modal" data-bs-target="#staticBackdrop"> <i
                                                            class="fa-solid fa-pen-to-square fa-lg"></i></a></td>
                                                <td class="fs-5"><a href="#" class="text-decoration-none text-dark tableP">
                                                        <i class="fa-solid fa-chevron-right"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p class="tableP">SJC-1 T1 Node</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">45.325.326.32</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">-------------</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">us-west1-a</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">The Dalles</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">United States of America</p>
                                                </td>
                                                <td class="fs-5"><a href="#" class="text-decoration-none text-dark"
                                                        data-bs-toggle="modal" data-bs-target="#staticBackdrop"> <i
                                                            class="fa-solid fa-pen-to-square fa-lg"></i></a></td>
                                                <td class="fs-5"><a href="#" class="text-decoration-none text-dark tableP">
                                                        <i class="fa-solid fa-chevron-right"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p class="tableP">SJC-1 T1 Node</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">45.325.326.32</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">-------------</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">us-west1-a</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">The Dalles</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">United States of America</p>
                                                </td>
                                                <td class="fs-5"><a href="#" class="text-decoration-none text-dark"
                                                        data-bs-toggle="modal" data-bs-target="#staticBackdrop"> <i
                                                            class="fa-solid fa-pen-to-square fa-lg"></i></a></td>
                                                <td class="fs-5"><a href="#" class="text-decoration-none text-dark tableP">
                                                        <i class="fa-solid fa-chevron-right"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p class="tableP">SJC-1 T1 Node</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">45.325.326.32</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">-------------</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">us-west1-a</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">The Dalles</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">United States of America</p>
                                                </td>
                                                <td class="fs-5"><a href="#" class="text-decoration-none text-dark"
                                                        data-bs-toggle="modal" data-bs-target="#staticBackdrop"> <i
                                                            class="fa-solid fa-pen-to-square fa-lg"></i></a></td>
                                                <td class="fs-5"><a href="#" class="text-decoration-none text-dark tableP">
                                                        <i class="fa-solid fa-chevron-right"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p class="tableP">SJC-1 T1 Node</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">45.325.326.32</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">-------------</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">us-west1-a</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">The Dalles</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">United States of America</p>
                                                </td>
                                                <td class="fs-5"><a href="#" class="text-decoration-none text-dark"
                                                        data-bs-toggle="modal" data-bs-target="#staticBackdrop"> <i
                                                            class="fa-solid fa-pen-to-square fa-lg"></i></a></td>
                                                <td class="fs-5"><a href="#" class="text-decoration-none text-dark tableP">
                                                        <i class="fa-solid fa-chevron-right"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p class="tableP">SJC-1 T1 Node</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">45.325.326.32</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">-------------</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">us-west1-a</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">The Dalles</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">United States of America</p>
                                                </td>
                                                <td class="fs-5"><a href="#" class="text-decoration-none text-dark"
                                                        data-bs-toggle="modal" data-bs-target="#staticBackdrop"> <i
                                                            class="fa-solid fa-pen-to-square fa-lg"></i></a></td>
                                                <td class="fs-5"><a href="#" class="text-decoration-none text-dark tableP">
                                                        <i class="fa-solid fa-chevron-right"></i></a></td>
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
                                            <div class="pageNumber">-</div>
                                            <div class="pageNumber">-</div>
                                            <div class="pageNumber pageBtn">{{ pages.currentPage }}</div>
                                            <div class="pageNumber">-</div>
                                            <div class="pageNumber">-</div>
                                            <button class="nextBtn">Next <i class="fa-solid fa-angle-right"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="col2" class="col-2 d-none">
                        <div class="card mt-4 mb-5">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <p class="card-text ms-2">Minio-SJC1</p>
                                        <span class="text-secondary ms-2" style="font-size: 13px;">SJC-1C-node </span> <br>
                                        <span class="text-secondary ms-2" style="font-size: 13px;">Data</span>
                                    </div>
                                    <div>
                                        <RouterLink to="/sentinelReports"><i class="fa-solid fa-chevron-right me-1 text-secondary"></i></RouterLink>
                                    </div>
                                </div>
                                <hr class="">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <p class="card-text ms-2">Minio-SJC1</p>
                                        <span class="text-secondary ms-2" style="font-size: 13px;">SJC-1C-node </span> <br>
                                        <span class="text-secondary ms-2" style="font-size: 13px;">Data</span>
                                    </div>
                                    <div>
                                        <RouterLink to="/sentinelReports"><i class="fa-solid fa-chevron-right me-1 text-secondary"></i></RouterLink>
                                    </div>
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

    <!-- Modal  Add new sentinel-->
    <div class="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdrop2Label" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="my-2 text-center">
                        <h2 class="text-secondary">Add Sentinel</h2>
                        <p class="modelText">Add new Sentinel</p>
                    </div>
                    <div class="">
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label ms-1">Name</label>
                            <input type="text" class="form-control form-control-lg" id="exampleFormControlInput1"
                                placeholder="Enter Name" v-model="addSentinel.name">
                            <span class="text-danger" v-if="!addSentinel.name">This field is required.</span>
                        </div>
                        <div class="d-flex justify-content-end">
                            <button type="button" id="AddCancelButton" class="modelCancelBtn"
                                data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="modelSaveBtn ms-2" @click="handleSentinelCreation">Save</button>
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
                <div class="modal-body">
                    <div class="my-2 text-center">
                        <h2 class="text-secondary">Edit Sentinel</h2>
                        <p class="modelText">Enter your Sentinel Below Field</p>
                    </div>
                    <div class="">
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label ms-1">Name</label>
                            <input type="text" class="form-control form-control-lg" id="exampleFormControlInput1"
                                placeholder="Enter Name" v-model="updateData.name">
                            <span class="text-danger" v-if="!updateData.name">This field is required.</span>
                        </div>
                        <div class="d-flex justify-content-end">
                            <button type="button" id="EditCancelButton" class="modelCancelBtn"
                                data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="modelSaveBtn ms-2" @click="handleSentinelUpdate">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '../common/Header.vue';
import { createAgent, agentUpdate, agentList } from '../../services/agent_services'
export default {
    name: 'Sentinel',
    components: {
        Header
    },
    data() {
        return {
            addSentinel: {
                name: null
            },
            updateData: {
                id: null,
                name: null
            },
            editName: null,
            agents: [],
            pages: {
                currentPage: 1,
                previousPage: 0,
                nextPage: null
            },
            selectedGridId: 0,
            selectedGridName: null
        }
    },
    async mounted() {
        await this.handleSentinelListing()

    },
    methods: {
        async handleSentinelListing() {
            const respData = await agentList()
            this.agents = respData.data.agents
            this.pages.previousPage = respData.data.prev || 0
            this.pages.currentPage = this.pages.previousPage + 1
            this.pages.nextPage = respData.data.prev
        },
        async handleSentinelCreation() {
            if (this.addSentinel.name) {
                const payload = { name: this.addSentinel.name }
                await createAgent(payload)
                await this.handleSentinelListing()

                document.getElementById('AddCancelButton').click();
                this.addSentinel.name = null;
            }
        },
        handleUpdateModalData(id, name) {
            this.updateData.id = id
            this.updateData.name = name
        },
        async handleSentinelUpdate() {
            if (this.updateData.name) {
                const payload = { aid: this.updateData.id, name: this.updateData.name }
                await agentUpdate(payload)
                await this.handleSentinelListing()

                document.getElementById('EditCancelButton').click();
                this.updateData.name = null;
                this.updateData.id = null;
            }
        },
        handleGrids(selectedId, selectedName) {
            let col1 = document.getElementById('col1')
            let col2 = document.getElementById('col2')
            if (selectedId == this.selectedGridId) {
                if (col2.classList.contains('d-none')) {
                    col1.classList.remove("col-12")
                    col1.classList.add("col-10")
                    col2.classList.remove("d-none")
                } else {
                    col1.classList.add("col-12")
                    col1.classList.remove("col-10")
                    col2.classList.add("d-none")
                }
            } else {
                col1.classList.remove("col-12")
                col1.classList.add("col-10")
                col2.classList.remove("d-none")
            }
            this.selectedGridId = selectedId
            this.selectedGridName = selectedName
        }
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

/* .sentinel {
    margin-top: 40px;
} */

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

/* Style the label text */
.form-check-label {
    font-weight: normal;
    /* Make the label text normal weight */
    color: #333;
    /* Change the label text color */
}

/* Style the checkbox when checked */
.form-check-input:checked {
    background-color: #8CB63D !important;
    /* Change the background color when checked */
    border: 1px solid #8CB63D !important;
    /* Change the border color when checked */
}</style>
