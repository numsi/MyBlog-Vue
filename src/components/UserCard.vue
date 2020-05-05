<template>
    <el-card style="text-align: left;width: 990px;margin: 35px auto 0 auto;">
        <el-row :gutter="20">
            <!--头像显示-->
            <el-col :span="3"><el-avatar style="width: 100px;height: 100px" size="large" :src="this.userInfo.userImgUrl"></el-avatar></el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <b>{{this.userInfo.userNickname}}</b>
                </div>
            </el-col>
            <el-col :span="3" :offset="11">
                <div class="grid-content bg-purple">
                    <el-button class="follow" >
                        <a v-if="!isFollow" @click="changeFollow">关注</a>
                        <a v-if="isFollow" @click="changeFollow">已关注</a>
                    </el-button>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="50">
            <el-col :span="12" :offset="3">
                <div class="grid-content bg-purple">
                    <div class="showData">
                        <div style="width:100px;height:20px;float:left;">粉丝数:{{this.fanNum}}</div>
                        <div style="width:100px;height:20px;float:left;">点赞数:{{this.likeNum}}</div>
                        <div style="width:100px;height:20px;float:left;">阅读数:{{this.viewNum}}</div>
                        <div style="width:100px;height:20px;float:left;">博客数:{{this.blogNum}}</div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
    export default {
        name: "UserCard",
        data(){
            return{
                isFollow:false,
                userID:'',
                userInfo:{},
                fanNum:-1,
                likeNum:-1,
                viewNum:-1,
                blogNum:-1,
            }
        },
        mounted(){
            this.userID=this.$route.query.userId;
            this.checkFollow();
            this.loadInfo();
            this.loadFanNum();
            this.loadBlogNum();
            this.loadViewNum();
            this.loadLikeNum();
        },
        methods:{
            //改变关注状态
            changeFollow(){
                let uid = this.$store.state.uid;
                let followed = this.userID;
                let _this=this;
                if(uid==followed)
                {
                    _this.$message("自己不能关注自己");
                }else{
                    this.$axios.get('/follow/change?uid='+uid+"&followed="+followed).then(resp => {
                        if (resp && resp.data.code === 200) {
                            // _this.books = resp.data.result
                            _this.isFollow=!_this.isFollow;
                        }else{
                            _this.$message("操作失败");
                        }
                        console.log(resp);
                    })
                }

            },
            loadInfo(){
                let _this = this;
                let uid = this.userID;
                this.$axios.get('/user/get/'+uid).then(resp => {
                    if (resp && resp.data.code === 200) {
                        // _this.books = resp.data.result
                        _this.userInfo=resp.data.result;

                    }
                })
            },
            loadFanNum(){
                let _this = this;
                let uid = this.userID;

                this.$axios.get('/follow/getFanNum/'+uid).then(resp => {
                    if (resp && resp.data.code === 200) {
                        // _this.books = resp.data.result
                        _this.fanNum=resp.data.result;

                    }
                })
            },
            loadLikeNum(){
                let _this = this;
                let uid = this.userID;

                this.$axios.get('/like/getUser/'+uid).then(resp => {
                    if (resp && resp.data.code === 200) {
                        // _this.books = resp.data.result
                        _this.likeNum=resp.data.result;

                    }
                })
            },
            loadViewNum(){
                let _this = this;
                let uid = this.userID;

                this.$axios.get('/view/getByUser/'+uid).then(resp => {
                    if (resp && resp.data.code === 200) {
                        // _this.books = resp.data.result
                        _this.viewNum=resp.data.result;

                    }
                })
            },
            loadBlogNum(){
                let _this = this;
                let uid = this.userID;
                this.$axios.get('/blog/listByUser?id='+uid+'&pageSize=10&pageNum=1').then(resp => {
                    if (resp && resp.data.code === 200) {
                        // _this.books = resp.data.result
                        console.log(resp.data.result);
                        _this.blogNum=resp.data.result.total;

                        console.log(resp.data.result.list);
                    }
                })
            },

            checkFollow(){
                let uid = this.$store.state.uid;
                let followed = this.userID;
                let _this=this;
                this.$axios.get('/follow/check?uid='+uid+"&followed="+followed).then(resp => {
                    if (resp && resp.data.code === 200) {
                        // _this.books = resp.data.result
                        _this.isFollow=true;
                    }else{
                        _this.isFollow=false;
                    }
                })

            }

        }
    }
</script>

<style scoped>

    .el-row {
        margin-bottom: 20px;
    &:last-child {
         margin-bottom: 0;
     }
    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        /*background: #99a9bf;*/
    }
    .bg-purple {
        /*background: #d3dce6;*/
    }
    .bg-purple-light {
        /*background: #e5e9f2;*/
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        /*background-color: #f9fafc;*/
    }
    .follow{
        font-size: 20px;
        background: gainsboro;
        box-shadow: 0 2px 2px 0;
    }
</style>