import { UserList } from "./Views/UserList";
import { User } from "./Models/User";

const users = User.buildCollection();

users.on("change", () => {
  const root = document.getElementById("root");

  if (root) {
    new UserList(root, users).render();
  }
});

users.fetch();

console.log(users);
