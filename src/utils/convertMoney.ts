export const convertVND = (money: any) => {
  const convert = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return convert.format(money);
};
