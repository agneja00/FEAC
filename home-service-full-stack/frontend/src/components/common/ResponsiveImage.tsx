import React from "react";

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  onClick?: (e: React.MouseEvent<HTMLImageElement>) => void;
}

const breakpoints = [300, 600, 900, 1200, 1600];

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  className,
  sizes = "(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 1200px",
  onClick,
}) => {
  if (!src) return null;

  const srcSet = breakpoints
    .map(
      (w) =>
        `${src.replace("/upload/", `/upload/w_${w},q_auto,f_auto/`)} ${w}w`,
    )
    .join(", ");

  const fallbackSrc = src.replace("/upload/", "/upload/w_600,q_auto,f_auto/");

  return (
    <img
      className={className}
      src={fallbackSrc}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      loading="lazy"
      decoding="async"
      onClick={onClick}
      style={{ objectFit: "cover" }}
    />
  );
};

export default ResponsiveImage;
