
<template>
    <div class="">
        <div class="container">
            <div class="row m-5 no-gutters rounded shadow-lg">
                <div class="col-md-6 d-none d-md-block">
                    <img src="../../assets//SlogrWhiteboard.png" class="img-fluid shadow-sm" style="min-height:100%;" />
                </div>
                <div class="col-md-6 bg-white p-5">
                    <h1 class="pb-3">
                        <RouterLink to="/"><img src="../../assets/group-2420.svg" alt=""></RouterLink>
                    </h1>
                    <div class="my-5">
                        <span>Welcome to Back,</span>
                        <h3>Sign In to Slogr</h3>
                    </div>
                    <div class="form-style">
                        <form @submit.prevent="login">
                            <div class="form-group pb-3">
                                <label for="exampleInputEmail1">Email Address</label>
                                <input type="email" placeholder="Benjaminrobert77@email.com"
                                    class="form-control form-control-lg" name="email" v-model="this.email"
                                    aria-describedby="emailHelp">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" placeholder="Password" class="form-control form-control-lg"
                                    name="password" v-model="this.password">
                            </div>
                            <div class="">
                                <button type="submit" class="signInBtn w-100 my-5">Login In</button>
                            </div>
                        </form>
                        <div class="sideline mb-2">Or Sign In With</div>
                        <div class="d-flex justify-content-between align-items-center ">
                            <button class="socialBtn w-100 me-2"><i class="fa-brands fa-google fa-2xl"
                                    style="color: var(--primary_color);"></i> Google</button>
                            <button class="socialBtn w-100"><i class="fa-brands fa-facebook-f fa-2xl"
                                    style="color: var(--primary_color);"></i> Facebook</button>
                            <button @click="loginWithLinkedIn" class="socialBtn w-100 me-2">
                                <i class="fa-brands fa-linkedin-in fa-2xl" style="color: var(--primary_color);"></i>
                                LinkedIn
                            </button>
                            <!-- <button @click="linkedInLogin">test</button> -->
                        </div>
                        <div class="pt-4 text-center">
                            Create Account. <RouterLink to="/signUp">Sign Up</RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { RouterLink } from 'vue-router';
import { useLinkedIn, LinkedInCallback } from "vue3-linkedin-login";


export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        async login(e) {
            e.preventDefault()
            const payload = {
                email: this.email,
                password: this.password
            }
            console.log('payload0', payload)
            // Call the login action

            try {
                await this.$store.dispatch('login', payload);
            } catch (error) {
                console.log(error)
            }
        },
        // async loginWithLinkedIn() {
        //     console.log('linkedin-click')
        //     const { linkedInLogin } = useLinkedIn({
        //         clientId: "77fwe8ov6j4xbm",
        //         redirectUri: "http://localhost:5173/signin-linkedin",
        //     });
        //     linkedInLogin();
        //     // window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77fwe8ov6j4xbm&redirect_uri=http://localhost:5173/signin-linkedin&state=STATE&scope=r_liteprofile%20r_emailaddress`;
        // }
        async loginWithLinkedIn() {
            // Redirect to LinkedIn authorization URL when the button is clicked
            const { linkedInLogin } = useLinkedIn({
                clientId: "77fwe8ov6j4xbm",
                redirectUri: "http://localhost:5173/login",
                onSuccess: this.handleLinkedInSuccess,
                onError: this.handleLinkedInError,
                scope: "r_emailaddress r_liteprofile",
            });

            // Call the LinkedIn login function
            linkedInLogin();
        },
        async handleLinkedInSuccess(code) {
            console.log('------------------------111-------------------------')
            // Exchange LinkedIn authorization code for an access token
            const { exchangeCodeForToken, getAccount, getMail } = useLinkedIn({
                clientId: "77fwe8ov6j4xbm",
                clientSecret: "6MIfn4V1ev5GpJ2R",
                redirectUri: "http://localhost:5173/login",
            });

            // Handle the LinkedIn success callback
            try {
                const exchangeCode = await exchangeCodeForToken(code);

                // Get user account information
                const account = await getAccount(exchangeCode.access_token);

                // Get user email information
                const email = await getMail(exchangeCode.access_token);

                if (!account || !email) {
                    console.error('Failed to retrieve account or email information.');
                    return;
                }
                
                console.log('account', account)
                console.log('email', email)
                console.log('--------------11-------------------')

                // Extract relevant user information
                const firstName = account.localizedFirstName;
                const lastName = account.localizedLastName;
                const emailAddress = email.elements[0]['handle~'].emailAddress;

                const user = {
                    firstName,
                    lastName,
                    emailAddress,
                };

                console.log('LinkedIn login successful. User data:', user);
            } catch (error) {
                console.error('Error during LinkedIn login:', error);
            }
        },
        handleLinkedInError(error) {
            console.error("LinkedIn login error:", error);
        },


    },
    mounted() {
        // const { exchangeCodeForToken, getAccount, getMail } = useLinkedIn({
        //     clientId: "77fwe8ov6j4xbm",
        //     clientSecret: "6MIfn4V1ev5GpJ2R",
        //     redirectUri: "http://localhost:5173/signin-linkedin",
        //     onSuccess: async (code) => {
        //         try {
        //             // Exchange LinkedIn authorization code for an access token
        //             const exchangeCode = await exchangeCodeForToken(code);

        //             // Get user account information
        //             const account = await getAccount(exchangeCode.access_token);

        //             // Get user email information
        //             const email = await getMail(exchangeCode.access_token);

        //             if (!account || !email) {
        //                 console.error("Failed to retrieve account or email information.");
        //                 return;
        //             }

        //             // Extract relevant user information
        //             const firstName = account.localizedFirstName;
        //             const lastName = account.localizedLastName;
        //             const emailAddress = email.elements[0]["handle~"].emailAddress;

        //             const user = {
        //                 firstName,
        //                 lastName,
        //                 emailAddress,
        //             };

        //             console.log(user);
        //         } catch (error) {
        //             console.error("LinkedIn login error:", error);
        //         }
        //     },
        //     scope: "r_emailaddress r_liteprofile",
        //     onError: (error) => {
        //         console.error("LinkedIn initialization error:", error);
        //     },
        // });

        LinkedInCallback();
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
    color: #ccc;
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

.socialBtn {
    padding: 14px 0;
    border-radius: 8px;
    border: 1px solid var(--secondary_color);
    background-color: var(--white_color);
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.socialBtn:hover {
    border: 1px solid var(--primary_color);
}

.signInBtn {
    padding: 14px 0;
    border-radius: 8px;
    border: 1px solid var(--primary_color);
    background-color: var(--primary_color);
    cursor: pointer;
    transition: background-color 0.3s ease;
    color: var(--white_color);
}

.signInBtn:hover {
    background-color: var(--primary_color_Hover);
}
</style>
