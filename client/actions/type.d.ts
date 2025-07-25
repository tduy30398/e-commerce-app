type Pagination = {
  totalPages: number;
  limit: number;
  totalItems: number;
  page: number;
};

type APIPaginationResponse<T> = {
  data: T;
  pagination: Pagination;
};

type BaseFilterParams = {
  keyword?: string;
  limit?: number;
  page?: number;
  search?: string;
  minRating?: number;
  onSale?: boolean;
  minPrice?: number;
  maxPrice?: number;
};
