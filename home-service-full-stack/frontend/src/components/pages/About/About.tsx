import styles from "./About.module.scss";
import { useState } from "react";
import Button from "@/components/common/Button";

const About = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>About Us</h1>
      <section className={styles.section}>
        <p className={styles.paragraph}>
          Welcome to Home Services! We are your trusted partner in finding
          reliable and skilled professionals for all your household needs.
          Whether you’re looking for help with cleaning, repairs, renovations,
          or any other home-related service, our website is designed to make the
          process seamless and stress-free.
        </p>
        <p className={styles.paragraph}>
          Our platform connects homeowners with experienced service providers
          who are dedicated to delivering top-notch results. From quick fixes to
          major projects, we ensure that you can easily find the right
          professional for any job with just a few clicks.
        </p>
        <p className={styles.paragraph}>
          At Home Services, we aim to simplify your life by providing a one-stop
          solution for all your home maintenance and improvement needs. Our
          intuitive website lets you explore services, compare options, and book
          appointments effortlessly.
        </p>
        <p className={styles.paragraph}>
          Whether it’s a last-minute repair or a long-planned upgrade, we are
          here to support you at every step. Trust Home Services to provide
          reliable and professional solutions, making your home the perfect
          place to live and thrive.
        </p>
      </section>

      <section
        className={`${styles.section} ${isExpanded ? styles.expanded : ""}`}
      >
        {!isExpanded && <h2 className={styles.subtitle}>Our Mission...</h2>}
        {isExpanded && (
          <>
            <h2 className={styles.subtitle}>Our Mission</h2>
            <div className={styles.mission}>
              <div className={styles.missionForUsers}>
                <h3 className={styles.subheading}>For Users:</h3>
                <p className={styles.paragraph}>
                  Empowering You to Simplify Your Home Life. Our mission is to
                  make home maintenance and improvement effortless for you. We
                  aim to connect you with trusted professionals who deliver
                  exceptional quality and reliability. Whether you need urgent
                  repairs or are planning a renovation, our platform is built to
                  save your time, reduce stress, and ensure your peace of mind.
                  We strive to be your go-to solution for creating a better home
                  environment.
                </p>
              </div>
              <div className={styles.missionForPartners}>
                <h3 className={styles.subheading}>For Business Partners:</h3>
                <p className={styles.paragraph}>
                  Helping You Grow Your Business. We are committed to empowering
                  our business partners by providing a platform to showcase
                  their skills and connect with a broader audience. Our mission
                  is to help service providers build their reputation, gain more
                  clients, and streamline their operations through our
                  user-friendly tools. By working with us, you’ll benefit from
                  increased visibility, customer trust, and a dedicated support
                  system designed to help your business thrive in a competitive
                  market.
                </p>
                <p className={styles.paragraph}>
                  Interested in partnering with us? Fill out the form to join
                  our network of trusted professionals and bring your services
                  to a wider audience. Let’s grow together!
                </p>
              </div>
            </div>
            <h2 className={styles.subtitle}>Our Requisites:</h2>
            <ul>
              <li className={styles.requisite}>
                Phone:{" "}
                <a href="tel:+37062917326" className={styles.link}>
                  +37062917326
                </a>
              </li>
              <li className={styles.requisite}>
                Email:{" "}
                <a href="mailto:homeservices@gmail.com" className={styles.link}>
                  homeservices@gmail.com
                </a>
              </li>
              <li className={styles.requisite}>
                Address:
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
          {isExpanded ? "Show Less" : "Read More"}
        </Button>
      </div>
    </div>
  );
};

export default About;
