import { useParams } from "react-router-dom";
import styles from "./ServicesContent.module.scss";
import ServiceList from "@/components/service/ServiceList";
import VerticalCategoryList from "@/components/category/VerticalCategoryList";
import { useState, useEffect } from "react";
import { Service } from "../service/types";
import Input from "../common/Input";
import { useServiceData } from "../service/hooks";
import { useTranslation } from "react-i18next";

type Params = {
  category?: string;
};

const ServicesContent: React.FC = () => {
  const { t } = useTranslation();
  const { allServices, favoriteServices } = useServiceData();
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [searchValue, setSearchValue] = useState("");

  const { category } = useParams<Params>();

  useEffect(() => {
    if (allServices) {
      const filtered = allServices.filter(
        (ser) =>
          (!category || ser.category === category) &&
          ser.name.toLowerCase().includes(searchValue.toLowerCase()),
      );
      setFilteredServices(filtered);
    }
  }, [allServices, category, searchValue]);

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <>
      <div className={styles.searchContainer}>
        <Input
          value={searchValue}
          onChange={handleChangeValue}
          placeholder={t("inputPlaceholder.search")}
          search
        />
      </div>
      <div className={styles.container}>
        <div className={styles.categories}>
          <VerticalCategoryList />
        </div>
        <div className={styles.categoryContainer}>
          <ServiceList
            className={styles.serviceList}
            services={filteredServices}
            favoriteServices={favoriteServices}
          />
        </div>
      </div>
    </>
  );
};

export default ServicesContent;
