<template>
    <el-card style="text-align: left;width: 990px;margin: 35px auto 0 auto;">
        <el-row :gutter="20">
            <!--头像显示-->
            <el-col :span="3"><el-avatar style="width: 100px;height: 100px" size="large" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar></el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <b>用户昵称</b>
                </div>
            </el-col>
            <el-col :span="3" offset="11">
                <div class="grid-content bg-purple">
                    <el-button class="follow" >
                        <a v-if="!isFollow" @click="toFollow">关注</a>
                        <a v-if="isFollow" @click="deFollow">已关注</a>
                    </el-button>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="50">
            <el-col :span="12" :offset="3">
                <div class="grid-content bg-purple">
                    <div class="showData">
                        <div style="width:100px;height:20px;float:left;">粉丝数</div>
                        <div style="width:100px;height:20px;float:left;">点赞数</div>
                        <div style="width:100px;height:20px;float:left;">阅读数</div>
                        <div style="width:100px;height:20px;float:left;">博客数</div>
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
            }
        },
        methods:{
            //关注
            toFollow(){
                this.isFollow=!this.isFollow
            },
            //取消关注
            deFollow(){
                this.isFollow=!this.isFollow
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
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
    .follow{
        font-size: 20px;
        background: gainsboro;
        box-shadow: 0 2px 2px 0;
    }
</style>