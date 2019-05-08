<template>
    <div class="wrapper">
        <div class="bg">
            <img src="../assets/images/share/bg.jpg" alt="">
        </div>
        <router-link to="/haibao" class="button">
            <img src="../assets/images/share/button.png" alt="">
        </router-link>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    }
}
</script>
<style scoped lang="less">
    .wrapper {
        width: 100%;
        height: 100%;
        position: relative;
        .bg {
            position: absolute;
            width: 100%;
            height: 100%;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .button {
            position: absolute;
            width: 180px;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            img {
                width: 100%;
            }
        }
    }
</style>
