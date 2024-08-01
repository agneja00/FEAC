import styles from "./About.module.scss";
import { useState } from "react";
import Button from "@/components/common/Button";

const About = () => {
  const [hasBeenClicked, setHasBeenClicked] = useState<boolean>(false);

  const handleClickReadMore = () => {
    setHasBeenClicked(true);
  };

  const handleClickLessMore = () => {
    setHasBeenClicked(false);
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>About Us</h1>
      <p className={styles.paragraph}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem eligendi
        reprehenderit iusto enim sapiente, assumenda dolor temporibus quasi
        placeat dolore vitae mollitia quis consequatur error ipsa iste eos
        praesentium ab. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Amet delectus quidem vel, eaque suscipit nisi iste laboriosam obcaecati
        expedita eligendi cupiditate iusto adipisci voluptatem odio aliquam sint
        dolore quisquam? Rem? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Quas omnis ea culpa voluptatum consectetur consequatur iure
        voluptates optio, odit ut perspiciatis assumenda voluptatem impedit quos
        sit laborum eius error tempora. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Porro, repellat! Voluptate rerum fugit, nam dolore quo
        corporis, repellat blanditiis reiciendis sit maiores quibusdam ad
        doloremque provident quis totam ex reprehenderit!
      </p>
      {!hasBeenClicked && (
        <Button className={styles.button} onClick={handleClickReadMore}>
          Read More
        </Button>
      )}
      {hasBeenClicked && (
        <>
          <Button className={styles.button} onClick={handleClickLessMore}>
            Less more
          </Button>
          <h2 className={styles.subtitle}>Our requisites:</h2>
          <ul className={styles.requisites}>
            <li>
              Phone number:{" "}
              <a href="tel:+37062917326" className={styles.phoneAndEmail}>
                +37062917326
              </a>
            </li>
            <li>
              Email:
              <a
                href="mailto:homeservices@gmail.com"
                className={styles.phoneAndEmail}
              >
                homeservices@gmail.com
              </a>
            </li>
            <li className={styles.address}>
              Address:
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6708.747471712602!2d25.291655275799407!3d54.720582674298925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dd96b5b7fa8fb5%3A0x90ea1c3c8595ef3c!2sKareivi%C5%B3%20g.%206%2C%20Vilnius%2C%2009109%20Vilniaus%20m.%20sav.%2C%20Lithuania!5e0!3m2!1sen!2sau!4v1722357159326!5m2!1sen!2sau"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default About;
