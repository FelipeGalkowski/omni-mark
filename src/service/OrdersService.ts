import { httpClient } from "./httpClient";

export class OrdersService {
  static async getOrders(sellerId: string) {
    const { data } = await httpClient.get(`/orders?seller=${sellerId}`);
    return data;
  }

  static async getOrdersCount(sellerId: string) {
    const { data } = await httpClient.get(`/orders/count?seller=${sellerId}`);
    return data;
  }
}
