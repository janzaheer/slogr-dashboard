<script>
export default {
    name: 'Login',
    data() {
        return {

        }
    },
    methods: {

    },
    mounted() {

    }
}
</script>

<style>
/* .form-style input{
	border:0;
	height:50px;
	border-radius:0;
border-bottom:1px solid #ebebeb;	
}
.form-style input:focus{
border-bottom:1px solid #007bff;	
box-shadow:none;
outline:0;
background-color:#ebebeb;	
} */
.sideline {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
	color:#ccc;
}
/* button{
height:50px;	
} */
.sideline:before,
.sideline:after {
    content: '';
    border-top: 1px solid #ebebeb;
    margin: 0 20px 0 0;
    flex: 1 0 20px;
}

.sideline:after {
    margin: 0 0 0 20px;
}
</style>

<template>
    <div>
        <div class="container">
            <div class="row m-5 no-gutters shadow-lg">
                <div class="col-md-6 d-none d-md-block">
                    <img src="https://images.unsplash.com/photo-1566888596782-c7f41cc184c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80"
                        class="img-fluid" style="min-height:100%;" />
                </div>
                <div class="col-md-6 bg-white p-5">
                    <h1 class="pb-3"><RouterLink to="/"><img src="../../assets/group-2420.svg" alt=""></RouterLink></h1>
                    <div class="my-5">
                        <span>Welcome to Back,</span>
                        <h3>Sign In to Slogr</h3>
                    </div>
                    <div class="form-style">
                        <form>
                            <div class="form-group pb-3">
                                <label for="exampleInputEmail1">Email Address</label>
                                <input type="email" placeholder="Email" class="form-control" id="exampleInputEmail1"
                                    aria-describedby="emailHelp">
                            </div>
                            <div class="form-group pb-3">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" placeholder="Password" class="form-control"
                                    id="exampleInputPassword1">
                            </div>
                            <div class="d-flex align-items-center justify-content-between">
                                
                                <div class="d-flex align-items-center"><input name="" type="checkbox" value="" /> <span
                                        class="pl-2 font-weight-bold">Remember Me</span></div>
                                <div><a href="#">Forget Password?</a></div>
                            </div>
                            <div class="pb-2">
                                <button type="submit" class="btn btn-success w-100 font-weight-bold mt-2">Sign In</button>
                            </div>
                        </form>
                        <div class="sideline">Or Sign In With</div>
                        <div>
                            <button type="submit" class="btn btn-primary w-100 font-weight-bold mt-2"><i
                                    class="fa fa-facebook" aria-hidden="true"></i> Login With Facebook</button>
                                    <button type="submit" class="btn btn-primary w-100 font-weight-bold mt-2"><i
                                    class="fa fa-facebook" aria-hidden="true"></i> Login With Google</button>
                        </div>
                        <div class="pt-4 text-center">
                            Get Members Benefit. <a href="#">Sign Up</a>
                        </div>
                    </div>

                </div>
        </div>
    </div>
</div></template>