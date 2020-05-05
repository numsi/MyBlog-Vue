<template>
    <div>


        <span style="font-size: 40px"><strong>关注管理</strong></span>
        <el-divider content-position="left"></el-divider>





        <el-card style="margin: 18px 2%;width: 95%">
            <el-table
                    :data="follows"
                    stripe
                    style="width: 100%"
                    :max-height="tableHeight">

                <el-table-column
                        prop="userNickname"
                        label="用户名"
                        fit>
                </el-table-column>

                <el-table-column
                        fixed="right"
                        label="操作"
                        width="180">
                    <template slot-scope="scope">
                        <el-button
                                @click.native.prevent="viewUser(scope.row.followFollowerid)"
                                type="text"
                                size="small">
                            查看
                        </el-button>
                        <el-button
                                @click.native.prevent="deleteFollow(scope.row.followFollowerid)"
                                type="text"
                                size="small">
                            取消关注
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
        name: "MyFollow",
        data () {
            return {
                follows: [

                ],
                pageSize: 10,
                pageNum:1,
                total: 0,
                username:''
            }
        },
        methods: {
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
                this.$axios.get('/follow/get?id='+uid+'&pageSize='+_this.pageSize+'&pageNum='+_this.pageNum).then(resp => {
                    if (resp && resp.data.code === 200) {
                        // _this.books = resp.data.result
                        _this.follows=resp.data.result.list;
                        _this.follows.forEach((item,i) => {
                            this.$axios.get('/user/get/'+item.followFollowerid).then(resp => {
                                if (resp && resp.data.code === 200) {
                                    // _this.books = resp.data.result
                                    _this.$set(item,'userNickname',resp.data.result.userNickname);
                                    // item.userNickname=resp.data.result.userNickname;
                                    // console.log(resp.data.result.userNickname);
                                    // _this.follows.userNickName = resp.data.result.userNickname;
                                    // return row.followFollowerid=resp.data.result.userNickname;

                                }
                            })
                        })
                        _this.total=resp.data.result.total;
                        console.log(resp.data.result.list);
                    }
                })

            },
            deleteFollow(id) {
                let uid = this.$store.state.uid;
                let followed = id;
                this.$axios.get('/follow/change?uid='+uid+"&followed="+followed).then(resp => {
                    if (resp && resp.data.code === 200) {
                        // _this.books = resp.data.result
                        this.$router.go(0);
                    }
                })
            },
            loadFollows()
            {
                let _this = this;
                let uid = this.$store.state.uid;
                this.$axios.get('/follow/get?id='+uid+'&pageSize='+_this.pageSize+'&pageNum='+_this.pageNum).then(resp => {
                    if (resp && resp.data.code === 200) {
                        // _this.books = resp.data.result
                        _this.follows=resp.data.result.list;

                        _this.follows.forEach((item,i) => {
                            this.$axios.get('/user/get/'+item.followFollowerid).then(resp => {
                                if (resp && resp.data.code === 200) {
                                    // _this.books = resp.data.result
                                    _this.$set(item,'userNickname',resp.data.result.userNickname);
                                    // item.userNickname=resp.data.result.userNickname;
                                    // console.log(resp.data.result.userNickname);
                                    // _this.follows.userNickName = resp.data.result.userNickname;
                                    // return row.followFollowerid=resp.data.result.userNickname;

                                }
                            })
                        })

                        _this.total=resp.data.result.total;
                        console.log(resp.data.result.list);
                    }
                })
            },
            viewUser(id)
            {
                this.$router.push({name: 'ShowUser', query: {userId: id}})
            },



        },
        mounted(){
            this.loadFollows()
        }
    }
</script>

<style scoped>

</style>