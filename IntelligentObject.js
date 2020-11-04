function InteligentObject(targetObject) {
  let onChangeFnParams;
  const createProxyTargetObject = (sourceObject) => ({
    ...sourceObject,
    onChangeFnParams,
    onChange: (callbackFn) => {
      if (!callbackFn) console.log("default log", onChangeFnParams);
      if (callbackFn && onChangeFnParams) callbackFn(onChangeFnParams);
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

      if (hasKey) {
        const prevValue = target[prop];
        target[prop] = value;
        const timestamp = new Date().getTime();
        onChangeFnParams = { prop, prevValue, value, timestamp };
        if (prevValue === value) return true;
        proxyTarget.onChange();
      }
      return true;
    },
    get: (target, prop) => {
      console.log(`Prop "${prop}" has been read`);
      if (prop === "onChange") onChangeFnParams = { prop, target };
      return target[prop];
    },
  };

  return new Proxy(proxyTarget, proxyHandler);
}
