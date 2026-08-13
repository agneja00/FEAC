import { useState } from "react";
import styles from "./FAQ.module.scss";
import { useTranslation } from "react-i18next";
import { IoChevronDown } from "react-icons/io5";
import classNames from "classnames";

const FAQ = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const ITEMS = [
    {
      question: t("homePage.faq.q1Question"),
      answer: t("homePage.faq.q1Answer"),
    },
    {
      question: t("homePage.faq.q2Question"),
      answer: t("homePage.faq.q2Answer"),
    },
    {
      question: t("homePage.faq.q3Question"),
      answer: t("homePage.faq.q3Answer"),
    },
    {
      question: t("homePage.faq.q4Question"),
      answer: t("homePage.faq.q4Answer"),
    },
    {
      question: t("homePage.faq.q5Question"),
      answer: t("homePage.faq.q5Answer"),
    },
  ];

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{t("homePage.faq.title")}</h2>

      <div className={styles.list}>
        {ITEMS.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={item.question}
              className={classNames(styles.item, isOpen && styles.open)}
            >
              <button
                type="button"
                className={styles.question}
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
              >
                <span>{item.question}</span>
                <IoChevronDown className={styles.icon} />
              </button>

              {isOpen && <p className={styles.answer}>{item.answer}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQ;
