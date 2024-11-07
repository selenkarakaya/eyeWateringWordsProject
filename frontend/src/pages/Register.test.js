import { Provider } from "react-redux";
import Register from "./Register";
import * as reactRedux from "react-redux";
import { MemoryRouter, Route } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

const mockDispatch = jest.fn();
const mockSelector = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
  useSelector: () => mockSelector,
}));
const mockUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUsedNavigate,
}));
describe(Register, () => {
  it("should be a false or true", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Register />{" "}
      </MemoryRouter>
    );
    const password = getByTestId("sbmt").textContent;
    expect(password).toEqual("Submit");
  });
  test("should be a false or true", async () => {
    const validatePassword = jest.fn();
    const onClick = jest.fn();
    const { getByTestId, getByRole, getByPlaceholderText } = render(
      <MemoryRouter>
        <Register validatePassword={validatePassword} onClick={onClick} />{" "}
      </MemoryRouter>
    );

    fireEvent.submit(getByTestId("registerForm"));
    expect(getByPlaceholderText("Password").validity.tooShort).toBe(false);
    const password = validatePassword.mockReturnValueOnce("selen");
    console.log(password);
    expect(password).toEqual(false);
  });
});
