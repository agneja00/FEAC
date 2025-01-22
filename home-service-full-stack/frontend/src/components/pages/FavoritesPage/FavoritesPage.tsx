import { useLocalStorage } from "usehooks-ts";
import { Service } from "@/components/service/types";
import BusinessCard from "@/components/service/ServiceCard";
import FilteredList from "@/components/common/FilteredList";
import { useState } from "react";

const FavoritesPage = () => {
  const [bookmarks] = useLocalStorage<string[]>("bookmarks", []);
  const [activeCategory, setActiveCategory] = useState("All");
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const favoriteServices = services.filter((service) =>
    bookmarks.includes(service._id),
  );

  const categories = [
    "All",
    ...new Set(favoriteServices.map((b) => b.category)),
  ];

  const filteredServices =
    activeCategory === "All"
      ? favoriteServices
      : favoriteServices.filter((b) => b.category === activeCategory);

  return (
    <FilteredList
      title="My Favorites"
      items={filteredServices}
      filters={categories}
      activeFilter={activeCategory}
      onFilterChange={(filter: string) => setActiveCategory(filter)}
      renderItem={(service) => (
        <BusinessCard key={service._id} service={service} />
      )}
    />
  );
};

export default FavoritesPage;
