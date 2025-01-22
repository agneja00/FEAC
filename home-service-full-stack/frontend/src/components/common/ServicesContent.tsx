import { useParams } from "react-router-dom";
import styles from "./ServicesContent.module.scss";
import ServiceList from "@/components/service/ServiceList";
import VerticalCategoryList from "@/components/category/VerticalCategoryList";
import { useState, useEffect } from "react";
import { useServices } from "@/components/service/hooks";
import { Service } from "../service/types";
import Input from "../common/Input";

type Params = {
  category?: string;
};

const ServicesContent: React.FC = () => {
  const { data: allServices } = useServices();
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
          placeholder="Start typing the name of the service you’re looking for..."
          search
        />
      </div>
      <div className={styles.container}>
        <div className={styles.categories}>
          <VerticalCategoryList />
        </div>
        <div className={styles.categoryContainer}>
          <ServiceList
            categoryName={category}
            className={styles.serviceList}
            services={filteredServices}
          />
        </div>
      </div>
    </>
  );
};

export default ServicesContent;
