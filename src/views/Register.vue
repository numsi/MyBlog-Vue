<template>
    <body id="register">
        <el-form ref="registerForm" :rules="rules" :model="registerForm" label-width="80px"
                 class="register-container" label-position="left">
        <!--<el-form  :rules="rules" label-width="80px">-->
            <el-form-item label="账号" prop="user_name">
                <el-input type="text" v-model="registerForm.user_name"
                          auto-complete="off" placeholder="账号">
                </el-input>
            </el-form-item>
            <el-form-item label="用户昵称" prop="user_nickname">
                <el-input type="text" v-model="registerForm.user_nickname"
                          auto-complete="off" placeholder="昵称">
                </el-input>
            </el-form-item>
            <el-form-item label="密码" prop="user_password">
                <el-input type="password" v-model="registerForm.user_password"
                          auto-complete="off" placeholder="密码"
                >
                </el-input>
            </el-form-item>
            <el-form-item  label="确认密码" prop="rePassword">
                <el-input type="password" v-model="registerForm.rePassword"
                          auto-complete="off" placeholder="确认密码"
                >
                </el-input>
            </el-form-item>


            <el-form-item>
                <el-button type="primary" @click="onSubmit('registerForm')">注册</el-button>
                <router-link to="login"><el-button>返回登录</el-button></router-link>
            </el-form-item>
        </el-form>
    </body>
</template>

<script>
    export default {
        name: "Register",
        data() {
            let validPwd=(rule,value,callback)=>{
                if (value === "") {
                    callback(new Error("请输入确认密码"));
                } else if (value !== this.registerForm.user_password) {
                    callback(new Error("两次输入密码不一致！"));
                } else {
                    callback();
                }
            };
            return {
                rules: {
                    user_name: [
                        {required: true, message: '用户名不能为空', trigger: 'blur'},
                        {max:20,min:6,message:"最少6位最多20位",trigger: 'blur'}
                    ],
                    user_password: [
                        {required: true, message: '密码不能为空', trigger: 'blur'},
                        {max:10,min:0,message:"最多10位",trigger: 'blur'}
                    ],
                    user_nickname: [
                        {required: true, message: '昵称不能为空', trigger: 'blur'},
                        {max:8,min:0,message:"最多8位",trigger: 'blur'}
                    ],
                    rePassword: [{required: true, validator: validPwd, trigger: 'blur'}]
                },
                registerForm: {
                    user_name: '',
                    user_password: '',
                    user_nickname:'',
                    rePassword:'',
                },
                // rePassword:''
            }
        },
        methods: {
            onSubmit(formName) {
                let _this = this;
                this.$axios
                    .post('/user/add', {
                        userUsername: this.registerForm.user_name,
                        userPassword: this.$md5(this.registerForm.user_password),
                        userNickname: this.registerForm.user_nickname,
                    })
                    .then(resp => {
                        if (resp.data.code === 200) {
                            this.$alert('注册成功', '提示', {
                                confirmButtonText: '确定'
                            })
                            _this.$router.replace('/login')
                        } else {
                            this.$alert(resp.data.message, '提示', {
                                confirmButtonText: '确定'
                            })
                        }
                    })
                    .catch(failResponse => {})
            }
        },


    }
</script>

<style scoped>
    #register{
        background-position: center;
        height: 100%;
        width: 100%;
        background-size: cover;
        position: fixed;
    }
    .register-container {
        border-radius: 15px;
        background-clip: padding-box;
        margin: 90px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

</style>