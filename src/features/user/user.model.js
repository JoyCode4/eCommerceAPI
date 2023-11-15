export default class UserModel {
  constructor(id, name, email, password, type) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type;
  }

  static signUp(name, email, password, type) {
    const id = users.length + 1;
    const newUser = {
      id,
      name,
      email,
      password,
      type,
    };

    users.push(newUser);
    return newUser;
  }

  static signIn(email, password) {
    const user = users.find((u) => u.email == email && u.password == password);

    if (!user) {
      return null;
    }
    return user;
  }

  static get() {
    return users;
  }
}

const users = [
  {
    id: 1,
    name: "John",
    email: "john@example.com",
    password: "password1",
    type: "seller",
  },
];
