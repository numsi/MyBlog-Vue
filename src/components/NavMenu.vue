<template>
    <div>

        <el-menu
                :default-active="path"
                router
                mode="horizontal"
                background-color="white"
                text-color="#222"
                active-text-color="red"
                style="min-width: 1000px"
        >
            <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
                {{ item.navItem }}
            </el-menu-item>
            <span style="position: absolute;padding-top: 20px;right: 50%;font-size: 20px;font-weight: bold">MyBlog---a free blog system</span>
            <el-input
                    placeholder="快速搜索..."
                    prefix-icon="el-icon-search"
                    size="medium"
                    style="width: 300px;position:absolute;margin-top: 12px;right: 25%"
                    v-model="keywords"
                    @keyup.enter.native="search"
            >
            </el-input>
            <el-menu-item index="/blogedit"  style="position: absolute;right: 8%">
                <i class="el-icon-edit"></i>
                博文创作
            </el-menu-item>
            <!--<el-menu-item style="position: absolute;right: 5%">-->
                <!--<i class="el-icon-bell"></i>-->
                <!--消息-->
            <!--</el-menu-item>-->

            <el-submenu index="2" v-if="this.$store.state.isLogin" style="position: absolute;right:0">
                <template slot="title">
                    <el-avatar> user </el-avatar>
                </template>
                <el-menu-item index="2-1">
                    <i class="el-icon-user"></i>
                    个人信息
                </el-menu-item>
                <el-menu-item index="2-2">
                    <i class="el-icon-bell"></i>
                    消息通知
                </el-menu-item>
                <el-menu-item index="2-3">
                    <i class="el-icon-s-tools"></i>
                    退出
                </el-menu-item>
            </el-submenu>

            <!--<el-menu-item v-if="this.$store.state.isLogin" style="position: absolute;right:0">-->
                <!--<el-avatar> user </el-avatar>-->
            <!--</el-menu-item>-->
            <el-menu-item index="/login" v-else style="position: absolute;right:0">
                注册/登录
            </el-menu-item>
        </el-menu>


    </div>
</template>

<script>
    export default {
        name: "NavMenu",
        data () {
            return {
                navList: [
                    {name: '/home', navItem: '首页'},
                    {name: '/blog', navItem: '博客'},
                    // {name: '/comment', navItem: '评论'},
                    {name: '/动态', navItem: '动态'}
                ],
                keywords: '',
                path: '/',
                img_url:''
            }
        },
        mounted: function () {
            // 获得第一级路由，以设置导航栏高亮
            var x = this.$route.path.indexOf('/', 1)
            if (x !== -1) {
                this.path = this.$route.path.substring(0, x)
            } else {
                this.path = this.$route.path
            }
        },
        computed: {
            hoverBackground () {
                return '#ffd04b'
            }
        },
        methods: {
            search(){
                console.log("出发搜索");
            },
        }
    }
</script>

<style scoped>
    a{
        text-decoration: none;
    }

    span {
        pointer-events: none;
    }

</style>