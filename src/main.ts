import { SITE } from './config';

/** Footer year */
document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = String(new Date().getFullYear());
});

/** Mobile navigation toggle */
const toggle = document.querySelector<HTMLButtonElement>('.nav-toggle');
const nav = document.getElementById('site-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  // Close the menu when a link is activated (mobile)
  nav.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a')) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
    }
  });
}

/** Highlight the current page in the nav */
(() => {
  const path = window.location.pathname;
  document.querySelectorAll<HTMLElement>('[data-nav]').forEach((el) => {
    const key = el.dataset['nav'];
    if (!key) return;
    const match =
      (key === 'home' && (path === '/' || path.endsWith('/index.html'))) ||
      (key !== 'home' && path.includes(`/${key}`));
    if (match) el.setAttribute('aria-current', 'page');
  });
})();

/** Contact page: show the "email being set up" notice until provisioned. */
document.querySelectorAll<HTMLElement>('[data-email-notice]').forEach((el) => {
  if (!SITE.emailProvisioned) {
    el.hidden = false;
    el.querySelectorAll('[data-email-address]').forEach((a) => {
      a.textContent = SITE.email;
    });
  }
});

/** Fill all [data-email-link] anchors with the configured address. */
document.querySelectorAll<HTMLAnchorElement>('[data-email-link]').forEach((a) => {
  a.href = `mailto:${SITE.email}`;
  if (!a.textContent?.trim()) a.textContent = SITE.email;
  else {
    // Keep custom label text, but ensure the visible address matches config.
    const addr = a.querySelector('[data-email-address]');
    if (addr) addr.textContent = SITE.email;
  }
});

/** Contact form: validate, then compose a mailto: (static hosting has no backend). */
const form = document.querySelector<HTMLFormElement>('[data-contact-form]');
if (form) {
  const success = document.querySelector<HTMLElement>('[data-form-success]');

  const setError = (name: string, message: string | null): void => {
    const field = form.querySelector(`[name="${name}"]`) as
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement
      | null;
    const errorEl = form.querySelector<HTMLElement>(`[data-error-for="${name}"]`);
    if (!field || !errorEl) return;
    if (message) {
      field.setAttribute('aria-invalid', 'true');
      errorEl.textContent = message;
      errorEl.classList.add('visible');
    } else {
      field.removeAttribute('aria-invalid');
      errorEl.textContent = '';
      errorEl.classList.remove('visible');
    }
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);

    // Honeypot: silently "succeed" for bots.
    if ((data.get('company_website') as string | null)?.trim()) {
      form.hidden = true;
      if (success) success.classList.add('visible');
      return;
    }

    const name = (data.get('name') as string | null)?.trim() ?? '';
    const email = (data.get('email') as string | null)?.trim() ?? '';
    const category = (data.get('category') as string | null) ?? '';
    const description = (data.get('description') as string | null)?.trim() ?? '';
    const consent = form.querySelector<HTMLInputElement>('[name="consent"]')?.checked ?? false;
    const company = (data.get('company') as string | null)?.trim() ?? '';
    const budget = (data.get('budget') as string | null) ?? '';

    let valid = true;
    const fail = (field: string, msg: string): void => {
      setError(field, msg);
      valid = false;
    };

    if (name.length < 2) fail('name', 'Please enter your name.');
    else setError('name', null);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fail('email', 'Please enter a valid business email.');
    else setError('email', null);

    if (!category) fail('category', 'Please choose a project category.');
    else setError('category', null);

    if (description.length < 20)
      fail('description', 'Please describe your project in at least 20 characters.');
    else setError('description', null);

    if (!consent) fail('consent', 'Please acknowledge the privacy notice to continue.');
    else setError('consent', null);

    if (!valid) {
      const firstInvalid = form.querySelector<HTMLElement>('[aria-invalid="true"]');
      firstInvalid?.focus();
      return;
    }

    const subject = `Project inquiry from ${name} — ${category}`;
    const bodyLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : null,
      `Project category: ${category}`,
      budget ? `Budget range: ${budget}` : null,
      '',
      'Project description:',
      description,
    ].filter((l): l is string => l !== null);
    const body = bodyLines.join('\n');

    // Open the visitor's email client addressed to us.
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    form.hidden = true;
    if (success) {
      success.classList.add('visible');
      success.querySelectorAll('[data-email-address]').forEach((a) => {
        a.textContent = SITE.email;
      });
      success.focus();
    }
  });
}
