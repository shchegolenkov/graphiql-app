export enum RouteLinks {
  Welcome = '/',
  SignIn = '/signin',
  SignUp = '/signup',
  Main = '/main',
  NotFound = '/*',
}

export interface IFormData {
  email: string;
  password?: string;
  confirmPassword?: string;
}
