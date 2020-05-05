<template>
    <el-menu
            class="categories"
            default-active="-1"
            @select="handleSelect"
            active-text-color="red"
    >

        <!--<el-menu-item v-for="(item,i) in sideList"   :index="item.name" @click="routerTo(item)" >-->
        <el-menu-item v-for="(item,i) in sideList"   :index="item.kindId"  >
            {{ item.kindName }}
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
                    {kindId: '-1', kindName: 'new'},
                ]
            }
        },
        methods: {
            routerTo(item) {
                // this.$router.push({name: '/', params: {userId: 123}});
                // console.log("11111");
                this.isActive=item.kindId;
                // console.log(this.isActive);
                //发送博客种类
                this.bus.$emit("blog_kind", item.sideItem )
            },
            handleSelect (key, keyPath) {
                this.isActive = key
                // console.log(key);
                this.bus.$emit("blog_kind", key)
            },
            loadKind(){
                let _this = this;
                this.$axios.get('/kind/list').then(resp => {
                    if (resp && resp.data.code === 200) {
                        // _this.books = resp.data.result
                        // console.log(resp.data.result);
                        _this.sideList = _this.sideList.concat(resp.data.result);
                    }
                })
            }
        },
        mounted(){
            this.loadKind();
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