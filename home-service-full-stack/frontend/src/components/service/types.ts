export interface Service {
  _id: string;
  name: string;
  about: string;
  address: string;
  category: string;
  contactPerson: string;
  email: string;
  imageUrls: string[];
  favoritedBy: string[];
  translations: {
    name: { [key: string]: string };
    about: { [key: string]: string };
    category: { [key: string]: string };
  };
}

export interface ServiceWithFavorite extends Service {
  isFavorite?: boolean;
}

export type NewService = Omit<
  Service,
  "_id" | "imageUrls" | "favoritedBy" | "translations"
>;
