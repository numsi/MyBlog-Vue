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

        <el-menu-item v-for="(item,i) in sideList" :key="i" :index="item.name" @click="routerTo(item.name)" >
            {{ item.sideItem }}
        </el-menu-item>
    </el-menu>
</template>

<script>
    export default {
        name: "SideBar",
        methods: {
            routerTo(message) {
                // this.$router.push({name: '/', params: {userId: 123}});
                console.log("11111");
                //发送博客种类
                this.bus.$emit("blog_kind", message)
            }
        },
        data(){
            return{
                isActive:"new",
                sideList: [
                    {name: 'new', sideItem: '最新'},
                    {name: 'java', sideItem: 'Java'},
                    {name: 'python', sideItem: 'Python'},
                    {name: 'c', sideItem: 'C'},
                    {name: 'cpp', sideItem: 'C++'}
                ]
            }
        },
        mounted(){
            // this.$router.push({name: '/', params: {userId: 123}});
            console.log("11111");
            //发送博客种类
            this.bus.$emit("blog_kind", this.isActive)

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