<template>
    <div>
        <el-card style="text-align: left;width: 900px;margin: 35px auto 0 auto;">
            <div>
                <h5>XXX评论了您的文章</h5>
            </div>
            <div>
                <el-button class="follow" >
                    <a @click="deFollow">已读</a>
                </el-button>
            </div>

        </el-card>
    </div>
</template>

<script>
    export default {
        name: "UserAction"
    }
</script>

<style scoped>

</style>