<template>
    <div class="wrapper">
        <img class="baseImg" :src="imgUrl" alt="分享图片" >
        <div class="box" ref="box">
            <div class="bg">
                <img src="../assets/images/share/share.jpg" alt="">
            </div>
            <div id="qrcode" />
        </div>
    </div>
</template>
<script>
import QRcode from 'qrcodejs2'
import html2canvas from 'html2canvas'
import { Toast } from 'vant';

export default {
    data() {
        return {
            imgUrl: ''
        }
    },
    methods: {
        getData() {
            this.$post('/user/inviteFriends', {userId: this.$store.state.userId}).then(res => {
                this.qrcode(res.data)
                html2canvas(this.$refs.box).then((canvas) => {
                    this.imgUrl =  canvas.toDataURL("image/jpeg")
                    setTimeout(()=>{
                    Toast('图片已生成，长按保存分享给你的好友吧');
                    },1000)
                });
            })
        },
        qrcode(url) {
            let qrcode = new QRcode('qrcode', {
            width: 70,
            height: 70, // 高度
            text: url, // 二维码内容
            });
        },
    },
    mounted() {
    },
    watch: {
        '$store.state.userId': {handler: function(newVal){
            if(newVal) {
                this.getData()
            }
        }, immediate: true} 
    }
}
</script>
<style scoped lang="less">
    .wrapper {
        width: 100%;
        height: 100%;
        position: relative;
        .baseImg {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 99;
        }
        .box {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        .bg {
            position: absolute;
            width: 100%;
            height: 100%;
            img {
                width: 100%;
                height: 100%;
            }
        }
        #qrcode {
            width: 10%;
            bottom: 50px;
            position: absolute;
            left: 40%;
        }
    }
</style>
