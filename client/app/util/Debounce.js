System.register([], function (_export, _context) {
  "use strict";

  function debounce(fn, msTimeout) {
    // every time the
    let timer = 0;

    // every time the function is called, it cancels the current timer and creates a new one
    // so multiple triggers will lead to the function being replaced multiple times.
    return () => {
      clearTimeout(timer);
      timer = setTimeout(fn, msTimeout);
    };
  }

  _export("debounce", debounce);

  return {
    setters: [],
    execute: function () {}
  };
});
//# sourceMappingURL=Debounce.js.map