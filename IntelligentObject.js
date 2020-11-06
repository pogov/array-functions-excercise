export function InteligentObject(targetObject) {
  const createProxyTargetObject = (sourceObject) => ({
    ...sourceObject,
    onChangeFnParams: null,
    onChange: function (callbackFn) {
      if (!callbackFn) console.log("default log", this.onChangeFnParams);
      if (callbackFn) callbackFn(this.onChangeFnParams);
    },
  });

  const proxyTarget = createProxyTargetObject(targetObject);

  const proxyHandler = {
    set: (target, prop, value) => {
      const hasKey = prop in target;
      if (!hasKey) {
        console.error(`Key "${prop}" not exist. You can not add new keys`);
        return true;
      }

      const prevValue = target[prop];
      if (prevValue === value) return true;
      target[prop] = value;
      const timestamp = new Date().getTime();
      proxyTarget.onChangeFnParams = { prop, prevValue, value, timestamp };
      proxyTarget.onChange();

      return true;
    },
    get: (target, prop) => {
      console.log(`Prop "${prop}" has been read`);
      if (prop === "onChange")
        proxyTarget.onChangeFnParams = { prop, ...target };
      return target[prop];
    },
  };

  return new Proxy(proxyTarget, proxyHandler);
}
