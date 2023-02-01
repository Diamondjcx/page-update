import { h, ref } from "vue";
import { Updater } from "./updater";

const visible = ref(false);
const _url = ref("");
// checkVersion({
//   auto_refresh: false,
//   delay: 1000 * 20,
//   success: (url) => {
//     visible.value = true;
//     _url.value = url;
//   },
//   fail: (url) => {
//     // console.log(url);
//   },
//   error: () => {
//     // consosle.log("error");
//   },
// });

const up = new Updater({
  timer: 2000,
});

// todo 回调出三个方法亦可

//未更新通知
up.on("no-update", () => {
  console.log("未更新");
});
//更新通知
up.on("update", () => {
  console.log("更新了");
});
const handleRefresh = () => {
  window.location.replace(_url.value);
};
