import { User } from "./Models/User";

const user = new User({ name: "record", age: 0 });
//user.save();

user.events.on("change", () => {
  console.log("test");
});

user.events.trigger("change");
