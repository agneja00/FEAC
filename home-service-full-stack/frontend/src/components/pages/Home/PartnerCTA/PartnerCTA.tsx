import styles from "./PartnerCTA.module.scss";
import { useNavigate, generatePath, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ResponsiveImage from "@/components/common/ResponsiveImage/ResponsiveImage";
import Button from "@/components/common/Button/Button";
import { ROUTES } from "@/constants/routes";

const PARTNER_IMAGE =
  "https://res.cloudinary.com/dzssnmyzv/image/upload/v1787001752/CTA_sdr3jg.png";

const PartnerCTA = () => {
  const { t } = useTranslation();
  const { lang = "en" } = useParams<{ lang?: string }>();
  const navigate = useNavigate();

  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <ResponsiveImage
          src={PARTNER_IMAGE}
          alt={t("alt.partnerImage")}
          className={styles.image}
        />

        <div className={styles.overlay} />

        <div className={styles.content}>
          <span className={styles.eyebrow}>{t("homePage.cta.eyebrow")}</span>
          <h2 className={styles.title}>{t("homePage.cta.title")}</h2>
          <p className={styles.description}>{t("homePage.cta.description")}</p>
          <Button
            large
            className={styles.cta}
            onClick={() =>
              navigate(generatePath(ROUTES.FOR_BUSINESS_PARTNERS, { lang }))
            }
          >
            {t("buttons.becomeAPartner")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PartnerCTA;
