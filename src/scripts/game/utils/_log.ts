const log = (methodName: string, caller: string) => {
  console.log(`[${caller}:${methodName}] invoked`);
};

export default log;
