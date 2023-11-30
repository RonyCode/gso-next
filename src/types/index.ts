export interface UserType {
  nome: string;
  email: string;
  cpf: string;
  data_nascimento: string;
  telefone: string;
  cep: string;
  endereco: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  senha: string;
  confirmaSenha: string;
}

export interface UserRegisterError {
  errors: UserType | null;
  success: boolean;
}

export interface CepProps {
  city: string;
  cityId: string;
  complement: string;
  district: string;
  districtId: string;
  ibgeId: string;
  state: string;
  stateShortname: string;
  street: string;
  zipcode: string;
  code: number;
  error: boolean;
  message: string;
  unknown: string;
}
