import { UserForm } from "./Views/UserForm";
import { User } from "./Models/User";

const user = User.build({ name: "Name", age: 20 });
const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found");
}

const form = new UserForm(root, user);
form.render();
