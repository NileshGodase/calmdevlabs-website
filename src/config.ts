/**
 * Site-wide configuration. Single source of truth for values that appear in
 * markup and scripts (contact email, domain, …).
 */
export const SITE = {
  name: 'CalmDevLabs',
  domain: 'calmdevlabs.com',
  baseUrl: 'https://calmdevlabs.com',
  tagline: 'Software built to solve real business problems.',
  /** Company address — provisioned via Zoho Mail on 2026-10-11. */
  email: 'founders@calmdevlabs.com',
  /** Set false again if the mailbox is ever deprovisioned. */
  emailProvisioned: true,
  location: 'India',
} as const;
