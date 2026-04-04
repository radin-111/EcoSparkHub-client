export enum IdeaStatus {
  DRAFT = "DRAFT",
  PENDING = "PENDING",
}
export interface IdeaData {
  id: string;
  title: string;
  content: string;
  image: string;
  categoryId: string;
  isPaid: false;
  price: number;
  status: IdeaStatus;
}


export interface myIdeaData {
  id: string;
  name: string;
  imageUrl: string;
  isPaid: false;
}
