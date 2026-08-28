import assert from "node:assert";
import { describe, it, mock } from "node:test";
import { userServiceFactory } from "./user.service";

const users = [
  {
    _id: "66b7c4d2613442857f70677a",
    email: "jane@example.com",
    password: "$2b$10$hashedvalue",
    firstName: "Jane",
    lastName: "Doe",
    __v: 0,
  },
];

const configServiceStub: any = {
  get: (key: string) =>
    ({ saltRounds: 10, jwtSecret: "test-secret", jwtTTL: "1m" } as any)[key],
};

describe("UserService", () => {
  it("Should get the user by ID", async () => {
    const getById = mock.fn((id) => users.find((user) => user._id === id));
    // Arrange
    const userRepositoryStub: any = { getById };
    const userService = userServiceFactory(userRepositoryStub, configServiceStub);

    // Cas 1: identifiant inconnu
    // Act
    await userService.getUser("66b7c4d2613442857f706700");

    // Assert
    assert.equal(getById.mock.callCount(), 1);
    assert.deepEqual(getById.mock.calls[0].arguments, [
      "66b7c4d2613442857f706700",
    ]);
    assert.deepEqual(getById.mock.calls[0].result, undefined);

    // Cas 2: identifiant existant
    // Act
    const userId = "66b7c4d2613442857f70677a";
    await userService.getUser(userId);

    // Assert
    assert.equal(getById.mock.callCount(), 2);
    assert.deepEqual(getById.mock.calls[1].arguments, [userId]);
    assert.deepEqual(getById.mock.calls[1].result, users[0]);
  });

  it("Should get the user by email", async () => {
    const getByEmail = mock.fn((email) =>
      users.find((user) => user.email === email)
    );
    // Arrange
    const userRepositoryStub: any = { getByEmail };
    const userService = userServiceFactory(userRepositoryStub, configServiceStub);

    // Act
    const email = "jane@example.com";
    await userService.getUserByEmail(email);

    // Assert
    assert.equal(getByEmail.mock.callCount(), 1);
    assert.deepEqual(getByEmail.mock.calls[0].arguments, [email]);
    assert.deepEqual(getByEmail.mock.calls[0].result, users[0]);
  });
});
