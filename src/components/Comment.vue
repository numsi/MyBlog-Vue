<template>
    <div id="comment">
        <el-card style="text-align: left;width: 990px;margin: 35px auto 0 auto">
            <!--评论显示-->
            <div class="commentBox">
                <h3>评论</h3>
                <p v-if="comment.length==0">暂无评论，我来发表第一篇评论！</p>
                <div v-else>
                    <div class="comment" v-for="(item,index) in comment" v-bind:index="index" >

                        <span>
                            <div style="display:inline-block;">
                                <el-avatar style="width: 50px;height: 50px" size="large" :src="item.userImg"></el-avatar>
                            </div>
                        <div style="display:inline-block;margin-left:10px;">
                            <b>{{item.userNickname}}<span>{{item.commentUpdate}}</span><span v-if="item.commentParent!=-1">回复  :{{item.oldCom}}   <span>  {{item.reply}}</span></span></b>
                            <b></b>
                            <p @click="changeCommenter(item.commentAuthor,item.commentId)">{{item.commentContent}}</p>
                        </div>
                        </span>
                    </div>
                </div>

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
            </div>

            <!--编辑评论-->
            <div class="commentBox">
                <h3>发表评论</h3>
                <b v-if="type">你回复&nbsp;{{oldComment}}</b>
                <textarea name="" value="请填写评论内容" v-model="commentText"></textarea>
                <button class="btn" @click="addComment">发表</button>
                <button class="btn" @click="canelComment">取消</button>
            </div>'
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "Comment",
        data(){
            return{
                blogID:'',
                pageSize: 10,
                total: 0,
                pageNum:1,
                tempName:'',

                commenter: "session",   //评论人
                type: 0,                //0为评论作者1为评论别人的评论2为评论别人的别人
                oldComment: null,
                chosedIndex: -1,        //被选中的评论的index
                comment: [
                ],    //评论内容
                commentText:'',
                name:''
            }
        },
        methods:{
            //增加评论
            addComment(data) {

                    let _this = this;
                    _this.$axios.post('/comment/add',{
                        commentContent:this.commentText,
                        commentAuthor:this.commenter,
                        commentBlog:this.blogID,
                        commentParent:this.chosedIndex

                    }).then(resp => {
                        if (resp && resp.data.code === 200) {
                            let data = resp.data.result
                            // _this.$store.commit('login', data)
                            console.log(data);
                            this.$router.go(0);
                        }else {
                            console.log(resp.data.message);
                            _this.$message(resp.data.message)
                        }
                    })

            },
            //改变回复者
            changeCommenter(name,index){
                if(name!=-1){
                    this.getName(name);
                    this.oldComment =this.tempName

                    this.chosedIndex = index;
                    this.type = 1;
                    console.log(name);
                }

            },
            //改变回复者为本文作者
            canelComment() {
                this.type = 0;
                this.chosedIndex=-1
            },
            loadComment(){
                let _this =this;
                this.$axios.get('/comment/listByBlog?id='+_this.blogID+'&pageSize='+_this.pageSize+'&pageNum='+_this.pageNum).then(resp => {
                    if (resp && resp.data.code === 200) {
                        // _this.books = resp.data.result
                        // console.log(resp.data.result);
                        _this.total=resp.data.result.total;
                        _this.comment=resp.data.result.list;

                        let _is = _this;

                        _this.comment.forEach((item,i) => {
                            this.$axios.get('/user/get/'+item.commentAuthor).then(resp => {
                                if (resp && resp.data.code === 200) {
                                    // _this.books = resp.data.result
                                    _this.$set(item,'userImg',resp.data.result.userImgUrl);
                                    _this.$set(item,'userNickname',resp.data.result.userNickname);
                                    // item.userNickname=resp.data.result.userNickname;
                                    // console.log(resp.data.result.userNickname);
                                    // _this.follows.userNickName = resp.data.result.userNickname;
                                    // return row.followFollowerid=resp.data.result.userNickname;

                                }else{

                                    _this.$set(item, 'userNickname', "NULL");
                                }
                            });

                            if(item.commentParent!=-1)
                            {

                                _this.$axios.get('/comment/get/'+item.commentParent).then(resp => {
                                    if (resp && resp.data.code === 200) {

                                        let temp = item;

                                        this.$axios.get('/user/get/'+resp.data.result.commentAuthor).then(res => {
                                            if (res && res.data.code === 200) {

                                                temp.tempName =res.data.result.userNickname;
                                                _is.$set(temp,"oldCom",res.data.result.userNickname);


                                            }
                                        })




                                        // _this.getName(resp.data.result.commentAuthor);
                                        _this.$set(item,'reply',resp.data.result.commentUpdate);

                                    }
                                })
                            }
                        })



                        // console.log(resp.data.result.list);
                    }
                })
            },
            handleCurrentChange(page) {
                this.pageNum=page;
                let _this =this;
                this.$axios.get('/comment/listByBlog?id='+_this.blogID+'&pageSize='+_this.pageSize+'&pageNum='+_this.pageNum).then(resp => {
                    if (resp && resp.data.code === 200) {
                        // _this.books = resp.data.result
                        // console.log(resp.data.result);
                        _this.total = resp.data.result.total;
                        _this.comment = resp.data.result.list;

                        _this.comment.forEach((item, i) => {



                            this.$axios.get('/user/get/' + item.commentAuthor).then(resp => {
                                if (resp && resp.data.code === 200) {
                                    // _this.books = resp.data.result
                                    _this.$set(item,'userImg',resp.data.result.userImgUrl);
                                    _this.$set(item, 'userNickname', resp.data.result.userNickname);
                                    // item.userNickname=resp.data.result.userNickname;
                                    // console.log(resp.data.result.userNickname);
                                    // _this.follows.userNickName = resp.data.result.userNickname;
                                    // return row.followFollowerid=resp.data.result.userNickname;

                                }else{
                                    _this.$set(item, 'userNickname', "NULL");
                                }
                            })

                            if (item.commentParent != -1) {

                                _this.$axios.get('/comment/get/' + item.commentParent).then(resp => {
                                    if (resp && resp.data.code === 200) {

                                        let temp = item;

                                        this.$axios.get('/user/get/'+resp.data.result.commentAuthor).then(res => {
                                            if (res && res.data.code === 200) {

                                                temp.tempName =res.data.result.userNickname;
                                                _is.$set(temp,"oldCom",res.data.result.userNickname);


                                            }
                                        })
                                        _this.$set(item,'reply',_this.tempName+"  "+resp.data.result.commentUpdate);


                                    }
                                })
                            }
                        })
                    }
                })
            },
            getName(id){
                let _this =this;
                this.$axios.get('/user/get/'+id).then(resp => {
                    if (resp && resp.data.code === 200) {
                        // _this.books = resp.data.result
                        // console.log(resp.data.result.userNickname);
                        _this.tempName =  resp.data.result.userNickname;
                        // _this.tempName=resp.data.result.userNickname;
                        // item.userNickname=resp.data.result.userNickname;
                        // console.log(resp.data.result.userNickname);
                        // _this.follows.userNickName = resp.data.result.userNickname;
                        // return row.followFollowerid=resp.data.result.userNickname;

                    }
                })
            }
        },
        mounted(){
            this.blogID=this.$route.query.blogId;
            this.commenter=this.$store.state.uid;
            this.loadComment();
            console.log(this.blogID);

        }
    }
</script>

<style scoped>
    .commentBox textarea {overflow: auto; width: 100%; height: 95px; outline: none; resize: none;}
    .commentBox button {float:right; margin-left:20px; padding:5px 30px; background:#01553D; border-radius:5px; color:#fff; font-size:16px;}
    .commentBox button:hover {color:#fff; background:#047857}
    .commentBox {margin:20px;}
    .commentBox h3 {color: #634322; background: #e9e5df; padding: 8px 15px; text-align: left; font-size: 16px;}
    .reply {margin:15px 0 15px 50px;}
    .comment {margin-bottom:15px;}
    .comment + .comment, .reply + .reply{border-top:1px solid #ccc;}
    .comment b{color:#01553D; font-size:16px; display:block; margin:5px 0;}
    .comment b span {color:#333; font-size:14px; margin-left:20px;}
    .comment p {font-size:16px; color:#333;}
</style>