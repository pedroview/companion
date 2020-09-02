// sleep function
const sleep = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time * 1000));
};

export { sleep };
