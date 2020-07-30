import { User } from "./Models/User";

const user = new User({ name: "Bernard", age: 88 });

user.on("change", () => {});
user.on("change", () => {});
user.on("test", () => {});

console.log(user);
