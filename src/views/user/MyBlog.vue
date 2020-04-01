<template>
    <div>
        <el-container id="admin-body">
            <!--顶部导航栏-->
            <el-header style="z-index: 1;height: 80px;margin-left: -2.2%">
                <nav-menu style="position: absolute;width: 100%;"></nav-menu>
            </el-header>
            <!--<el-row style="height: 100%;">-->
            <el-container>
                <!--内容-->
                <el-main>
                    <show-all :user_name="user_name"></show-all>
                </el-main>
                <!--侧边栏-->
                <el-aside style="height: 112%;margin-top: 70px;width: 250px">
                    <tags></tags>
                </el-aside>

            </el-container>
        </el-container>

    </div>
</template>

<script>
    import NavMenu from '../../components/NavMenu' //引入顶端导航栏
    import Tags from '../../components/Tags'  //引入标签框
    import ShowAll from '../../components/ShowAll' //引入显示所有博文
    export default {
        name: "MyBlog",
        components:{
            NavMenu,
            Tags,
            ShowAll
        },
        data(){

            return{
                user_name:"测试用户"
            }

        }
    }
</script>

<style scoped>

</style>