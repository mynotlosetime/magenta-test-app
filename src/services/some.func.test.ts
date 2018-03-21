import sum from "./some.func";

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

const myBeverage = {
  delicious: true,
  sour: false
};

describe("my beverage", () => {
  it("is delicious", () => {
    expect(myBeverage.delicious).toBeTruthy();
  });

  it("is not sour", () => {
    expect(myBeverage.sour).toBeFalsy();
  });
});
