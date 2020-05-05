<template>
    <div>
        <user-card></user-card>
        <show-all  style= "text-align: left;width: 990px;margin: 35px auto 0 auto;"></show-all>
    </div>

</template>

<script>
    import UserCard from '../../components/UserCard'
    import ShowAll from '../../components/ShowAll' //引入显示所有博文

    export default {
        name: "ShowUser",
        components:{
            UserCard,
            ShowAll
        },
        data(){
            return {
                userID:''
            }
        },
        mounted() {

        },
    }
</script>

<style scoped>

</style>