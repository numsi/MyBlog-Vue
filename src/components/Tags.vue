<template>
    <div class="tag">
        <el-card class="box-card" >
            <div slot="header" class="d-flex align-items-center">
                <img class="card-icon" src="../assets/img/biaoqian.png" />
                <span>标签</span>
            </div>
            <div class="text item">
                <el-tag size="mini" v-for="(item,i) in blog_tag"   :index="item.index"  class="tag-item" @click="tag(item.index)">
                    {{item.name}}
                </el-tag>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "Tags",
        data(){
            return{
                blog_tag:[
                    {index: '0', name: 'new'},
                    {index: '1', name: 'Java'},
                    {index: '2', name: 'Python'},
                    {index: '3', name: 'C'},
                    {index: '4', name: 'C++'}
                ]
            }
        },
        methods: {
            tag(name) {
                // this.$router.push({
                //     name: '/showAll',
                //     params: {
                //         'name': name
                //     }
                // });
                console.log("点击标签:"+name);
                this.bus.$emit("blog_tag", name)
            },
        }
    }
</script>

<style scoped>

    .box-card .item:hover {
        color: #409EFF;
        cursor: pointer;
    }

    .box-card span {
        font-weight: bold;
    }

    .card-icon {
        width: 20px;
        height: 20px;
        margin-right: 10px;
    }

    .tag-item {
        margin-right: 10px;
    }
</style>