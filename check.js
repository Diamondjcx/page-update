import { h, ref } from "vue";
import { checkVersion } from "check-version";
import { Updater } from "../uitls/updater";

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
//未更新通知
up.on("no-update", () => {
  console.log("未更新");
});
//更新通知
up.on("update", () => {
  console.log("更新了");
});
const handleRefresh = () => {
  // 触发版本更新
  __bl.sum("event-versionUpdate");

  window.location.replace(_url.value);
};
