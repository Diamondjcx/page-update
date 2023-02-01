import { h, ref } from "vue";
import { checkVersion } from "check-version";
const visible = ref(false);
const _url = ref("");
checkVersion({
  auto_refresh: false,
  delay: 1000 * 20,
  success: (url) => {
    visible.value = true;
    _url.value = url;
  },
  fail: (url) => {
    // console.log(url);
  },
  error: () => {
    // consosle.log('error')
  },
});
const handleRefresh = () => {
  window.location.replace(_url.value);
};
