<template>
    <div>
        <tags style="height: 112%;margin-top: 70px;width: 250px;margin-left: 1000px"></tags>
        <show-all-by-tag  :tag="blog_tag" style="margin-top: -150px"></show-all-by-tag>
        <!--<el-container id="admin-body">-->
            <!--&lt;!&ndash;顶部导航栏&ndash;&gt;-->
            <!--<el-header style="z-index: 1;height: 80px;margin-left: -2.2%">-->
                <!--<nav-menu style="position: absolute;width: 100%;"></nav-menu>-->
            <!--</el-header>-->
            <!--&lt;!&ndash;<el-row style="height: 100%;">&ndash;&gt;-->
            <!--<el-container>-->
                <!--&lt;!&ndash;内容&ndash;&gt;-->
                <!--<el-main>-->
                    <!--<show-all :user_name="user_name"></show-all>-->
                <!--</el-main>-->
                <!--&lt;!&ndash;侧边栏&ndash;&gt;-->
                <!--<el-aside style="height: 112%;margin-top: 70px;width: 250px">-->
                    <!--<tags></tags>-->
                <!--</el-aside>-->

            <!--</el-container>-->
        <!--</el-container>-->

    </div>
</template>

<script>
    import NavMenu from '../../components/NavMenu' //引入顶端导航栏
    import Tags from '../../components/Tags'  //引入标签框
    import ShowAllByTag from '../../components/ShowAllByTag' //引入显示所有博文
    export default {
        name: "MyBlog",
        components:{
            ShowAllByTag,
            NavMenu,
            Tags,

        },
        data(){

            return{
                blog_tag:'-1'
            }

        },
        mounted() {
            let self = this;
            this.bus.$on("blog_tag", function(item) { self.blog_tag = item; })
        },
    }
</script>

<style scoped>

</style>