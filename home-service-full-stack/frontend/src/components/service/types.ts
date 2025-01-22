export interface Service {
  _id: string;
  name: string;
  about: string;
  address: string;
  category: string;
  contactPerson: string;
  email: string;
  imageUrls: string[];
  favorite: boolean;
}

export type NewService = Omit<Service, "_id" | "imageUrls">;
