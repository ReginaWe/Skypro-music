export interface ErrorMessage {
  status: number;
  message: string;
  endpoint: string;
}

export function getEmptyError(): ErrorMessage {
  return {
    status: 0,
    message: "",
    endpoint: "",
  };
}

export function isError(data: ErrorMessage | any): data is ErrorMessage {
  return (<ErrorMessage>data).message !== undefined
}
