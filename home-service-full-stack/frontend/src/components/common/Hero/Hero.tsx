import styles from "./Hero.module.scss";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  IoSearchOutline,
  IoLocationOutline,
  IoChevronDown,
  IoShieldCheckmarkOutline,
  IoCalendarOutline,
  IoLockClosedOutline,
  IoStar,
} from "react-icons/io5";
import ResponsiveImage from "@/components/common/ResponsiveImage/ResponsiveImage";
import Button from "../Button/Button";

const HERO_IMAGE =
  "https://res.cloudinary.com/dzssnmyzv/image/upload/v1786167645/hero_kncdcl.png";

const Hero = () => {
  const { t } = useTranslation();

  const [service, setService] = useState("");
  const [location, setLocation] = useState("");

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.badge}>
            <IoStar className={styles.badgeIcon} />
            <span>{t("homePage.hero.trustedBadge")}</span>
          </div>
          <h1 className={styles.title}>
            {t("homePage.hero.titleLine1")}
            <br />
            {t("homePage.hero.titleLine2Before")}
            <span className={styles.highlight}>
              {t("homePage.hero.titleLine2Accent")}
            </span>
            <br />
            <span className={styles.highlight}>
              {t("homePage.hero.titleLine3Accent")}
            </span>
            {t("homePage.hero.titleLine3After")}
          </h1>

          <p className={styles.description}>{t("homePage.hero.description")}</p>

          <div className={styles.searchWrapper}>
            <div className={styles.searchRow}>
              <div className={styles.inputWrapper}>
                <IoSearchOutline className={styles.inputIcon} />

                <input
                  type="text"
                  value={service}
                  onChange={(event) => setService(event.target.value)}
                  placeholder={t("homePage.hero.searchPlaceholder")}
                  aria-label={t("homePage.hero.searchPlaceholder")}
                />
              </div>

              <Button search>{t("buttons.search")}</Button>
            </div>

            <div className={styles.mobileLocation}>
              <IoLocationOutline className={styles.inputIcon} />

              <input
                type="text"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder={t("homePage.hero.locationPlaceholder")}
                aria-label={t("homePage.hero.locationPlaceholder")}
              />

              <IoChevronDown className={styles.locationChevron} />
            </div>
          </div>

          <div className={styles.benefits}>
            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>
                <IoShieldCheckmarkOutline />
              </div>

              <div className={styles.benefitText}>
                <strong>{t("homePage.hero.verifiedProfessionals")}</strong>

                <span>{t("homePage.hero.backgroundChecked")}</span>
              </div>
            </div>

            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>
                <IoCalendarOutline />
              </div>

              <div className={styles.benefitText}>
                <strong>{t("homePage.hero.instantBooking")}</strong>

                <span>{t("homePage.hero.bookInMinutes")}</span>
              </div>
            </div>

            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>
                <IoLockClosedOutline />
              </div>

              <div className={styles.benefitText}>
                <strong>{t("homePage.hero.securePayments")}</strong>

                <span>{t("homePage.hero.protected")}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.imageWrapper}>
          <ResponsiveImage
            src={HERO_IMAGE}
            alt="Family using HomeServices"
            className={styles.image}
          />

          <div className={styles.ratingCard}>
            <div className={styles.ratingTop}>
              <IoStar className={styles.ratingStar} />

              <span className={styles.ratingValue}>4.9</span>
            </div>

            <span className={styles.reviewCount}>
              {t("homePage.hero.reviewCount", { count: 580 })}
            </span>

            <div className={styles.reviewers}>
              <span>A</span>
              <span>M</span>
              <span>J</span>
              <span>S</span>
              <span>+</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
