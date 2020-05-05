<template>

    <div style="margin-top: 60px">
        <side-bar></side-bar>
        <show-all-by-kind ref="showByKind" :kind="blog_kind" style="margin-left: 225px"></show-all-by-kind>
    </div>
</template>

<script>
    import NavMenu from '../components/NavMenu' //引入顶端导航栏
    import SideBar from '../components/SideBar' //引入侧边导航栏
    import ShowAllByKind from '../components/ShowAllByKind' //引入显示所有博文
    export default {
        name: "Home",
        components:{
            SideBar,
            ShowAllByKind,
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
            console.log(this.blog_kind);
        },
    }
</script>

<style scoped>

</style>