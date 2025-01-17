import { useLocalStorage } from "usehooks-ts";
import { Business } from "@/components/business/types";
import BusinessCard from "@/components/business/BusinessCard";
import FilteredBusinessList from "@/components/common/FilteredBusinessList";
import { useState } from "react";

const FavoritesPage = () => {
  const [bookmarks] = useLocalStorage<string[]>("bookmarks", []);
  const [activeCategory, setActiveCategory] = useState("All");
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const favoriteBusinesses = businesses.filter((business) =>
    bookmarks.includes(business._id),
  );

  const categories = [
    "All",
    ...new Set(favoriteBusinesses.map((b) => b.category)),
  ];

  const filteredBusinesses =
    activeCategory === "All"
      ? favoriteBusinesses
      : favoriteBusinesses.filter((b) => b.category === activeCategory);

  return (
    <FilteredBusinessList
      title="My Favorites"
      items={filteredBusinesses}
      filters={categories}
      activeFilter={activeCategory}
      onFilterChange={(filter: string) => setActiveCategory(filter)}
      renderItem={(business) => (
        <BusinessCard key={business._id} business={business} />
      )}
    />
  );
};

export default FavoritesPage;
