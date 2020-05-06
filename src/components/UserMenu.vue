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
        name: "UserMenu",
        data(){
            return{
                // isActive:"/usersetting/profile",
                sideList: [
                    // {name: 'dashboard', sideItem: '信息总览'},
                    {name: '/usersetting/profile', sideItem: '个人资料'},
                    {name: '/usersetting/my_blog', sideItem: '我的文章'},
                    {name: '/usersetting/my_tag', sideItem: '我的标签'},
                    {name: '/usersetting/my_follow', sideItem: '我的关注'},
                    {name: '/usersetting/my_comment', sideItem: '我的评论'},
                    {name: '/usersetting/password_update', sideItem: '密码修改'}
                ]
            }
        },
        methods: {
            routerTo(item) {
                this.$router.push({path: item.name, params: {userId: 123}});
                console.log("11111");
                this.isActive=item.sideItem;
                console.log(this.isActive);
                //发送博客种类
                // this.bus.$emit("blog_kind", item.sideItem )
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

</style>