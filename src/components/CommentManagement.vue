<template>
    <div>


        <span style="font-size: 40px"><strong>评论管理</strong></span>
        <el-divider content-position="left"></el-divider>
        <el-card style="margin: 18px 2%;width: 95%">
            <el-table
                    :data="comments"
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
                                <span>{{ props.row.articleAbstract }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="articleTitle"
                        label="文章ID（点击查看评论内容）"
                        fit>
                </el-table-column>
                <el-table-column
                        prop="articleDate"
                        label="发布日期"
                        width="200">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="180">
                    <template slot-scope="scope">
                        <el-button
                                @click.native.prevent="viewArticle(scope.row.id)"
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
                                @click.native.prevent="deleteArticle(scope.row.id)"
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
        name: "CommentManagement",
        data () {
            return {
                comments: [
                    {
                        id:"1",
                        articleTitle:"标题1",
                        articleAbstract:"摘要1",
                        articleDate:"2020-4-22",

                    }
                ],
                pageSize: 10,
                total: 0
            }
        },
        mounted () {
            // this.loadArticles()
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
            },
            viewArticle(id) {
                // let articleUrl = this.$router.resolve(
                //     {
                //         path: '../../jotter/article',
                //         query: {
                //             id: id
                //         }
                //     }
                // )
                // window.open(articleUrl.href, '_blank')
            },
            editArticle(article) {
                // this.$router.push(
                //     {
                //         name: 'Editor',
                //         params: {
                //             article: article
                //         }
                //     }
                // )
                this.$prompt('请输入评论', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                    // inputErrorMessage: '邮箱格式不正确'
                }).then(({ value }) => {
                    this.$message({
                        type: 'success',
                        message: '你的邮箱是: ' + value
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            deleteArticle(id) {
                // this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
                //     confirmButtonText: '确定',
                //     cancelButtonText: '取消',
                //     type: 'warning'
                // }).then(() => {
                //         this.$axios
                //             .delete('/admin/content/article/' + id).then(resp => {
                //             if (resp && resp.data.code === 200) {
                //                 this.loadArticles()
                //             }
                //         })
                //     }
                // ).catch(() => {
                //     this.$message({
                //         type: 'info',
                //         message: '已取消删除'
                //     })
                // })
            }
        }
    }
</script>

<style scoped>

</style>