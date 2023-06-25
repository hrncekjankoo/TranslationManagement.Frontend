import { TranslatorStatus } from "./TranslatorStatus";

export class Translator {
  constructor(
    id: number,
    name: string,
    hourlyRate: number,
    status: TranslatorStatus,
    creditCardNumber: string
  ) {
    this.id = id;
    this.name = name;
    this.hourlyRate = hourlyRate;
    this.status = status;
    this.creditCardNumber = creditCardNumber;
  }
  id: number;
  name: string;
  hourlyRate: number;
  status: TranslatorStatus;
  creditCardNumber: string;
}
