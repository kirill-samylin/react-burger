import { TOrderStatus } from "types/order";

export const orderStatus: Record<TOrderStatus, string> = {
  created: 'Создан',
  done: 'Выполнен',
  pending: 'Готовится',
}
