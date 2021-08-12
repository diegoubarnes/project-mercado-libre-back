export class ItemProduct {
  public id: string;
  public title: string;
  public price: { currency: string; amount: number; decimals: number };
  public picture: string;
  public condition: string;
  public free_shipping: boolean;
  public sold_quantity: number;
  public description: string;

  constructor(data?: any) {
    this.id = data && data.id ? data.id : null;
    this.title = data && data.title ? data.title : null;
    this.price = data && data.price ? data.price : null;
    this.picture =
      data && data.pictures && data.pictures?.length > 0
        ? data.pictures[0]?.url
        : null;
    this.condition = data && data.condition ? data.condition : null;
    this.free_shipping = data && data.free_shipping ? data.free_shipping : false;
    this.sold_quantity = data && data.sold_quantity ? data.sold_quantity : null;
    this.description = data && data.description ? data.description : null;
  }
}
