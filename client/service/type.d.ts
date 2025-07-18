type Pagination = {
    totalPages: number;
    limit: number;
    totalItems: number;
    page: number;
};

type APIPaginationResponse<T> = {
    data: T;
    panigation: Pagination;
};