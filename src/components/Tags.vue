<template>
    <div class="tag">
        <el-card class="box-card" >
            <div slot="header" class="d-flex align-items-center">
                <img class="card-icon" src="../assets/img/biaoqian.png" />
                <span>标签</span>
            </div>
            <div class="text item">
                <el-tag size="mini" v-for="(item,i) in blog_tag"   :index="item.index"  class="tag-item" @click="tag(item.tagId)">
                    {{item.tagName}}
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
                    {tagId: '-1', tagName: 'new'},
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
                // console.log("点击标签:"+name);
                this.bus.$emit("blog_tag", name)
            },
            loadTags()
            {
                let _this = this;
                let uid = this.$store.state.uid;
                this.$axios.get('/tag/list?id='+uid+'&pageSize=50&pageNum=1').then(resp => {
                    if (resp && resp.data.code === 200) {
                        // _this.books = resp.data.result
                        let tags=resp.data.result.list;
                        _this.blog_tag = _this.blog_tag.concat(tags);
                    }
                })
            },
        },
        mounted(){
            this.loadTags();
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