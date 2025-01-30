import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchFavoriteServices } from "@/components/service/api";
import ServiceCard from "@/components/service/ServiceCard";
import FilteredList from "@/components/common/FilteredList";
import { SERVICE_KEY } from "@/components/service/hooks";

interface FavoritesPageProps {
  email: string;
}

const FavoritesPage = ({ email }: FavoritesPageProps) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const {
    data: favoriteServices = [],
    isPending,
    error,
  } = useQuery({
    queryKey: [SERVICE_KEY, email],
    queryFn: () => fetchFavoriteServices(email),
    enabled: !!email,
  });

  const categories = [
    "All",
    ...new Set(favoriteServices.map((s) => s.category)),
  ];

  const filteredServices =
    activeCategory === "All"
      ? favoriteServices
      : favoriteServices.filter((s) => s.category === activeCategory);

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <FilteredList
      title="My Favorites"
      items={filteredServices}
      filters={categories}
      activeFilter={activeCategory}
      onFilterChange={setActiveCategory}
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
