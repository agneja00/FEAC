export interface Business {
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

export type NewBusiness = Omit<Business, "_id" | "imageUrls">;
