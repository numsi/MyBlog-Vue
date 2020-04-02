<template>
    <div style="margin-top: 60px">
        <side-bar></side-bar>
        <show-all style="margin-left: 225px"></show-all>
    </div>
</template>

<script>
    import SideBar from '../components/SideBar' //引入侧边导航栏
    import ShowAll from '../components/ShowAll' //引入显示所有博文
    export default {
        name: "Home",
        components:{
            SideBar,
            ShowAll,
        }
    }
</script>

<style scoped>

</style>