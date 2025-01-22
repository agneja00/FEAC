import styles from "./ServiceInfoHeader.module.scss";
import Button from "../common/Button";
import { CiLocationOn } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { IoShareOutline } from "react-icons/io5";
import { MdOutlinePersonOutline } from "react-icons/md";
import { HiOutlineClock } from "react-icons/hi";
import useCurrentService from "./hooks";

const ServiceInfoHeader: React.FC = () => {
  const { currentService } = useCurrentService();

  return (
    <div className={styles.infoServiceContainer}>
      <div className={styles.infoServiceContainerFirst}>
        <img
          className={styles.avatar}
          alt={currentService?.name}
          src={currentService?.imageUrls[0]}
        />

        <section className={styles.detailsContainerFirst}>
          <span className={styles.chip}>{currentService?.category}</span>
          <h1 className={styles.name}>{currentService?.name}</h1>

          <div className={styles.infoContainer}>
            <CiLocationOn />
            <p className={styles.address}>{currentService?.address}</p>
          </div>
          <div className={styles.infoContainer}>
            <CiMail />
            <p className={styles.email}>{currentService?.email}</p>
          </div>
        </section>
      </div>
      <div className={styles.infoServiceContainerSecond}>
        <div className={styles.detailsContainerSecond}>
          <Button small>
            <IoShareOutline fontSize={20} />
          </Button>
          <div className={styles.infoContainer}>
            <MdOutlinePersonOutline fontSize={20} color="#8056eb" />
            <p className={styles.contactPerson}>
              {currentService?.contactPerson}
            </p>
          </div>
          <div className={styles.infoContainer}>
            <HiOutlineClock fontSize={20} />
            <p>Available 8:00 AM to 10:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceInfoHeader;
