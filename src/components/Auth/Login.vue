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

.sideline {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
	color:#ccc;
}

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
.socialBtn{
    padding: 14px 0;
    border-radius: 8px;
    border: 1px solid var(--secondary_color);
    background-color: var(--white_color);
    cursor: pointer;
    transition: background-color 0.3s ease;
}
.socialBtn:hover{
border: 1px  solid var(--primary_color);
}
.signInBtn{
    padding: 14px 0;
    border-radius: 8px;
    border: 1px solid var(--primary_color);
    background-color: var(--primary_color);
    cursor: pointer;
    transition: background-color 0.3s ease;
    color: var(--white_color);
}
.signInBtn:hover{
    background-color: var(--primary_color_Hover);
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
                                <input type="email" placeholder="Benjaminrobert77@email.com" class="form-control form-control-lg" id="exampleInputEmail1"
                                    aria-describedby="emailHelp">
                            </div>
                            <div class="form-group pb-3">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" placeholder="Password" class="form-control form-control-lg"
                                    id="exampleInputPassword1">
                            </div>
                            <div class="pb-2">
                                <button type="submit" class="signInBtn w-100 my-5">Sign In</button>
                            </div>
                        </form>
                        <div class="sideline mt-1">Or Sign In With</div>
                        <div class="d-flex justify-content-between align-items-center ">
                           <button class="socialBtn w-100 me-2" ><i class="fa-brands fa-google fa-2xl"></i> Google</button>
                           <button class="socialBtn w-100"><i class="fa-brands fa-facebook-f fa-2xl"></i> Facebook</button>
                        </div>
                        <div class="pt-4 text-center">
                            Create Account. <a href="#">Sign Up</a>
                        </div>
                    </div>

                </div>
        </div>
    </div>
</div></template>