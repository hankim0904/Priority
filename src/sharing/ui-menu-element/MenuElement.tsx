import Image from 'next/image';

interface MenuElementProps {
  src: string;
  alt: string;
}

export const MenuElement = ({ src, alt }: MenuElementProps) => {
  return <Image fill src={src} alt={alt} />;
};
