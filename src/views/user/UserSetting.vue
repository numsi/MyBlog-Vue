<template>

    <el-container id="admin-body" style="height: 80%">
        <!--<el-header style="z-index: 1;height: 80px;margin-left: -20px">-->
            <!--<Header style="position: absolute;width: 98%;"></Header>-->
        <!--</el-header>-->
        <!--<el-row style="height: 100%;">-->
        <!--<el-container>-->
            <el-aside style="height: 400px;width: 250px">
                <user-menu></user-menu>
            </el-aside>
            <el-main>
                <router-view/>
            </el-main>
        <!--</el-container>-->
    </el-container>
</template>

<script>
    import UserMenu from '../../components/UserMenu'
    export default {
        name: "UserInfo",
        components:{
            UserMenu
        },
        data () {
            return {
                dialogVisible: false
            }
        },
    }
</script>

<style scoped>
    #admin-body {
        height: 95vh;
    }
</style>