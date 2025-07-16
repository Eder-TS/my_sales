// "Contrato" com os dados de criação de um customer.
// Necessário para atender Domain Driven Design e SOLID.
export interface ICreateCustomer {
  name: string;
  email: string;
}
