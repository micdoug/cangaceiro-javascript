System.register([], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      function _asyncToGenerator(fn) {
        return function () {
          var gen = fn.apply(this, arguments);
          return new Promise(function (resolve, reject) {
            function step(key, arg) {
              try {
                var info = gen[key](arg);
                var value = info.value;
              } catch (error) {
                reject(error);
                return;
              }

              if (info.done) {
                resolve(value);
              } else {
                return Promise.resolve(value).then(function (value) {
                  step("next", value);
                }, function (err) {
                  step("throw", err);
                });
              }
            }

            return step("next");
          });
        };
      }

      let HttpService = class HttpService {
        // get(url) {
        //   return new Promise((resolve, reject) => {
        //     const xhr = new XMLHttpRequest();
        //     xhr.open("GET", url);
        //     xhr.onreadystatechange = () => {
        //       if (xhr.readyState === 4) {
        //         if (xhr.status === 200) {
        //           resolve(JSON.parse(xhr.responseText));
        //         } else {
        //           reject(xhr.responseText);
        //         }
        //       }
        //     };
        //     xhr.send();
        //   });
        // }

        get(url) {
          return _asyncToGenerator(function* () {
            const response = yield fetch(url);
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
          })();
        }
      };

      _export("HttpService", HttpService);
    }
  };
});
//# sourceMappingURL=HttpService.js.map