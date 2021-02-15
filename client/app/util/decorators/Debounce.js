System.register([], function (_export, _context) {
  "use strict";

  function debounce(msTimeout = 500) {
    return function (target, key, descriptor) {
      const metodoOriginal = descriptor.value;
      let timer = 0;
      descriptor.value = function (...args) {
        clearTimeout(timer);

        if (event) event.preventDefault();

        console.log(`configurando timer para ${msTimeout}ms`);
        timer = setTimeout(() => metodoOriginal.apply(this, args), msTimeout);
      };
      return descriptor;
    };
  }

  _export("debounce", debounce);

  return {
    setters: [],
    execute: function () {}
  };
});
//# sourceMappingURL=Debounce.js.map