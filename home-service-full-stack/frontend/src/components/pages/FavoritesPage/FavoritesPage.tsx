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
  const { lang = "en" } = useParams<{ lang: "en" | "lt" }>();

  const CATEGORY_TRANSLATIONS: Record<"en" | "lt", Record<string, string>> = {
    en: {
      All: "All",
      Shifting: "Shifting",
      Repair: "Repair",
      Plumbing: "Plumbing",
      Cleaning: "Cleaning",
      Painting: "Painting",
      Electric: "Electric",
      Decoration: "Decoration",
    },
    lt: {
      All: "Visos",
      Shifting: "Perkraustymas",
      Repair: "Remontas",
      Plumbing: "Santechnika",
      Cleaning: "Valymas",
      Painting: "Dažymas",
      Electric: "Elektra",
      Decoration: "Dekoravimas",
    },
  };

  const FAVORITE_FILTERS = Object.keys(CATEGORY_TRANSLATIONS.en);
  const filterLabels = CATEGORY_TRANSLATIONS[lang];

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
    if (
      category &&
      !Object.values(CATEGORY_TRANSLATIONS[lang]).includes(category)
    ) {
      navigate(generatePath(ROUTES.FAVORITES, { lang, email: userEmail }), {
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

  const categoryInEnglish =
    Object.entries(CATEGORY_TRANSLATIONS[lang]).find(
      ([, value]) => value === category,
    )?.[0] || category;

  const filteredServices =
    !categoryInEnglish || categoryInEnglish === "All"
      ? favoriteServices || []
      : (favoriteServices || []).filter((service) => {
          const serviceCategoryEn =
            service.translations?.category?.["en"] || service.category;
          return serviceCategoryEn === categoryInEnglish;
        });

  const handleFilterChange = (newCategory: string) => {
    const translatedCategory = CATEGORY_TRANSLATIONS[lang][newCategory];

    const newPath =
      newCategory === "All"
        ? generatePath(ROUTES.FAVORITES, { lang, email: userEmail })
        : generatePath(ROUTES.FAVORITES_CATEGORY, {
            lang,
            email: userEmail,
            category: translatedCategory,
          });

    navigate(newPath);
  };

  return (
    <FilteredList
      title={t("accountModal.myFavorites")}
      items={filteredServices}
      filters={FAVORITE_FILTERS}
      activeFilter={categoryInEnglish || "All"}
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
