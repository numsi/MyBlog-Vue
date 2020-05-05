<template>
    <el-container id="admin-body" style="height: 80%">
        <!--<el-header style="z-index: 1;height: 80px;margin-left: -20px">-->
        <!--<Header style="position: absolute;width: 98%;"></Header>-->
        <!--</el-header>-->
        <!--<el-row style="height: 100%;">-->
        <!--<el-container>-->
        <el-aside style="height: 400px;width: 250px">
            <admin-side-bar></admin-side-bar>
        </el-aside>
        <el-main>
            <router-view/>
        </el-main>
        <!--</el-container>-->
    </el-container>
    
</template>

<script>
    import AdminSideBar from './AdminSideBar'
    export default {
        name: "AdminHome",
        components: {AdminSideBar},
        component:{
            AdminSideBar
        }
    }
</script>

<style scoped>

</style>