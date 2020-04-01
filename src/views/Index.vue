<template>
    <div>
        <el-container id="admin-body">
            <!--顶部导航栏-->
            <el-header style="z-index: 1;height: 80px;margin-left: -2.2%">
                <nav-menu style="position: absolute;width: 100%;"></nav-menu>
            </el-header>
            <!--<el-row style="height: 100%;">-->
            <el-container>
                <!--侧边栏-->
                <el-aside style="height: 112%;margin-top: -80px;width: 250px">
                    <side-bar></side-bar>
                </el-aside>
                <!--内容-->
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>

    </div>
</template>

<script>
    import NavMenu from '../components/NavMenu' //引入顶端导航栏
    import SideBar from '../components/SideBar' //引入侧边导航栏
    import ShowAll from '../components/ShowAll' //引入显示所有博文
    export default {
        name: "Index",
        components:{
            NavMenu,
            SideBar,
            ShowAll
        },

    }
</script>

<style>
    #admin-body {
        height: 95vh;
    }


</style>