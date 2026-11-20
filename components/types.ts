export type EventItem = {
  id: number;
  _id: string;
  title: string;
  type: string;
  location: string;
  date: string;
  email: string;
  name: string;
  day: string;
  month: string;
  image: string;
  description: string;
  people: number;
  createdBy:{
    name:string;
    email:string;
    image:string;
  }
};
