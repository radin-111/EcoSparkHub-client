export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
  meta?: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  limit: number;
 
  totalPages: number;
}
export interface ApiErrorResponse {
  success: boolean;
  message: string;
}
