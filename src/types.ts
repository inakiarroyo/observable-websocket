export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export type DataSources = Array<{
  title: string, image: string
}>;

export interface Styles {
  [key: string]: React.CSSProperties;
}
