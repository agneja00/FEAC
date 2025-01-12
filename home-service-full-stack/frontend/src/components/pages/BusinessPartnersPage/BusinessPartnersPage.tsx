import { useEffect, useState } from "react";
import styles from "../About/About.module.scss";
import BusinessRegisterForm from "@/components/business/BusinessRegisterForm";
import Button from "@/components/common/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import Modal from "@/components/common/Modal";

const BusinessPartnersPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [formOpen, setFormOpen] = useState(false);

  const handleOpenModal = () => setFormOpen(true);
  const handleCloseModal = () => {
    setFormOpen(false);
    searchParams.delete("openModal");
    navigate({ search: searchParams.toString() });
  };

  useEffect(() => {
    if (searchParams.get("openModal") === "true") {
      setFormOpen(true);
    }
  }, [searchParams]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>For Business Partners</h1>
      <h2 className={styles.subtitle}>
        Join Our Network of Home Service Professionals!
      </h2>
      <p className={styles.paragraph}>
        Welcome to our exclusive network of home service professionals! As a
        trusted provider of quality home maintenance and improvement solutions,
        we invite you to become part of our growing ecosystem of skilled
        tradespeople and service providers.
      </p>
      <section className={styles.section}>
        <h3 className={styles.subheading}>Why Partner with Us?</h3>
        <ul className={styles.list}>
          <li>
            <span className={styles.boldText}>Expand Your Reach:</span> Gain
            access to a large customer base actively seeking home services.
          </li>
          <li>
            <span className={styles.boldText}>Increase Your Revenue:</span>{" "}
            Receive bookings directly through our platform and grow your
            business effortlessly.
          </li>
          <li>
            <span className={styles.boldText}>Flexible Opportunities:</span>{" "}
            Choose the services you want to offer, set your availability, and
            manage your bookings seamlessly.
          </li>
          <li>
            <span className={styles.boldText}>Support and Tools:</span> Benefit
            from marketing, scheduling tools, and customer support to help you
            succeed.
          </li>
        </ul>
      </section>
      <section className={styles.section}>
        <h3 className={styles.subheading}>How It Works</h3>
        <ul className={styles.list}>
          <li>
            <span className={styles.boldText}>Sign Up:</span> Register your
            business by filling out the form below.
          </li>
          <li>
            <span className={styles.boldText}>Get Verified:</span> Our team will
            review your application and verify your credentials.
          </li>
          <li>
            <span className={styles.boldText}>Start Receiving Bookings:</span>{" "}
            Once approved, your business will appear in our directory, and
            customers can book your services.
          </li>
        </ul>
      </section>
      {formOpen ? (
        <Modal onClose={handleCloseModal} isOpen={true}>
          <BusinessRegisterForm onSubmitSuccess={handleCloseModal} />
        </Modal>
      ) : (
        <div className={styles.registerBusinessContainer}>
          <Button onClick={handleOpenModal}>Register Now</Button>
        </div>
      )}
    </div>
  );
};

export default BusinessPartnersPage;
