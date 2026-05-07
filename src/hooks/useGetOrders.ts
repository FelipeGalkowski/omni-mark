import { OrdersService } from "@/service/OrdersService";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";

export function useGetOrders() {
  const { signed } = useAuth();

  const { data } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => await OrdersService.getOrders(),
    staleTime: 1 * 60 * 1000,
    enabled: signed
  });

  return {
    orders: data?.results ?? [],
    paging: data?.paging
  }
}

export function useGetOrdersCount() {
  const { signed } = useAuth();

  const { data } = useQuery({
    queryKey: ["orders-count"],
    queryFn: async () => await OrdersService.getOrdersCount(),
    staleTime: 1 * 60 * 1000,
    enabled: signed
  });

  return {
    total: data?.total ?? 0,
    seller: data?.seller
  }
}
