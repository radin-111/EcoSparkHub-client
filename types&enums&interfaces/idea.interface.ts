export enum IdeaStatus {
  DRAFT = "DRAFT",
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
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

export interface GeneralIdea {
  id: string;
  name: string;
  imageUrl: string;
  isPaid: boolean;
  up_vote: number;
  down_vote: number;
  createdAt: string;
}
