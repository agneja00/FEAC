import styles from "./About.module.scss";
import { Link, useParams } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { useState } from "react";
import Button from "@/components/common/Button";
import { useTranslation } from "react-i18next";

const About = () => {
  const { lang = "en" } = useParams<{ lang: string }>();
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t("common.aboutUs")}</h1>
      <section className={styles.section}>
        <p className={styles.paragraph}>{t("aboutUs.paragraphFirst")}</p>
        <p className={styles.paragraph}>{t("aboutUs.paragraphSecond")}</p>
        <p className={styles.paragraph}>{t("aboutUs.paragraphThird")}</p>
        <p className={styles.paragraph}>{t("aboutUs.paragraphFourth")}</p>
      </section>

      <section
        className={`${styles.section} ${isExpanded ? styles.expanded : ""}`}
      >
        {!isExpanded && (
          <h2 className={styles.subtitle}>{t("aboutUs.missionTitle")}...</h2>
        )}
        {isExpanded && (
          <>
            <h2 className={styles.subtitle}>{t("aboutUs.missionTitle")}</h2>
            <div className={styles.mission}>
              <div className={styles.missionForUsers}>
                <h3 className={styles.subheading}>{t("aboutUs.forUsers")}</h3>
                <p className={styles.paragraph}>
                  {t("aboutUs.forUsersParagraph")}
                </p>
              </div>
              <div className={styles.missionForPartners}>
                <h3 className={styles.subheading}>
                  {t("aboutUs.forPartners")}
                </h3>
                <p className={styles.paragraph}>
                  {t("aboutUs.forPartnersParagraph")}
                </p>
                <p className={styles.paragraph}>
                  {t("aboutUs.linkFormParagraphFirstPart")}{" "}
                  <Link
                    to={`${ROUTES.FOR_BUSINESS_PARTNERS.replace(":lang", lang)}?openModal=true`}
                    className={styles.formLink}
                  >
                    {t("aboutUs.linkForm")}
                  </Link>{" "}
                  {t("aboutUs.linkFormParagraphSecondPart")}
                </p>
              </div>
            </div>
            <h2 className={styles.subtitle}>{t("aboutUs.requisites")}</h2>
            <ul>
              <li className={styles.requisite}>
                {t("aboutUs.phone")}{" "}
                <a href="tel:+37062917326" className={styles.link}>
                  +37062917326
                </a>
              </li>
              <li className={styles.requisite}>
                {t("common.email")}{" "}
                <a href="mailto:homeservices@gmail.com" className={styles.link}>
                  homeservices@gmail.com
                </a>
              </li>
              <li className={styles.requisite}>
                {t("aboutUs.address")}
                <span className={styles.address}>
                  {" "}
                  Kareivių g. 6, Vilnius, Lithuania.
                </span>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6708.747471712602!2d25.291655275799407!3d54.720582674298925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dd96b5b7fa8fb5%3A0x90ea1c3c8595ef3c!2sKareivi%C5%B3%20g.%206%2C%20Vilnius%2C%2009109%20Vilniaus%20m.%20sav.%2C%20Lithuania!5e0!3m2!1sen!2sau!4v1722357159326!5m2!1sen!2sau"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className={styles.map}
                ></iframe>
              </li>
            </ul>
          </>
        )}
      </section>

      <div className={styles.buttonContainer}>
        <Button onClick={toggleReadMore}>
          {isExpanded ? t("buttons.showLess") : t("buttons.readMore")}
        </Button>
      </div>
    </div>
  );
};

export default About;
