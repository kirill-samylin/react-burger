export type TOrderStatus = 'created' | 'pending' | 'done'

export type TOrder = {
  ingredients: string[];
  _id: string;
  status: TOrderStatus;
  number: number;
  createdAt: string;
  updatedAt: string;
  name: string;
};

export type TOrderDetails = {
  number?: number;
  name?: string;
};


