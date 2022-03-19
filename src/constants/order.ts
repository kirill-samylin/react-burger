import { EOrderStatus } from "types/order";

export const orderStatus: Record<EOrderStatus, string> = {
  [EOrderStatus.CREATED]: 'Создан',
  [EOrderStatus.DONE]: 'Выполнен',
  [EOrderStatus.PENDING]: 'Готовится',
}
