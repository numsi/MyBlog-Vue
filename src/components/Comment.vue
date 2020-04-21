<template>
    <div id="comment">
        <el-card style="text-align: left;width: 990px;margin: 35px auto 0 auto">
            <!--评论显示-->
            <div class="commentBox">
                <h3>评论</h3>
                <p v-if="comment.length==0">暂无评论，我来发表第一篇评论！</p>
                <div v-else>
                    <div class="comment" v-for="(item,index) in comment" v-bind:index="index" >
                        <div>
                            <b>{{item.name}}<span>{{item.time}}</span></b>
                            <p @click="changeCommenter(item.name,index)">{{item.content}}</p>
                        </div>
                        <div v-if="item.reply.length > 0">
                            <div class="reply" v-for="reply in item.reply">
                                <b>{{reply.responder}}  回复  {{reply.reviewers}}<span>{{reply.time}}</span></b>
                                <p @click="changeCommenter(reply.responder,index)">{{reply.content}}</p>
                            </div>
                        </div>
                    </div>
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
                commenter: "session",   //评论人
                type: 0,                //0为评论作者1为评论别人的评论2为评论别人的别人
                oldComment: null,
                chosedIndex: -1,        //被选中的评论的index
                comment: [
                    {
                        name: "有毒的黄同学",
                        time: "2016-08-17",
                        content: "好,讲得非常好，good",
                        reply: [
                            {
                                responder: "有毒的黄同学",
                                reviewers: "傲娇的",
                                time: "2016-09-05",
                                content: "你说得对"
                            },
                            {
                                responder: "傲娇的",
                                reviewers: "有毒的黄同学",
                                time: "2016-09-05",
                                content: "很强"
                            }
                        ]
                    },
                    {
                        name: "Freedom小黄",
                        time: "2016-08-17",
                        content: "好,讲得非常好，good",
                        reply: []
                    }
                ],    //评论内容
                commentText:'',
                name:''
            }
        },
        methods:{
            //增加评论
            addComment(data) {
                if(this.type == 0) {
                    this.comment.push({
                        name: 'session',
                        time: getTime(),
                        content: data,
                        reply: []
                    });
                    //服务器端变
                }else if(this.type == 1){
                    this.comment[this.chosedIndex].reply.push({
                        responder: 'session',
                        reviewers:this.comment[this.chosedIndex].name,
                        time: getTime(),
                        content: data
                    });
                    this.type = 0;
                }
            },
            //改变回复者
            changeCommenter(name,index){
                this.oldComment = name;
                this.chosedIndex = index;
                this.type = 1;
                console.log(name);
            },
            //改变回复者为本文作者
            canelComment() {
                this.type = 0;
            }
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