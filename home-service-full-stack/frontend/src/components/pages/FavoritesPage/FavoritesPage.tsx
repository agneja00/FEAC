import { useContext, useState } from "react";
import { useFavoriteServices } from "../../service/hooks";
import FilteredList from "@/components/common/FilteredList";
import ServiceCard from "@/components/service/ServiceCard";
import { UserContext } from "@/components/context/UserContext";

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
  const email = user?.email;

  if (!email) {
    return <p>Please log in to view your favorites.</p>;
  }

  const {
    data: favoriteServices,
    isLoading,
    error,
  } = useFavoriteServices(email);
  const [activeFilter, setActiveFilter] = useState("All");

  if (isLoading) return <p>Loading favorites...</p>;
  if (error) return <p>Error loading favorites</p>;

  const filteredServices =
    activeFilter === "All"
      ? favoriteServices || []
      : (favoriteServices || []).filter(
          (service: { category: string }) => service.category === activeFilter,
        );

  return (
    <FilteredList
      title="My Favorite Services"
      items={filteredServices}
      filters={FAVORITE_FILTERS}
      activeFilter={activeFilter}
      onFilterChange={setActiveFilter}
      renderItem={(service) => (
        <ServiceCard
          key={service._id}
          service={service}
          email={email}
          isFavorite={true}
        />
      )}
    />
  );
};

export default FavoritesPage;
