<template>
    <div>

        <nav-menu></nav-menu>
        <router-view></router-view>
        <!--<el-container id="admin-body" style="height: 100%" direction="vertical">-->
            <!--&lt;!&ndash;顶部导航栏&ndash;&gt;-->
            <!--<el-header style="z-index: 1;height: 80px;margin-left: -2.2%">-->
                <!--<nav-menu style="position: absolute;width: 100%;"></nav-menu>-->
            <!--</el-header>-->
            <!--&lt;!&ndash;<el-row style="height: 100%;">&ndash;&gt;-->
            <!--<el-container>-->
                <!--&lt;!&ndash;侧边栏&ndash;&gt;-->
                <!--<el-aside style="height: 112%;margin-top: -80px;width: 200px">-->
                    <!--<side-bar></side-bar>-->
                    <!--&lt;!&ndash;<side-menu></side-menu>&ndash;&gt;-->
                <!--</el-aside>-->
                <!--&lt;!&ndash;内容&ndash;&gt;-->
                <!--<el-main >-->
                    <!--<show-all></show-all>-->
                <!--</el-main>-->
            <!--</el-container>-->
        <!--</el-container>-->

    </div>
</template>

<script>
    import NavMenu from '../components/NavMenu' //引入顶端导航栏
    import SideBar from '../components/SideBar' //引入侧边导航栏

    export default {
        name: "Index",
        components:{
            NavMenu,
            SideBar,

        },

    }
</script>

<style>
    #admin-body {
        height: 95vh;
    }


</style>