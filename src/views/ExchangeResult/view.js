import { Toast } from "vant";
import { async } from "q";
export default {
    name: 'exchangeResult',
    data() {
        return {
            showStatus: this.$route.params.showStatus || "SUCCESS", //显示控制，SUCCESS为成功，否则为失败
        }
    },
    mounted() {
        if(this.showStatus === "SUCCESS") {
            let clipboard1 = new this.$clipboard('.copy');
            clipboard1.on('success', function(e) {
                Toast.success('复制成功');
                e.clearSelection();
            });
            clipboard1.on('error', function() {
                Toast('复制失败，请手动复制');
            });
        }
    }
}