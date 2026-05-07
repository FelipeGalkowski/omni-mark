import { httpClient } from "./httpClient";
import { storageKeys } from "@/config/storageKeys";

export class OrdersService {
  static getSellerId(): string {
    const token = sessionStorage.getItem(storageKeys.accessToken);
    return token?.split('-').pop() ?? '';
  }

  static getToken(): string {
    return sessionStorage.getItem(storageKeys.accessToken) ?? '';
  }

  static async getOrders() {
    const sellerId = OrdersService.getSellerId();
    const token = OrdersService.getToken();
    const { data } = await httpClient.get(`/orders?seller=${sellerId}&token=${token}`);
    return data;
  }

  static async getOrdersCount() {
    const sellerId = OrdersService.getSellerId();
    const token = OrdersService.getToken();
    const { data } = await httpClient.get(`/orders/count?seller=${sellerId}&token=${token}`);
    return { total: data.total, seller: data.seller };
  }
}
