import styles from "./BusinessInfoHeader.module.scss";
import Button from "../common/Button";
import { CiLocationOn } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { IoShareOutline } from "react-icons/io5";
import { MdOutlinePersonOutline } from "react-icons/md";
import { HiOutlineClock } from "react-icons/hi";
import useCurrentBusiness from "./hooks";

const BusinessInfoHeader: React.FC = () => {
  const { currentBusiness } = useCurrentBusiness();

  return (
    <div className={styles.infoBusinessContainer}>
      <div className={styles.infoBusinessContainerFirst}>
        <img
          className={styles.avatar}
          alt={currentBusiness?.name}
          src={currentBusiness?.imageUrls[0]}
        />

        <section className={styles.detailsContainerFirst}>
          <span className={styles.chip}>{currentBusiness?.category}</span>
          <h1 className={styles.name}>{currentBusiness?.name}</h1>

          <div className={styles.infoContainer}>
            <CiLocationOn />
            <p className={styles.address}>{currentBusiness?.address}</p>
          </div>
          <div className={styles.infoContainer}>
            <CiMail />
            <p className={styles.email}>{currentBusiness?.email}</p>
          </div>
        </section>
      </div>
      <div className={styles.infoBusinessContainerSecond}>
        <div className={styles.detailsContainerSecond}>
          <Button small>
            <IoShareOutline fontSize={20} />
          </Button>
          <div className={styles.infoContainer}>
            <MdOutlinePersonOutline fontSize={20} color="#8056eb" />
            <p className={styles.contactPerson}>
              {currentBusiness?.contactPerson}
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

export default BusinessInfoHeader;
