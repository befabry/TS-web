import { CollectionView } from "./CollectionView";
import { User, UserProps } from "./../Models/User";
import { UserShow } from "./UserShow";

export class UserList extends CollectionView<User, UserProps> {
  renderItem(model: User, itempParent: Element): void {
    console.log("renderItem");
    new UserShow(itempParent, model).render();
  }
}
