import { Collection } from "../Models/Collection";

export abstract class CollectionView<T, K> {
  constructor(public parent: Element, public collection: Collection<T, K>) {}

  abstract renderItem(model: T, itempParent: Element): void;

  render(): void {
    this.parent.innerHTML = "";

    const templateElement = document.createElement("template");

    this.collection.models.forEach((model) => {
      const itempParent = document.createElement("div");
      this.renderItem(model, itempParent);
      templateElement.content.append(itempParent);
    });

    this.parent.append(templateElement.content);
  }
}
