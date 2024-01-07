export enum RouteLinks {
  Welcome = '/',
  SignIn = '/signin',
  SignUp = '/signup',
  Main = '/main',
  NotFound = '/*',
}

export interface IQueryField {
  name: string;
  description: string;
}

export interface IQueryResponse {
  data: {
    __schema: {
      queryType: {
        fields: IQueryField[];
      };
    };
  };
}

export interface IFormData {
  email: string;
  password: string;
  confirmPassword?: string;
}
