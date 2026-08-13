import { useRef } from "react";
import styles from "./Testimonials.module.scss";
import { useTranslation } from "react-i18next";
import { IoStar, IoChevronBack, IoChevronForward } from "react-icons/io5";
import Avatar from "../../../layout/Topbar/Avatar/Avatar";

const REVIEW_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const Testimonials = () => {
  const { t } = useTranslation();
  const trackRef = useRef<HTMLDivElement>(null);

  const REVIEWS = REVIEW_IDS.map((id) => ({
    id,
    name: t(`homePage.testimonials.review${id}Name`),
    location: t(`homePage.testimonials.review${id}Location`),
    text: t(`homePage.testimonials.review${id}Text`),
  }));

  const scrollByCard = (direction: "left" | "right") => {
    const track = trackRef.current;
    if (!track) return;

    const card = track.querySelector(`.${styles.card}`) as HTMLElement | null;
    const cardWidth = card?.offsetWidth ?? 280;
    const gap = 16;

    track.scrollBy({
      left: direction === "left" ? -(cardWidth + gap) : cardWidth + gap,
      behavior: "smooth",
    });
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{t("homePage.testimonials.title")}</h2>

      <div className={styles.carousel}>
        <button
          type="button"
          className={styles.arrow}
          onClick={() => scrollByCard("left")}
          aria-label={t("homePage.testimonials.prev")}
        >
          <IoChevronBack />
        </button>

        <div className={styles.track} ref={trackRef}>
          {REVIEWS.map((review) => (
            <div key={review.id} className={styles.card}>
              <div className={styles.stars}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <IoStar key={i} className={styles.star} />
                ))}
              </div>

              <p className={styles.text}>“{review.text}”</p>

              <div className={styles.author}>
                <Avatar name={review.name} large className={styles.avatar} />

                <div className={styles.authorInfo}>
                  <strong>{review.name}</strong>
                  <span>{review.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          className={styles.arrow}
          onClick={() => scrollByCard("right")}
          aria-label={t("homePage.testimonials.next")}
        >
          <IoChevronForward />
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
