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
            <span>
              {t("hero.trustedBadge", "Trusted by 1,000+ homeowners")}
            </span>
          </div>

          <h1 className={styles.title}>
            {t("hero.titleStart", "Find Trusted")}
            <br />
            Home{" "}
            <span className={styles.highlight}>
              {t("hero.titleService", "Service")}
            </span>
            <br />
            <span className={styles.highlight}>
              {t("hero.titleExperts", "Experts")}
            </span>{" "}
            {t("hero.titleEnd", "Near You")}
          </h1>

          <p className={styles.description}>
            {t(
              "hero.description",
              "Connect with verified professionals for all your home needs. Book with confidence, every time.",
            )}
          </p>

          <div className={styles.searchWrapper}>
            <div className={styles.searchRow}>
              <div className={styles.inputWrapper}>
                <IoSearchOutline className={styles.inputIcon} />

                <input
                  type="text"
                  value={service}
                  onChange={(event) => setService(event.target.value)}
                  placeholder={t(
                    "hero.searchPlaceholder",
                    "What service do you need?",
                  )}
                  aria-label={t(
                    "hero.searchPlaceholder",
                    "What service do you need?",
                  )}
                />
              </div>

              <button type="button" className={styles.searchButton}>
                {t("buttons.search", "Search")}
              </button>
            </div>

            <div className={styles.mobileLocation}>
              <IoLocationOutline className={styles.inputIcon} />

              <input
                type="text"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder={t(
                  "hero.locationPlaceholder",
                  "Vilnius, Lithuania",
                )}
                aria-label={t("hero.locationPlaceholder", "Vilnius, Lithuania")}
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
                <strong>
                  {t("hero.verifiedProfessionals", "Verified Professionals")}
                </strong>

                <span>{t("hero.backgroundChecked", "Background checked")}</span>
              </div>
            </div>

            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>
                <IoCalendarOutline />
              </div>

              <div className={styles.benefitText}>
                <strong>{t("hero.instantBooking", "Instant Booking")}</strong>

                <span>{t("hero.bookInMinutes", "Book in minutes")}</span>
              </div>
            </div>

            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>
                <IoLockClosedOutline />
              </div>

              <div className={styles.benefitText}>
                <strong>{t("hero.securePayments", "Secure Payments")}</strong>

                <span>{t("hero.protected", "100% protected")}</span>
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

            <span className={styles.reviewCount}>580+ reviews</span>

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
