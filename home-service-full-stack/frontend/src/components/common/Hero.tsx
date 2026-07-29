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
import ResponsiveImage from "@/components/common/ResponsiveImage";
import Button from "./Button";

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
            <span>{t("hero.trustedBadge")}</span>
          </div>
          <h1 className={styles.title}>
            {t("hero.titleLine1")}
            <br />
            {t("hero.titleLine2Before")}
            <span className={styles.highlight}>
              {t("hero.titleLine2Accent")}
            </span>
            <br />
            <span className={styles.highlight}>
              {t("hero.titleLine3Accent")}
            </span>
            {t("hero.titleLine3After")}
          </h1>

          <p className={styles.description}>{t("hero.description")}</p>

          <div className={styles.searchWrapper}>
            <div className={styles.searchRow}>
              <div className={styles.inputWrapper}>
                <IoSearchOutline className={styles.inputIcon} />

                <input
                  type="text"
                  value={service}
                  onChange={(event) => setService(event.target.value)}
                  placeholder={t("hero.searchPlaceholder")}
                  aria-label={t("hero.searchPlaceholder")}
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
                placeholder={t("hero.locationPlaceholder")}
                aria-label={t("hero.locationPlaceholder")}
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
                <strong>{t("hero.verifiedProfessionals")}</strong>

                <span>{t("hero.backgroundChecked")}</span>
              </div>
            </div>

            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>
                <IoCalendarOutline />
              </div>

              <div className={styles.benefitText}>
                <strong>{t("hero.instantBooking")}</strong>

                <span>{t("hero.bookInMinutes")}</span>
              </div>
            </div>

            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>
                <IoLockClosedOutline />
              </div>

              <div className={styles.benefitText}>
                <strong>{t("hero.securePayments")}</strong>

                <span>{t("hero.protected")}</span>
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
              {t("hero.reviewCount", { count: 580 })}
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
