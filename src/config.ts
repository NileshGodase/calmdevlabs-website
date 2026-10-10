/**
 * Site-wide configuration. Single source of truth for values that appear in
 * markup and scripts (contact email, domain, …).
 */
export const SITE = {
  name: 'CalmDevLabs',
  domain: 'calmdevlabs.com',
  baseUrl: 'https://calmdevlabs.com',
  tagline: 'Software built to solve real business problems.',
  /** Planned company address. Not provisioned yet — see docs/EMAIL_SETUP_ZOHO.md. */
  email: 'contact@calmdevlabs.com',
  /** Flip to true once the Zoho Mail mailbox exists and is tested. */
  emailProvisioned: false,
  location: 'India',
} as const;
