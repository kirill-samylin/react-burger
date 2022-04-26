export enum EOrderStatus {
  CREATED = 'created',
  PENDING = 'pending',
  DONE = 'done',
}

export type TOrder = {
  ingredients: string[];
  _id: string;
  status: EOrderStatus;
  number: number;
  createdAt: string;
  updatedAt: string;
  name: string;
};

export type TOrderDetails = {
  number?: number;
  name?: string;
};


