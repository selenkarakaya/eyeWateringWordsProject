import { validateEmail, validatePassword } from "../pages/Register";

describe("validate password", () => {
  it("should be a function", () => {
    expect(typeof validatePassword).toEqual("function");
  });
  it("should be a false or true", () => {
    expect(validatePassword("redrose")).toEqual(false);
    expect(validatePassword("redrose10")).toEqual(false);
    expect(validatePassword("Redroses")).toEqual(false);
    expect(validatePassword("Redroses23")).toEqual(true);
  });
});

describe("validate email", () => {
  it("should be a function", () => {
    expect(typeof validateEmail).toEqual("function");
  });
  it("should be a false or true", () => {
    expect(validateEmail("redrose")).toEqual(false);
    expect(validateEmail("redrose10@gmail")).toEqual(false);
    expect(validateEmail("Redroses23@gmail.com")).toEqual(true);
    expect(validateEmail("redroses23@gmail.com")).toEqual(true);
  });
});
