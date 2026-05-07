import { OrdersService } from "@/service/OrdersService";
import { useQuery } from "@tanstack/react-query";
import { storageKeys } from "@/config/storageKeys";

export function useGetOrders() {
  const token = sessionStorage.getItem(storageKeys.accessToken);

  const { data } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => await OrdersService.getOrders(),
    staleTime: 1 * 60 * 1000,
    enabled: !!token
  });

  return {
    orders: data?.results ?? [],
    paging: data?.paging
  }
}

export function useGetOrdersCount() {
  const token = sessionStorage.getItem(storageKeys.accessToken);

  const { data } = useQuery({
    queryKey: ["orders-count"],
    queryFn: async () => await OrdersService.getOrdersCount(),
    staleTime: 1 * 60 * 1000,
    enabled: !!token
  });

  return {
    total: data?.total ?? 0,
    seller: data?.seller
  }
}
