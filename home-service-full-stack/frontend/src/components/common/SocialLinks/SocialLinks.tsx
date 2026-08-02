import styles from "./SocialLinks.module.scss";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

interface SocialLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const SOCIAL_LINKS: SocialLink[] = [
  { href: "https://facebook.com", label: "Facebook", icon: <FaFacebookF /> },
  { href: "https://instagram.com", label: "Instagram", icon: <FaInstagram /> },
  { href: "https://twitter.com", label: "Twitter", icon: <FaTwitter /> },
  { href: "https://linkedin.com", label: "LinkedIn", icon: <FaLinkedinIn /> },
];

const SocialLinks = () => {
  return (
    <div className={styles.socialLinks}>
      {SOCIAL_LINKS.map(({ href, label, icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={styles.socialLink}
        >
          {icon}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
