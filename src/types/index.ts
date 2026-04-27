export interface HeroSlide {
  id: number;
  videoSrc: string;
  subtitle: string;
  title: string;
  btnText: string;
  btnHref: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface MediaItem {
  id: number;
  videoSrc?: string;
  thumbnailSrc?: string;
  channelName: string;
  channelLogo?: string;
  date: string;
  title: string;
  href?: string;
}

export interface InstagramPost {
  id: number;
  imageSrc: string;
  alt: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  content: React.ReactNode;
}
