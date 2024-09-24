export type Page<T> = {
    content: T[]
    pageable: Pageable
    totalPages: number
    totalElements: number
  }

  type Pageable = {
    pageNumber: number
    pageSize: number
  }