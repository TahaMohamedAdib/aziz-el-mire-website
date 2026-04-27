import type { IconType } from 'react-icons';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok, FaWhatsapp } from 'react-icons/fa6';
import { FACEBOOK_URL, INSTAGRAM_URL, LINKEDIN_URL, TIKTOK_URL, whatsappUrl } from '@/lib/catalog';

type SocialLink = {
  label: string;
  href: string;
  Icon: IconType;
};

const socialLinks: SocialLink[] = [
  { label: 'Instagram', href: INSTAGRAM_URL, Icon: FaInstagram },
  { label: 'Facebook', href: FACEBOOK_URL, Icon: FaFacebookF },
  { label: 'TikTok', href: TIKTOK_URL, Icon: FaTiktok },
  { label: 'LinkedIn', href: LINKEDIN_URL, Icon: FaLinkedinIn },
  { label: 'WhatsApp', href: whatsappUrl('Bonjour, je souhaite contacter Aziz EL Mire Haute Couture pour une création sur mesure.'), Icon: FaWhatsapp },
];

export function HeaderSocialLinks() {
  return (
    <div className="header-social" aria-label="Reseaux sociaux">
      {socialLinks.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={`${label} Aziz EL Mire Haute Couture`}
          title={label}
          style={{
            alignItems: 'center',
            border: '1px solid rgba(183,154,85,0.28)',
            color: '#b79a55',
            display: 'inline-flex',
            height: '32px',
            justifyContent: 'center',
            width: '32px',
          }}
        >
          <Icon aria-hidden="true" size={15} />
        </a>
      ))}
    </div>
  );
}

export function FooterSocialLinks() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '18px' }}>
      {socialLinks.map(({ label, href, Icon }) => (
        <a key={label} className="social-link social-link-icon" href={href} target="_blank" rel="noreferrer" aria-label={`${label} Aziz EL Mire Haute Couture`}>
          <Icon aria-hidden="true" size={15} />
          <span>{label}</span>
        </a>
      ))}
    </div>
  );
}

export function ContactSocialButtons() {
  return (
    <div className="contact-social-grid" aria-label="Reseaux sociaux">
      {socialLinks.map(({ label, href, Icon }) => (
        <a key={label} className={label === 'WhatsApp' ? 'contact-social-card is-whatsapp' : 'contact-social-card'} href={href} target="_blank" rel="noreferrer">
          <span className="contact-social-icon">
            <Icon aria-hidden="true" size={18} />
          </span>
          <span>{label}</span>
        </a>
      ))}
    </div>
  );
}
