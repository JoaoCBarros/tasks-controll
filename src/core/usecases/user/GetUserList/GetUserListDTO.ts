export interface GetUserListQueryParams {
  search?: string;
  page?: number;
  perPage?: number;
  order?: "asc" | "desc";
  orderField?: string;
}
