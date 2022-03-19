import { AppState } from "store/types";

export const isLoadingPageSelector = ({order, ingredient, user}: AppState) =>
  order.ordersLoading || ingredient.ingredientsRequest || !user.isInitialized;

