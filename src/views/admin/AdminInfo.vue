<template>
    <div class="app-container common-list-page">
        <span style="font-size: 40px"><strong>密码修改</strong></span>
        <el-divider content-position="left"></el-divider>
        <el-form
                :model="resetForm"
                :rules="resetFormRules"
                ref="resetForm"
                status-icon
                label-width="100px"
        >
            <el-form-item label="旧密码：" prop="password">
                <el-input type="password" v-model="resetForm.password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码：" prop="newpwd">
                <el-input type="password" v-model="resetForm.newpwd" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码：" prop="newpassword1">
                <el-input type="password" v-model="resetForm.newpassword1" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱：" prop="email">
                <el-input type="text" v-model="resetForm.email" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click.native.prevent="toAmend">确认修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "AdminInfo",
        data() {
            var validatePass = (rule, value, callback) => {
                if (!value) {
                    callback(new Error("请输入新密码"));
                } else if (value.toString().length < 6 || value.toString().length > 18) {
                    callback(new Error("密码长度为6-18位"));
                } else {
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请再次输入密码"));
                } else if (value !== this.resetForm.newpwd) {
                    callback(new Error("两次输入密码不一致!"));
                } else {
                    callback();
                }
            };
            return {
                resetForm: {
                    //传给后台所需要的参数
                    newpassword1: "",
                    password: "",
                    username: "",//此处只是后台需要的字段而已，如果前期有公用cookie里面有获取并且保存过，现在需要另外调用进来，具体的获取方法就看个人了
                    email:""
                },
                resetFormRules: {
                    password: [
                        { required: true, message: "请输入旧密码", trigger: 'blur' }
                    ],
                    newpwd: [
                        { required: true, validator: validatePass, trigger: 'blur' }
                    ],
                    newpassword1: [
                        { required: true, validator: validatePass2, trigger: "blur" }
                    ],
                    email: [
                        { required: true, message: "请输入邮箱", trigger: 'blur' }
                    ],
                }
            };
        },
        methods: {
            toAmend() {


                let _this = this;
                let uid = this.$store.state.uid;
                let username = this.$store.state.username;

                this.$axios
                    .post('/admin/login', {
                        adminName: "admin",
                        adminPassword: this.resetForm.password
                    })
                    .then(resp => {
                        if (resp.data.code === 200) {
                            let data = resp.data.result
                            // _this.$store.commit('login', data)

                            _this.$axios.post('/admin/update',{
                                adminId:data.adminId,
                                adminName: "admin",
                                adminPassword: _this.resetForm.newpassword1,
                                adminEmail:_this.resetForm.email,
                            }).then(resp => {
                                if (resp && resp.data.code === 200) {
                                    let data = resp.data.result
                                    // _this.$store.commit('login', data)
                                    console.log(data);
                                    _this.$message("信息修改成功");
                                    this.$router.push("/adminHome");
                                }
                            })


                        } else {
                            this.$message("原密码错误")
                        }
                        // console.log(resp);
                    })
                    .catch(failResponse => {})
            },
            //这是修改成功后重新返回登陆页的方法，看个人需要自行调整
            // async logout() {
            //     await this.$store.dispatch("user/logout");
            //     this.$router.push(`/login`);
            // }
        }
    }
</script>

<style scoped>
    .el-form {
        width: 60%;
        margin: 50px auto 0;
        text-align: center;
    button {
        margin: 20px 0 0;
    }
    }

</style>