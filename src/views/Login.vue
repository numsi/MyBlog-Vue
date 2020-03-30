<template>
    <body id="paper">
    <el-form :model="loginForm" :rules="rules" class="login-container" label-position="left"
             label-width="0px" v-loading="loading">
        <h3 class="login_title">系统登录</h3>
        <el-form-item prop="username">
            <el-input type="text" v-model="loginForm.username"
                      auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="user_password">
            <el-input type="password" v-model="loginForm.password" :type="pwdType"
                      auto-complete="off" placeholder="密码">

            <i slot="suffix" class="el-icon-view" @click="showPwd"></i>
            </el-input>

        </el-form-item>
        <el-form-item>
            <el-button type="primary" style="width: 40%;background: #505458;border: none" v-on:click="login">登录</el-button>
            <router-link to="register"><el-button type="primary" style="width: 40%;background: #505458;border: none">注册</el-button></router-link>
        </el-form-item>
    </el-form>
    </body>
</template>

<script>
    export default {
        name: "Login",
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
                pwdType:''
            }
        },
        methods: {
            login() {
                if(this.loginForm.username=="admin"&&this.loginForm.password=="123456"){
                    this.$message.success("登录成功")
                    this.$router.push("/home")
                }else {
                    this.$message.error("账号密码错误")
                    //清空账号密码
                    this.loginForm.username=""
                    this.loginForm.password=""
                    // this.$router.push("/login")
                }

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