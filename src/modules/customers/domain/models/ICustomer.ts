// Interface de como um customer deve ser criado.
// Necessário para atender Domain Driven Design.
export interface ICustomer {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
