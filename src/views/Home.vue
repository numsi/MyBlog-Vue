<template>

    <div style="margin-top: 60px">
        <side-bar></side-bar>
        <show-all :kind="blog_kind" style="margin-left: 225px"></show-all>
    </div>
</template>

<script>
    import NavMenu from '../components/NavMenu' //引入顶端导航栏
    import SideBar from '../components/SideBar' //引入侧边导航栏
    import ShowAll from '../components/ShowAll' //引入显示所有博文
    export default {
        name: "Home",
        components:{
            SideBar,
            ShowAll,
            NavMenu
        },
        data(){
            return{
                blog_kind:'-1'
            }
        },
        mounted() {
            let self = this;
            this.bus.$on("blog_kind", function(item) { self.blog_kind = item; })
            this.bus.$on("blog_tag", function(item) { self.blog_tag = item; })
        },
    }
</script>

<style scoped>

</style>