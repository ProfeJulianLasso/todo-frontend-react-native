export interface IServerResponse<Type> {
  status?: string;
  statusCode?: number;
  message: string;
  error?: string;
  data: Type;
}
