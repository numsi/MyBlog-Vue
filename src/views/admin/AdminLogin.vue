<template>
    <body id="paper">
    <el-form :model="loginForm" :rules="rules" class="login-container" label-position="left"
             label-width="0px" v-loading="loading">
        <h3 class="login_title">管理员登录</h3>
        <el-form-item prop="username">
            <el-input type="text" v-model="loginForm.username"
                      auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="password" v-model="loginForm.password" :type="pwdType"
                      auto-complete="off" placeholder="密码">

                <i slot="suffix" class="el-icon-view" @click="showPwd"></i>
            </el-input>

        </el-form-item>
        <el-form-item>
            <el-button type="primary" style="width: 40%;background: #505458;border: none" v-on:click="login">登录</el-button>
        </el-form-item>
    </el-form>
    </body>
</template>

<script>
    export default {
        name: "AdminLogin",
        data () {
            return {
                rules: {
                    username: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
                    password: [{required: true, message: '密码不能为空', trigger: 'blur'}]
                },
                // checked: true,
                loginForm: {
                    username: '',
                    password: ''
                },
                loading: false,
                pwdType:'password'
            }
        },
        methods: {
            login() {
                let _this = this;
                if(this.loginForm.username=='' || this.loginForm.password=='')
                {
                    this.$message("请将数据填写完整");
                    return;
                }
                console.log(this.loginForm);
                this.$axios
                    .post('/admin/login', {
                        adminName: this.loginForm.username,
                        adminPassword: this.$md5(this.loginForm.password)
                    })
                    .then(resp => {
                        if (resp.data.code === 200) {
                            let data = resp.data.result
                            // _this.$store.commit('login', data)
                            // console.log(data);
                            // _this.$store.commit('getUid',data.user.userId);
                            _this.$store.commit('getToken',data.token);
                            _this.$router.push("/adminHome");
                        } else {
                            this.$alert(resp.data.message, '提示', {
                                confirmButtonText: '确定'
                            })
                            _this.loginForm.username='';
                            _this.loginForm.password='';
                        }
                        // console.log(resp);
                    })
                    .catch(failResponse => {})

            },
            showPwd () {
                this.pwdType === 'password' ? this.pwdType = '' : this.pwdType = 'password';
                let e = document.getElementsByClassName('el-icon-view')[0];
                this.pwdType == '' ? e.setAttribute('style', 'color: #409EFF') : e.setAttribute('style', 'color: #c0c4cc');
            },
        }
    }
</script>

<style scoped>

    #paper {
        /*background:url("../assets/img/bg/eva1.jpg") no-repeat;*/
        background-position: center;
        height: 100%;
        width: 100%;
        background-size: cover;
        position: fixed;
    }
    body{
        margin: 0;
    }
    .login-container {
        border-radius: 15px;
        background-clip: padding-box;
        margin: 90px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    .login_title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }
</style>