import { CardDTO } from "./CardDTO";

export interface CardPage {
  content: CardDTO[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: string;
  size: number;
  sort: any;
  totalElements: number;
  totalPages: number;
}