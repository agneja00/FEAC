import { useEffect, useState } from "react";
import styles from "../About/About.module.scss";
import ServiceRegisterForm from "@/components/service/ServiceRegisterForm";
import Button from "@/components/common/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import Modal from "@/components/common/Modal";
import { useTranslation } from "react-i18next";

const BusinessPartnersPage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [formOpen, setFormOpen] = useState(false);

  const handleOpenModal = () => setFormOpen(true);
  const handleCloseModal = () => {
    setFormOpen(false);
    searchParams.delete("openModal");
    navigate({ search: searchParams.toString() });
  };

  useEffect(() => {
    if (searchParams.get("openModal") === "true") {
      setFormOpen(true);
    }
  }, [searchParams]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t("common.forBusinessPartners")}</h1>
      <h2 className={styles.subtitle}>{t("forBusinessPartners.join")}</h2>
      <p className={styles.paragraph}>{t("forBusinessPartners.paragraph")}</p>
      <section className={styles.section}>
        <h3 className={styles.subheading}>
          {t("forBusinessPartners.partner")}
        </h3>
        <ul className={styles.list}>
          <li>
            <span className={styles.boldText}>
              {t("forBusinessPartners.expandBold")}
            </span>{" "}
            Gain
            {t("forBusinessPartners.expand")}
          </li>
          <li>
            <span className={styles.boldText}>
              {t("forBusinessPartners.revenueBold")}
            </span>{" "}
            {t("forBusinessPartners.revenue")}
          </li>
          <li>
            <span className={styles.boldText}>
              {t("forBusinessPartners.flexibleBold")}
            </span>{" "}
            {t("forBusinessPartners.flexible")}
          </li>
          <li>
            <span className={styles.boldText}>
              {t("forBusinessPartners.toolsBold")}
            </span>{" "}
            {t("forBusinessPartners.tools")}
          </li>
        </ul>
      </section>
      <section className={styles.section}>
        <h3 className={styles.subheading}>
          {t("forBusinessPartners.howItWorks")}
        </h3>
        <ul className={styles.list}>
          <li>
            <span className={styles.boldText}>
              {t("forBusinessPartners.signBold")}
            </span>{" "}
            {t("forBusinessPartners.sign")}
          </li>
          <li>
            <span className={styles.boldText}>
              {t("forBusinessPartners.verifiedBold")}
            </span>{" "}
            {t("forBusinessPartners.verified")}
          </li>
          <li>
            <span className={styles.boldText}>
              {t("forBusinessPartners.startBold")}
            </span>{" "}
            {t("forBusinessPartners.start")}
          </li>
        </ul>
      </section>
      {formOpen ? (
        <Modal onClose={handleCloseModal} isOpen={true}>
          <ServiceRegisterForm onSubmitSuccess={handleCloseModal} />
        </Modal>
      ) : (
        <div className={styles.registerBusinessContainer}>
          <Button onClick={handleOpenModal}>{t("buttons.registerNow")}</Button>
        </div>
      )}
    </div>
  );
};

export default BusinessPartnersPage;
