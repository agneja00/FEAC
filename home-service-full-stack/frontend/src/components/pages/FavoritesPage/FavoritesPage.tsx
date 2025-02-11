import { useContext, useEffect } from "react";
import { useParams, useNavigate, generatePath } from "react-router-dom";
import { useFavoriteServices } from "../../service/hooks";
import FilteredList from "@/components/common/FilteredList";
import ServiceCard from "@/components/service/ServiceCard";
import { UserContext } from "@/components/context/UserContext";
import { ROUTES } from "@/constants/routes";

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

const FavoritesPage = () => {
  const { user } = useContext(UserContext);
  const { email, category } = useParams<{
    email?: string;
    category?: string;
  }>();
  const navigate = useNavigate();

  if (!user?.email) {
    return <p>Please log in to view your favorites.</p>;
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

  if (isLoading) return <p>Loading favorites...</p>;
  if (error) return <p>Error loading favorites</p>;

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
      title="My Favorite Services"
      items={filteredServices}
      filters={FAVORITE_FILTERS}
      activeFilter={category || "All"}
      onFilterChange={handleFilterChange}
      renderItem={(service) => (
        <ServiceCard key={service._id} service={service} isFavorite={true} />
      )}
      favorite
    />
  );
};

export default FavoritesPage;
