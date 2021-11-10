export const randomString = (): string => {
  return Math.random().toString(20).substr(2, 10);
};
