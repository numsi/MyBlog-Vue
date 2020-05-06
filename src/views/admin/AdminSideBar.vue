<template>
    <el-menu

            class="categories"
            :default-active="currentPath"
            active-text-color="red"
    >

        <el-menu-item v-for="(item,i) in sideList"   :index="item.name" @click="routerTo(item)" >
            <!--<el-menu-item v-for="(item,i) in sideList" :key="item.name"   :index="item.name"  >-->
            {{ item.sideItem }}
        </el-menu-item>
    </el-menu>
</template>
<script>
    export default {
        name: "AdminSideBar",
        data(){
            return{
                // isActive:"/usersetting/profile",
                sideList: [
                    // {name: 'dashboard', sideItem: '信息总览'},
                    // {name: '/adminHome/dashboard', sideItem: '首页'},
                    {name: '/adminHome/user', sideItem: '用户管理'},
                    {name: '/adminHome/kind', sideItem: '分类管理'},
                    {name: '/adminHome/blog', sideItem: '文章管理'},
                    {name: '/adminHome/info', sideItem: '密码修改'},
                    // {name: '/usersetting/my_comment', sideItem: '我的评论'},
                    {name: 'logout', sideItem: '退出'}
                ]
            }
        },
        methods: {
            routerTo(item) {
                if(item.name=='logout'){
                    this.loginOut();
                }else{
                    this.$router.push(item.name);
                    console.log("11111");
                    this.isActive=item.sideItem;
                    console.log(this.isActive);
                }

                //发送博客种类
                // this.bus.$emit("blog_kind", item.sideItem )
            },
            loginOut(){
                this.$store.commit('loginOut');
                // this.$router.go(0);

                this.$router.push('/');
                this.$router.go(0);
            },
            // handleSelect (key, keyPath) {
            //     this.isActive = key
            //     console.log(key);
            //     this.bus.$emit("blog_kind", key)
            // }
        },
        computed:{
            currentPath () {
                return this.$route.path
            }
        }
    }
</script>

<style scoped>
    .categories {
        position: fixed;
        margin-left: 50%;
        left: -600px;
        top: 100px;
        width: 150px;
    }

</style>