import { ProxyFactory } from "./ProxyFactory.js";

// Wraps a model in a proxy that observes function calls or property changes
// and calls the view update method when appropriate.
export class Bind {
  constructor(model, view, observableProperties) {
    const proxy = ProxyFactory.create(model, observableProperties,
      () => view.update(model));
    view.update(model);
    // returning from a constructor??? WTF
    return proxy;
  }
}