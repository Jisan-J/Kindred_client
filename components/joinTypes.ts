export type JoinEventPeoples = {
  _id: string;
  eventId: string;
  id: number;
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
  joinerEmail: string;
  joinerImage?: string;
  people: number;
  createdBy: {
    name: string;
    email: string;
    image: string;
  };
}