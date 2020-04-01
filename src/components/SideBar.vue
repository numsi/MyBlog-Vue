<template>
    <el-menu
            class="categories"
            default-active="-1"
            @select="handleSelect"
            active-text-color="red"
    >

        <!--<el-menu-item v-for="(item,i) in sideList"   :index="item.name" @click="routerTo(item)" >-->
        <el-menu-item v-for="(item,i) in sideList"   :index="item.name"  >
            {{ item.sideItem }}
        </el-menu-item>
    </el-menu>
</template>

<script>
    export default {
        name: "SideBar",
        data(){
            return{
                isActive:"new",
                sideList: [
                    {name: '-1', sideItem: 'new'},
                    {name: '0', sideItem: 'Java'},
                    {name: '1', sideItem: 'Python'},
                    {name: '2', sideItem: 'C'},
                    {name: '3', sideItem: 'C++'}
                ]
            }
        },
        methods: {
            routerTo(item) {
                // this.$router.push({name: '/', params: {userId: 123}});
                console.log("11111");
                this.isActive=item.sideItem;
                console.log(this.isActive);
                //发送博客种类
                this.bus.$emit("blog_kind", item.sideItem )
            },
            handleSelect (key, keyPath) {
                this.isActive = key
                console.log(key);
                this.bus.$emit("blog_kind", key)
            }
        },
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