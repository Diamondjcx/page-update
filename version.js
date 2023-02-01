const setHtmlVersion = (version, apply) => {
  return {
    name: "html-transform",
    transformIndexHtml: (html, ctx) => {
      const index = html.indexOf("</head>");
      return (
        html.slice(0, index) +
        `<meta name="version" content="${version}" />` +
        html.slice(index)
      );
    },
  };
};
const checkVersion = async (options) => {
  var _a;
  let {
    auto_refresh = false,
    delay = 1e3 * 60,
    success = () => {},
    fail = () => {},
    error = () => {},
  } = options || {};
  const { origin, pathname, hash, search } = window.location;
  const date = new Date().valueOf();
  let _url = `${origin}${pathname}?t=${date}${hash}`;
  try {
    const res = await fetch(_url);
    const text = await res.text();
    const result = text.match(/<meta name="version" content="(.*?)"/);
    const local_versioiin =
      (_a = document.getElementsByTagName("meta")["version"]) == null
        ? void 0
        : _a.content;
    if (delay !== 0) {
      setTimeout(() => {
        checkVersion(options);
      }, delay);
    }
    if (!result || !result[1]) throw Error("no meta version");
    if (search && !search.startsWith("?t=")) {
      let s = search;
      const i = search.indexOf("t=");
      if (i !== -1) {
        s = search.slice(0, i - 1);
      }
      _url = `${origin}${pathname}${s}&t=${date}${hash}`;
    }
    if (result[1] !== local_versioiin) {
      if (auto_refresh) {
        window.location.replace(_url);
      } else {
        success(_url);
      }
    } else {
      fail(_url);
    }
  } catch {
    error();
  }
};
export { checkVersion, setHtmlVersion };
