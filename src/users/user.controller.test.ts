import assert from "node:assert";
import { describe, it, mock } from "node:test";
import { userControllerFactory } from "./user.controller";

const user = {
  _id: "66b7c4d2613442857f70677a",
  email: "jane@example.com",
  password: "$2b$10$hashedvalue",
  firstName: "Jane",
  lastName: "Doe",
};

const createResponseStub = () => {
  const res: any = {
    statusCode: 200,
    body: undefined,
    ended: false,
  };
  res.status = mock.fn((code: number) => {
    res.statusCode = code;
    return res;
  });
  res.json = mock.fn((payload: unknown) => {
    res.body = payload;
    return res;
  });
  res.end = mock.fn(() => {
    res.ended = true;
    return res;
  });
  return res;
};

describe("UserController", () => {
  it("Should get the connected user without exposing the password", async () => {
    // Arrange
    const getUser = mock.fn(() => user);
    const userServiceStub: any = { getUser };
    const userController = userControllerFactory(userServiceStub);
    const req: any = { user: { _id: user._id } };
    const res = createResponseStub();

    // Act
    await userController.getCurrentUser(req, res, mock.fn());

    // Assert
    assert.equal(getUser.mock.callCount(), 1);
    assert.deepEqual(getUser.mock.calls[0].arguments, [user._id]);
    assert.deepEqual(res.body, {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });
    assert.equal("password" in (res.body as object), false);
  });

  it("Should answer 404 when the user ID is not a valid ObjectId", async () => {
    // Arrange
    const getUser = mock.fn(() => user);
    const userServiceStub: any = { getUser };
    const userController = userControllerFactory(userServiceStub);
    const req: any = { params: { userId: "not-an-object-id" } };
    const res = createResponseStub();

    // Act
    await userController.getUserById(req, res, mock.fn());

    // Assert
    assert.equal(res.statusCode, 404);
    assert.equal(getUser.mock.callCount(), 0);
  });

  it("Should answer 404 when the user does not exist", async () => {
    // Arrange
    const getUser = mock.fn(() => null);
    const userServiceStub: any = { getUser };
    const userController = userControllerFactory(userServiceStub);
    const req: any = { params: { userId: "66b7c4d2613442857f706700" } };
    const res = createResponseStub();

    // Act
    await userController.getUserById(req, res, mock.fn());

    // Assert
    assert.equal(getUser.mock.callCount(), 1);
    assert.equal(res.statusCode, 404);
  });
});
