"use strict";
(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // src/lib/split.ts
  var split_default;
  var init_split = __esm({
    "src/lib/split.ts"() {
      "use strict";
      split_default = (x) => Array.from(x.matchAll(/(?:,|\n|^)("(?:(?:"")*[^"]*)*"|[^",\n]*|(?:\n|$))/g)).map((y) => y[1]);
    }
  });

  // src/lib/createElement.ts
  var createChild, createElement_default;
  var init_createElement = __esm({
    "src/lib/createElement.ts"() {
      "use strict";
      createChild = (child) => typeof child === "string" ? document.createTextNode(child) : child;
      createElement_default = (tag, attributes, children) => {
        const root = document.createElement(tag);
        Object.entries(attributes).forEach(([k, v]) => root.setAttribute(k, `${v}`));
        (Array.isArray(children) ? children : [children]).forEach((child) => child && root.appendChild(createChild(child)));
        return root;
      };
    }
  });

  // src/index.ts
  var require_src = __commonJS({
    "src/index.ts"(exports) {
      init_split();
      init_createElement();
      var _a;
      (_a = document.querySelector("#fileupload")) == null ? void 0 : _a.addEventListener("change", (event) => __async(exports, null, function* () {
        var _a2, _b;
        const { files } = event.target;
        const text = yield files == null ? void 0 : files[0].text();
        const [header, ...rows] = (_a2 = text == null ? void 0 : text.split(/\r?\n/g).map(split_default)) != null ? _a2 : [];
        const table = createElement_default("table", {}, [
          createElement_default("thead", {}, createElement_default("tr", {}, header.map((cell, i) => createElement_default("th", {
            "data-numeric": !Number.isNaN(parseFloat(rows[0][i])),
            "data-order": "descending",
            "data-label": cell.toLocaleLowerCase()
          }, [
            createElement_default("div", {}, [
              cell,
              createElement_default("button", {
                type: "button",
                "data-index": i,
                "aria-label": `Sort by ${cell} (descending)`
              }, createElement_default("span", { "aria-hidden": true }, "-"))
            ])
          ])))),
          createElement_default("tbody", {}, rows.map((row) => createElement_default("tr", {}, row.map((cell) => createElement_default("td", {}, cell)))))
        ]);
        table.querySelectorAll("th button").forEach((root) => {
          root.addEventListener("click", () => {
            var _a3;
            const i = root.dataset.index ? +root.dataset.index : 0;
            const headerCell = Array.from(table.querySelectorAll("th"))[i];
            const isNumeric = headerCell.dataset.numeric === "true";
            const isDescending = headerCell.dataset.order === "descending";
            const button = headerCell.querySelector("button");
            (_a3 = table.querySelector("tbody")) == null ? void 0 : _a3.replaceChildren(...rows.sort((a, b) => {
              const x = a[i];
              const y = b[i];
              if (isNumeric && isDescending) return +y - +x;
              if (isNumeric) return +x - +y;
              if (isDescending) return y.localeCompare(x);
              return x.localeCompare(y);
            }).map((row) => createElement_default("tr", {}, row.map((cell) => createElement_default("td", {}, cell)))));
            headerCell.dataset.order = isDescending ? "ascending" : "descending";
            button == null ? void 0 : button.setAttribute("aria-label", `Sort by ${headerCell.dataset.label} (${headerCell.dataset.order})`);
            table.querySelectorAll("th button").forEach((x) => {
              x.innerText = "-";
            });
            if (button) button.innerText = isDescending ? "\u2193" : "\u2191";
          });
        });
        (_b = document.querySelector("#output")) == null ? void 0 : _b.replaceChildren(table);
      }));
    }
  });
  require_src();
})();
