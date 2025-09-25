export const ROUTES = {
  HOME: "/:lang",
  SERVICES: "/:lang/services",
  SERVICES_CATEGORY: "/:lang/services/categories/:category",
  SERVICE_ID: "/:lang/service/:id",
  ABOUT_US: "/:lang/about-us",
  FOR_BUSINESS_PARTNERS: "/:lang/for-business-partners",
  LOGIN: "/:lang/auth/login",
  REGISTER: "/:lang/auth/register",
  ACCOUNT: "/:lang/user/:email",
  BOOKINGS: "/:lang/bookings/user/:email",
  BOOKINGS_FILTER: "/:lang/bookings/user/:email/:status",
  FAVORITES: "/:lang/services/user/:email/favorites",
  FAVORITES_CATEGORY: "/:lang/services/user/:email/favorites/:category",

  ERROR_LANG: "/:lang/*",
  ERROR_GLOBAL: "*",
};
