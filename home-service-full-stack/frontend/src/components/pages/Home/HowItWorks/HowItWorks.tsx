import styles from "./HowItWorks.module.scss";
import { useTranslation } from "react-i18next";
import {
  IoSearchOutline,
  IoPeopleOutline,
  IoCalendarOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";

const HowItWorks = () => {
  const { t } = useTranslation();

  const STEPS = [
    {
      icon: <IoSearchOutline />,
      title: t("homePage.howItWorks.step1Title"),
      description: t("homePage.howItWorks.step1Description"),
    },
    {
      icon: <IoPeopleOutline />,
      title: t("homePage.howItWorks.step2Title"),
      description: t("homePage.howItWorks.step2Description"),
    },
    {
      icon: <IoCalendarOutline />,
      title: t("homePage.howItWorks.step3Title"),
      description: t("homePage.howItWorks.step3Description"),
    },
    {
      icon: <IoCheckmarkCircleOutline />,
      title: t("homePage.howItWorks.step4Title"),
      description: t("homePage.howItWorks.step4Description"),
    },
  ];

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{t("homePage.howItWorks.title")}</h2>
      <div className={styles.container}>
        <div className={styles.steps}>
          {STEPS.map((step) => (
            <div key={step.title} className={styles.step}>
              <div className={styles.iconWrapper}>{step.icon}</div>

              <div className={styles.stepText}>
                <strong className={styles.stepTitle}>{step.title}</strong>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
