<template>
    <el-menu
            :default-active="isActive"
            class="el-menu-admin"
            router
            mode="vertical"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
    >

        <el-menu-item index="new">最新</el-menu-item>
        <el-menu-item index="2">Java</el-menu-item>
        <el-menu-item index="3">Python</el-menu-item>
        <el-menu-item index="4">C</el-menu-item>
        <el-menu-item index="5">C++</el-menu-item>
        <el-menu-item index="6">C#</el-menu-item>
    </el-menu>
</template>

<script>
    export default {
        name: "SideBar",
        methods: {
        },
        data(){
            return{
                isActive:"new"
            }
        }
    }
</script>

<style scoped>
    .el-menu-admin {
        border-radius: 5px;
        height: 50%;
        margin-top: 80px;
    }

</style>