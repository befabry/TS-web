import axios, { AxiosResponse } from "axios";

export class Sync {
  fetch(): void {
    if (this.get("id") === undefined) {
      throw new Error("The User has no id property");
    }

    axios
      .get(`http://localhost:3000/users/${this.get("id")}`)
      .then((response: AxiosResponse): void => {
        this.set(response.data);
      });
  }

  save(): void {
    if (this.get("id")) {
      axios.put(`http://localhost:3000/users/${this.get("id")}`, this.data);
    } else {
      axios.post("http://localhost:3000/users", this.data);
    }
  }
}
