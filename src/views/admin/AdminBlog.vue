<template>
    <div>
        <span style="font-size: 40px"><strong>博文管理</strong></span>
        <el-divider content-position="left"></el-divider>

        <!--<el-link href="/editor" :underline="false" target="_blank" class="add-link">-->
            <!--<el-button type="success" >写文章</el-button>-->
        <!--</el-link>-->
        <el-card style="margin: 18px 2%;width: 95%">
            <el-table
                    :data="blogs"
                    stripe
                    style="width: 100%"
                    :max-height="tableHeight">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline>
                            <el-form-item>
                                <span>{{ props.row.blogAbstract }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="blogTitle"
                        label="题目（展开查看摘要）"
                        fit>
                </el-table-column>
                <el-table-column
                        prop="blogCreattime"
                        label="发布日期"
                        width="200">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="180">
                    <template slot-scope="scope">
                        <el-button
                                @click.native.prevent="viewArticle(scope.row.blogId)"
                                type="text"
                                size="small">
                            查看
                        </el-button>
                        <el-button
                                @click.native.prevent="editArticle(scope.row)"
                                type="text"
                                size="small">
                            编辑
                        </el-button>
                        <el-button
                                @click.native.prevent="deleteArticle(scope.row.blogId)"
                                type="text"
                                size="small">
                            移除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="margin: 20px 0 50px 0">
                <el-pagination
                        background
                        style="float:right;"
                        layout="total, prev, pager, next, jumper"
                        @current-change="handleCurrentChange"
                        :page-size="pageSize"
                        :total="total">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "AdminBlog",
        data () {
            return {
                blogs: [
                ],
                pageSize: 10,
                total: 0,
                pageNum:1
            }
        },
        mounted () {
            // this.loadArticles()
            this.loadBlogs();
        },
        computed: {
            tableHeight () {
                return window.innerHeight - 320
            }
        },
        methods: {
            loadArticles() {
                // var _this = this
                // this.$axios.get('/article/' + this.pageSize + '/1').then(resp => {
                //     if (resp && resp.data.code === 200) {
                //         _this.articles = resp.data.result.content
                //         _this.total = resp.data.result.totalElements
                //     }
                // })
            },
            handleCurrentChange(page) {
                // var _this = this
                // this.$axios.get('/article/' + this.pageSize + '/' + page).then(resp => {
                //     if (resp && resp.data.code === 200) {
                //         _this.articles = resp.data.result.content
                //         _this.total = resp.data.result.totalElements
                //     }
                // })
                this.pageNum=page;
                let _this = this;
                let uid = this.$store.state.uid;
                this.$axios.get('/blog/listAllKind?pageSize='+_this.pageSize+'&pageNum='+_this.pageNum).then(resp => {
                    if (resp && resp.data.code === 200) {
                        // _this.books = resp.data.result
                        console.log(resp.data.result);
                        _this.total=resp.data.result.total;
                        _this.blogs=resp.data.result.list;
                        console.log(resp.data.result.list);
                    }
                })
            },
            viewArticle(id) {
                let articleUrl = this.$router.resolve(
                    {
                        name: 'Detail',
                        query: {
                            blogId: id
                        }
                    }
                )
                window.open(articleUrl.href, '_blank')
            },
            editArticle(blog) {
                this.$router.push(
                    {
                        name: 'ArticleEditor',
                        params: {
                            blog: blog
                        }
                    }
                )
            },
            deleteArticle(id) {
                this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                        this.$axios
                            .get('/blog/delete/' + id).then(resp => {
                            if (resp && resp.data.code === 200) {
                                this.loadBlogs()
                            }
                        })
                    }
                ).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            },
            loadBlogs()
            {
                let _this = this;
                this.$axios.get('/blog/listAllKind?pageSize='+_this.pageSize+'&pageNum='+_this.pageNum).then(resp => {
                    if (resp && resp.data.code === 200) {
                        // _this.books = resp.data.result
                        console.log(resp.data.result);
                        _this.total=resp.data.result.total;
                        _this.blogs=resp.data.result.list;
                        console.log(resp.data.result.list);
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>