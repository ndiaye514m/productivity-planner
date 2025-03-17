export interface User{
    id: string;
    name: string;
    email: string;

  }

  /*export interface Visitor{
    id: string;
    name: string;
    email: string;
    password: string;
  }*/
   // export type Visitor= Omit<User,'id'>& {password: string};
    export type Visitor= Pick<User,'name' | 'email'>& {password: string};