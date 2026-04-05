export enum IdeaStatus {
  DRAFT = "DRAFT",
  PENDING = "PENDING",
}
export interface IdeaData {
  id: string;
  name: string;
  imageUrl: string;
  isPaid: false;
  price: number;
  status: IdeaStatus;
  up_vote: number;
  down_vote: number;
  categoryId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  description: string;

  content: string;
  image: string;
}

export interface myIdeaData {
  id: string;
  name: string;
  imageUrl: string;
  isPaid: false;
  price: number;
  status: IdeaStatus;
  up_vote: number;
  down_vote: number;
  categoryId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  description: string;

  content: string;
  image: string;
}
