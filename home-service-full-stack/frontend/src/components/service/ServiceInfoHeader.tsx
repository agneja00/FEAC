import styles from "./ServiceInfoHeader.module.scss";
import Button from "../common/Button";
import { CiLocationOn, CiMail } from "react-icons/ci";
import { IoShareOutline } from "react-icons/io5";
import { MdOutlinePersonOutline } from "react-icons/md";
import { HiOutlineClock } from "react-icons/hi";
import { useCurrentService } from "./hooks";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import ResponsiveImage from "../common/ResponsiveImage";

const ServiceInfoHeader: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { currentService } = useCurrentService();
  const { enqueueSnackbar } = useSnackbar();

  const language = i18n.language || "en";

  const name =
    currentService?.translations?.name?.[language] || currentService?.name;
  const category =
    currentService?.translations?.category?.[language] ||
    currentService?.category;

  const handleShare = async () => {
    if (!currentService) return;
    const serviceUrl = `${window.location.origin}/service/${currentService._id}`;
    try {
      await navigator.clipboard.writeText(serviceUrl);
      enqueueSnackbar(t("messages.copyLinkSuccess"), { variant: "success" });
    } catch {
      enqueueSnackbar(t("messages.copyLinkError"), { variant: "error" });
    }
  };

  return (
    <div className={styles.infoServiceContainer}>
      <div className={styles.infoServiceContainerFirst}>
        <ResponsiveImage
          className={styles.avatar}
          alt={t("alt.serviceImage", { serviceName: name })}
          src={currentService?.imageUrls?.[0] || ""}
        />

        <section className={styles.detailsContainerFirst}>
          <span className={styles.chip}>{category}</span>
          <h1 className={styles.name}>{name}</h1>

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
          <Button
            small
            onClick={handleShare}
            aria-label={t("alt.shareService")}
          >
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
            <p>{t("servicePage.available")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceInfoHeader;
