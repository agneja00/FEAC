import { useContext, useEffect } from "react";
import { useParams, useNavigate, generatePath } from "react-router-dom";
import { useFavoriteServices } from "../../service/hooks";
import FilteredList from "@/components/common/FilteredList";
import ServiceCard from "@/components/service/ServiceCard";
import { UserContext } from "@/components/context/UserContext";
import { ROUTES } from "@/constants/routes";
import { useTranslation } from "react-i18next";

const FavoritesPage = () => {
  const { t } = useTranslation();

  const FAVORITE_FILTERS = [
    "All",
    "Shifting",
    "Repair",
    "Plumbing",
    "Cleaning",
    "Painting",
    "Electric",
    "Decoration",
  ];

  const filterLabels = {
    All: t("categories.all"),
    Shifting: t("categories.shifting"),
    Repair: t("categories.repair"),
    Plumbing: t("categories.plumbing"),
    Cleaning: t("categories.cleaning"),
    Painting: t("categories.painting"),
    Electric: t("categories.electric"),
    Decoration: t("categories.decoration"),
  };

  const { user } = useContext(UserContext);
  const { email, category } = useParams<{
    email?: string;
    category?: string;
  }>();
  const navigate = useNavigate();

  if (!user?.email) {
    return <p>{t("messages.favoritesLogin")}</p>;
  }

  const userEmail = email ?? user.email;

  useEffect(() => {
    if (category && !FAVORITE_FILTERS.includes(category)) {
      navigate(generatePath(ROUTES.FAVORITES, { email: userEmail }), {
        replace: true,
      });
    }
  }, [category, userEmail, navigate]);

  const {
    data: favoriteServices,
    isLoading,
    error,
  } = useFavoriteServices(userEmail);

  if (isLoading) return <p>{t("messages.favoritesLoading")}</p>;
  if (error) return <p>{t("messages.favoritesError")}</p>;

  const filteredServices =
    !category || category === "All"
      ? favoriteServices || []
      : (favoriteServices || []).filter(
          (service) => service.category === category,
        );

  const handleFilterChange = (newCategory: string) => {
    const newPath =
      newCategory === "All"
        ? generatePath(ROUTES.FAVORITES, { email: userEmail })
        : generatePath(ROUTES.FAVORITES_CATEGORY, {
            email: userEmail,
            category: newCategory,
          });

    navigate(newPath);
  };

  return (
    <FilteredList
      title={t("accountModal.myFavorites")}
      items={filteredServices}
      filters={FAVORITE_FILTERS}
      activeFilter={category || "All"}
      onFilterChange={handleFilterChange}
      renderItem={(service) => (
        <ServiceCard key={service._id} service={service} isFavorite={true} />
      )}
      filterLabels={filterLabels}
      favorite
    />
  );
};

export default FavoritesPage;
