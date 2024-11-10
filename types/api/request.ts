// types/api/request.ts - API 请求相关类型
export interface PaginationParams {
  page?: number
  pageSize?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface SearchParams {
  keyword?: string
  startDate?: string
  endDate?: string
  status?: string
}

// 通用请求类型生成器
export type CreateRequest<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateRequest<T> = Partial<CreateRequest<T>>
