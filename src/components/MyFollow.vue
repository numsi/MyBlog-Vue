<template>
    <div>
        <span style="font-size: 40px"><strong>管理管理</strong></span>
        <el-divider content-position="left"></el-divider>
        <el-card style="text-align: left;width: 900px;margin: 35px auto 0 auto;">
            <el-row :gutter="20">
                <!--头像显示-->
                <el-col :span="2"><el-avatar style="width: 50px;height: 50px" size="large" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar></el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <b>用户昵称</b>
                    </div>
                </el-col>
                <el-col :span="3" :offset="11">
                    <div class="grid-content bg-purple">
                        <el-button class="follow" >
                            <a @click="deFollow">取消关注</a>
                        </el-button>
                    </div>
                </el-col>
            </el-row>

        </el-card>
    </div>
</template>

<script>
    export default {
        name: "MyFollow"
    }
</script>

<style scoped>

</style>