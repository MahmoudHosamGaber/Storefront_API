import { User, UserStore } from "../users";
describe("Test the users model", () => {
  const user = new UserStore();
  it("Should have a create method", (): void => {
    expect(user.create).toBeDefined();
  });
  it("Should have an index method", (): void => {
    expect(user.index).toBeDefined();
  });
  it("Should have a show method", (): void => {
    expect(user.show).toBeDefined();
  });

  it("Should create a user", async (): Promise<void> => {
    const newUser: User = {
      first_name: "John",
      last_name: "Doe",
      password: "password",
    };
    const result = await user.create(newUser);
    expect(result).toEqual({
      id: 1,
      first_name: "John",
      last_name: "Doe",
      password: "password",
    });
  });

  it("Should get all users", async (): Promise<void> => {
    const result = await user.index();
    expect(result).toEqual([
      {
        id: 1,
        first_name: "John",
        last_name: "Doe",
        password: "password",
      },
    ]);
  });
  it("Should create a user", async (): Promise<void> => {
    const newUser: User = {
      first_name: "Jane",
      last_name: "Doe",
      password: "password",
    };
    const result = await user.create(newUser);
    expect(result).toEqual({
      id: 2,
      first_name: "Jane",
      last_name: "Doe",
      password: "password",
    });
  });
  it("Should get a user", async (): Promise<void> => {
    const result = await user.show("2");
    expect(result).toEqual({
      id: 2,
      first_name: "Jane",
      last_name: "Doe",
      password: "password",
    });
  });
});
