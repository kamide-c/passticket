export interface IPaginatedResponse<T> {
  currentDataCount: number;
  data: Array<T>;
  length: number;
  errorList: Array<string>;
  nextPage: number;
  success: boolean;
  totalDataCount: number;
  totalPages: number;
}
