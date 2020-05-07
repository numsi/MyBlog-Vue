<template>
    <div>
        <span style="font-size: 40px"><strong>个人资料</strong></span>
        <el-divider content-position="left"></el-divider>
        <el-row :gutter="20">
        <!--头像显示-->
        <el-col :span="3">
            <el-avatar style="width: 100px;height: 100px" size="large" :src="this.userInfo.userImgUrl"></el-avatar>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple">
                {{this.userInfo.userUsername}}
            </div>
        </el-col>

        <el-col :span="3" :offset="11">
            <div class="ShowUser">
                <router-link :to="{name: 'ShowUser', query: {userId: this.userInfo.userId }}">个人主页></router-link>
            </div>
        </el-col>
    </el-row>
        <el-row :gutter="20"  >
            <el-col :span="12" :offset="3">
                <div class="grid-content bg-purple">
                    <div class="showData">
                        <div style="width:100px;height:20px;float:left;">关注数:{{this.followNum}}</div>
                        <div style="width:100px;height:20px;float:left;">粉丝数:{{this.fanNum}}</div>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-divider content-position="left"></el-divider>
        <div v-if="isUpdate">

            <el-form ref="form" :rules="rules" :model="form" label-width="80px" style="" key="EditCandidateFrom">
                <el-form-item label="用户昵称" prop="userNickname">
                    <el-input v-model="form.userNickname" style="width:200px;" ></el-input>
                </el-form-item>
                <el-form-item label="用户邮箱" prop="userEmail">
                    <el-input v-model="form.userEmail" style="width:200px;">></el-input>
                </el-form-item>
                <el-form-item label="用户手机" prop="userPhone">
                    <el-input v-model="form.userPhone" style="width:200px;">></el-input>
                </el-form-item>

                <el-form-item label="用户性别" prop="userGender">
                    <el-radio-group v-model="form.userGender" >
                        <el-radio label="0" >男</el-radio>
                        <el-radio label="1" >女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="个人简介" prop="userIntroduction">
                    <el-input type="textarea" v-model="form.userIntroduction" style="width:250px;">></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即修改</el-button>
                    <el-button @click="toUpdate">取消</el-button>
                </el-form-item>
            </el-form>

            <el-divider content-position="left">头像修改</el-divider>
            <el-upload
                    class="avatar-uploader"
                    action="123"
                    :http-request="upLoad"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </div>
        <div v-if="!isUpdate">

            <el-form  label-width="80px" style="" key="ShowCandidateFrom">
                <!--<a style="cursor:pointer;margin-right: -1000px"  @click="toUpdate">个人主页></a>-->
                <el-form-item label="用户昵称">
                    <el-col :span="3">
                        {{this.userInfo.userNickname}}
                    </el-col>
                    <el-col :span="4" :offset="17">
                        <a style="cursor:pointer;"  @click="toUpdate">修改个人资料></a>
                    </el-col>
                </el-form-item>

                <el-form-item label="用户邮箱">

                    {{this.userInfo.userEmail}}

                </el-form-item>
                <el-form-item label="用户手机">
                    <el-col :span="11">
                        {{this.userInfo.userPhone}}
                    </el-col>
                </el-form-item>

                <el-form-item label="用户性别">
                    <div v-if="this.userInfo.userGender==0">男</div>
                    <div v-if="this.userInfo.userGender==1">女</div>
                </el-form-item>
                <el-form-item label="个人简介">
                    <div v-if="this.userInfo.userIntroduction==null">暂无个人介绍</div>
                    <div v-if="this.userInfo.userIntroduction!=null">{{this.userInfo.userIntroduction}}</div>

                </el-form-item>
            </el-form>
        </div>


    </div>
</template>

<script>
    import InfoUpdate from './InfoUpdate'
    import ImgUpload from './ImgUpload'
    export default {
        name: "InfoManagement",
        data() {
            return {
                rules: {
                    userNickname: [
                        {required: true, message: '昵称不能为空', trigger: 'blur'},
                        {max:8,min:0,message:"最多8位",trigger: 'blur'}
                        ],
                    userEmail: [{required: true, message: '邮箱不能为空', trigger: 'blur'}],
                    userGender: [{required: true, message: '性别不能为空', trigger: 'blur'}],
                    userIntroduction: [{required: true, message: '个人介绍不能为空', trigger: 'blur'}],
                    userPhone: [{required: true, message: '手机不能为空', trigger: 'blur'}]
                },
                dialogVisible: false,
                isUpdate:false,
                form:{
                    userNickname:'',
                    userEmail:'',
                    userGender:'',
                    userIntroduction:'',
                    userPhone:'',
                },
                fanNum: '',
                followNum:'',
                userInfo:{},
                imageUrl:''
            };
        },
        methods:{
            toUpdate()
            {
                this.form={};
                this.isUpdate=!this.isUpdate;
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);


                let _this = this;


            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            loadInfo(){
                let _this = this;
                let uid = this.$store.state.uid;
                this.$axios.get('/user/get/'+uid).then(resp => {
                    if (resp && resp.data.code === 200) {
                        // _this.books = resp.data.result
                        _this.userInfo=resp.data.result;

                    }
                })
            },
            loadFanNum(){
                let _this = this;
                let uid = this.$store.state.uid;

                this.$axios.get('/follow/getFanNum/'+uid).then(resp => {
                    if (resp && resp.data.code === 200) {
                        // _this.books = resp.data.result
                        _this.fanNum=resp.data.result;

                    }
                })
            },
            loadFollowNum(){
                let _this = this;
                let uid = this.$store.state.uid;

                this.$axios.get('/follow/getFollowNum/'+uid).then(resp => {
                    if (resp && resp.data.code === 200) {
                        // _this.books = resp.data.result
                        _this.followNum=resp.data.result;

                    }
                })
            },
            //资料修改
            onSubmit(){
                let _this = this;
                let uid = this.$store.state.uid;
                if(this.form.userNickname==null || this.form.userEmail==null||this.form.userGender==null|| this.form.userIntroduction==null||this.form.userPhone==null)
                {
                    this.$message("请将数据填写完整");
                    return;
                }else {
                    _this.$axios.post('/user/update',{
                        userId:uid,
                        userNickname:_this.form.userNickname,
                        userGender:_this.form.userGender,
                        userPhone:_this.form.userPhone,
                        userEmail:_this.form.userEmail,
                        userIntroduction:_this.form.userIntroduction,
                    }).then(resp => {
                        if (resp && resp.data.code === 200) {
                            let data = resp.data.result
                            // _this.$store.commit('login', data)
                            console.log(data);
                            _this.$store.commit('getUid',data.userId);
                            // _this.$store.commit('getToken',data.userId);
                            _this.$store.commit('getNickname',data.userNickname);
                            _this.$store.commit('getImg',data.userImgUrl);
                            this.$router.go(0);
                        }
                    })
                }

            },
            //头像上传
            upLoad(file) {
                let _this = this;
                let formData = new FormData();
                let uid = this.$store.state.uid;
                formData.append('image', file.file);
                this.$axios({
                    url: '/img/upload',
                    method: 'post',
                    data: formData,
                    headers: { 'Content-Type': 'multipart/form-data' },
                }).then(resp => {
                    if (resp.data.code === 200) {
                        _this.imageUrl = resp.data.result;

                        console.log(uid);
                        this.$axios.post('/user/update',{
                            userImgUrl:_this.imageUrl,
                            userId:uid,
                        }).then(resp => {
                            if (resp && resp.data.code === 200) {
                                // _this.books = resp.data.result
                                _this.userInfo=resp.data.result;
                                _this.$store.commit('getImg',resp.data.result.userImgUrl);
                                // console.log(resp.data.result);
                            }
                        })

                    }else{
                        _this.$message(resp.data.message);
                    }
                }).catch(failResponse => {
                    _this.$message("头像上传失败")
                })
            },

        },
        mounted(){
            this.loadInfo();
            this.loadFollowNum();
            this.loadFanNum();
        }
    }
</script>

<style scoped>
    a {
        text-decoration: none;
    }
    .router-link-active {
        text-decoration: none;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;

        border:1px dashed #F00;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>