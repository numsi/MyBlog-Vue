<template>
    <div>
        <span style="font-size: 40px"><strong>个人资料</strong></span>
        <el-divider content-position="left"></el-divider>
        <el-row :gutter="20">
        <!--头像显示-->
        <el-col :span="3">
            <el-avatar style="width: 100px;height: 100px" size="large" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple">
                用户ID
            </div>
        </el-col>

        <el-col :span="3" :offset="11">
            <div class="ShowUser">
                <router-link :to="{name: 'ShowUser', query: {color: 'red' }}">个人主页></router-link>
            </div>
        </el-col>
    </el-row>
        <el-row :gutter="20"  >
            <el-col :span="12" :offset="3">
                <div class="grid-content bg-purple">
                    <div class="showData">
                        <div style="width:100px;height:20px;float:left;">关注数</div>
                        <div style="width:100px;height:20px;float:left;">粉丝数</div>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-divider content-position="left"></el-divider>
        <div v-if="isUpdate">
            <info-update></info-update>
            <el-divider content-position="left">头像修改</el-divider>
            <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </div>
        <div v-if="!isUpdate">

            <el-form ref="form" :model="form" label-width="80px" style="">
                <!--<a style="cursor:pointer;margin-right: -1000px"  @click="toUpdate">个人主页></a>-->
                <el-form-item label="用户昵称">
                    <el-col :span="3">
                        xxxx
                    </el-col>
                    <el-col :span="4" :offset="17">
                        <a style="cursor:pointer;"  @click="toUpdate">修改个人资料></a>
                    </el-col>
                </el-form-item>

                <el-form-item label="用户邮箱">

                    xxxxx

                </el-form-item>
                <el-form-item label="用户生日">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="用户生日" v-model="form.date1" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>

                <el-form-item label="用户性别">
                    <el-radio-group v-model="form.resource">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="个人简介">
                    <el-input type="textarea" v-model="form.desc" style="width:250px;">></el-input>
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
        components:{
            InfoUpdate,
            ImgUpload
        },
        data() {
            return {
                dialogVisible: false,
                isUpdate:false,
                form:{},
                imageUrl: ''
            };
        },
        methods:{
            toUpdate()
            {
                this.isUpdate=true;
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
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
            }
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