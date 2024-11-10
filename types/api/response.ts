// types/api/response.ts - API 响应相关类型
export enum ApiCode {
  SUCCESS = 0,
  INVALID_PARAMS = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500,

  // 业务状态码
  VALIDATION_FAILED = 40001,
  RESOURCE_EXISTS = 40002,
  RESOURCE_NOT_FOUND = 40004,
  INVALID_TOKEN = 40101,
  TOKEN_EXPIRED = 40102,
}

export interface ApiResponse<T = any> {
  code: ApiCode
  data: T
  message: string
  timestamp: number
  traceId?: string
}

export interface PaginatedData<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export type ApiResponseList<T> = ApiResponse<PaginatedData<T>>
