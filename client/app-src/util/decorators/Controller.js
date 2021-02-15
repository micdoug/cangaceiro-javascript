export function controller(...seletores) {
  const elements = seletores.map(seletor => document.querySelector(seletor));
  return function (constructor) {
    const constructorOriginal = constructor;
    const constructorNovo = function () {
      const instance = new constructorOriginal(...elements);
      Object.getOwnPropertyNames(constructorOriginal.prototype)
        .forEach(property => {
          if (Reflect.hasMetadata('bindEvent', instance, property)) {
            associaEvento(instance, Reflect.getMetadata('bindEvent', instance, property));
          }
        });
      return instance;
    };
    constructorNovo.prototype = constructorOriginal.prototype;
    return constructorNovo;
  };
}

function associaEvento(instance, metadata) {
  document.querySelector(metadata.seletor).addEventListener(metadata.event, event => {
    if (metadata.prevent) event.preventDefault();
    instance[metadata.propertyKey](event);
  });
}