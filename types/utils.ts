// types/utils.ts - 工具类型
export type Nullable<T> = T | null

export type Optional<T> = T | undefined

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }

export type PickPartial<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
