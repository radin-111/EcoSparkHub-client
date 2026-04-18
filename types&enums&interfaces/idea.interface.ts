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
// {
//   "id": "19a5289a-ff5c-4700-acaf-ee63a668ebec",
//   "userId": "icEFUVhCaSpbRq3CSDDISpCLkrvCxMy6",
//   "ideaId": "b9a1ab6d-f6f7-4589-a4ff-8239e05e7633",
//   "isUpVote": true
// }

export interface Voted{
  id:string;
  userId:string;
  isUpVote:boolean;
  ideaId:string;
}