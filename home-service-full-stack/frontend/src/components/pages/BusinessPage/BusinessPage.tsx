import styles from "./BusinessPage.module.scss";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import BusinessesAndBookingsLayout from "@/components/layout/BusinessesAndBookingsLayout";
import Button from "@/components/common/Button";
import { GiNotebook } from "react-icons/gi";
import BusinessInfoHeader from "@/components/business/BusinessInfoHeader";
import BusinessInfoSection from "@/components/business/BusinessInfoSection";
import SimilarBusiness from "@/components/business/SimilarBusiness";
import BookingModal from "@/components/booking/BookingModal";
import { UserContext } from "@/components/context/UserContext";

const BusinessPage = () => {
  const { id } = useParams<{ id: string }>();
  const [bookOpen, setBookOpen] = useState<boolean>(false);
  const { isLoggedIn } = useContext(UserContext);

  const handleOpenModal = () => setBookOpen(true);
  const handleCloseModal = () => setBookOpen(false);

  if (!id) return null;

  return (
    <>
      {bookOpen && <BookingModal onClose={handleCloseModal} />}
      <BusinessesAndBookingsLayout>
        <BusinessInfoHeader />
        <div className={styles.container}>
          <div className={styles.infoContainer}>
            <BusinessInfoSection />
          </div>
          <div>
            <div className={styles.buttonContainer}>
              {!isLoggedIn ? (
                <Button
                  disabled
                  className={styles.button}
                  onClick={handleOpenModal}
                >
                  <GiNotebook fontSize={20} />
                  <span>Book Appointment</span>
                </Button>
              ) : (
                <Button className={styles.button} onClick={handleOpenModal}>
                  <GiNotebook fontSize={20} />
                  <span>Book Appointment</span>
                </Button>
              )}
            </div>
            <SimilarBusiness />
          </div>
        </div>
      </BusinessesAndBookingsLayout>
    </>
  );
};

export default BusinessPage;
