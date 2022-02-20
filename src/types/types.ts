export interface LocationItem {
  url: string;
  title: string;
  path: string;
  isRedirect?: boolean;
}

export type LocationState = LocationItem[];
