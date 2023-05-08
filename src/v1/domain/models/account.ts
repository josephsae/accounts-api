export interface Account {
  id: string;
  holder: string;
  identification: Identification;
  bank: Bank;
  number: string;
  type: string;
}

interface Identification {
  number: string;
  type: string;
}

interface Bank {
  id: string;
  name: string;
}
