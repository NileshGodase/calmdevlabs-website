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

/**
 * AI Solutions demo: illustrative sample document Q&A.
 * Answers come from a fixed sample dataset — no AI model is involved.
 * The page labels this clearly; this script must never imply otherwise.
 */
(() => {
  const root = document.querySelector<HTMLElement>('[data-ai-demo]');
  if (!root) return;
  const log = root.querySelector<HTMLElement>('[data-demo-log]');
  const form = root.querySelector<HTMLFormElement>('[data-demo-form]');
  const input = root.querySelector<HTMLInputElement>('[data-demo-input]');
  if (!log || !form || !input) return;

  interface SampleAnswer {
    keywords: string[];
    answer: string;
  }
  const SAMPLE_ANSWERS: SampleAnswer[] = [
    {
      keywords: ['return', 'refund', 'send back', 'exchange'],
      answer:
        'According to the sample policy: returns are accepted within 30 days of purchase with a receipt, and refunds go to the original payment method within 5 business days.',
    },
    {
      keywords: ['damaged', 'broken', 'defective', 'photo'],
      answer:
        'According to the sample policy: damaged items are replaced free of charge — just send a photo of the damage.',
    },
    {
      keywords: ['bulk', 'discount', 'wholesale', '10%'],
      answer:
        'According to the sample policy: bulk orders of 10 or more items get a 10% discount, applied automatically at checkout.',
    },
    {
      keywords: ['hours', 'support', 'contact', 'open', 'phone', 'help'],
      answer:
        'According to the sample policy: support hours are Monday–Friday, 9am–6pm IST.',
    },
    {
      keywords: ['receipt', 'proof of purchase'],
      answer:
        'According to the sample policy: a receipt is required for returns within the 30-day window.',
    },
  ];
  const FALLBACK =
    'That is not covered in the sample document above. In a production version, this is where retrieval would search your full document set — try one of the suggested questions.';

  const addMessage = (text: string, kind: 'q' | 'a'): void => {
    const empty = log.querySelector('.demo-empty');
    if (empty) empty.remove();
    const div = document.createElement('div');
    div.className = `demo-msg demo-msg-${kind}`;
    if (kind === 'a') {
      const label = document.createElement('span');
      label.className = 'demo-a-label';
      label.textContent = 'Sample answer (illustrative)';
      div.appendChild(label);
      div.appendChild(document.createTextNode(text));
    } else {
      div.textContent = text;
    }
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
  };

  const findAnswer = (question: string): string => {
    const q = question.toLowerCase();
    for (const entry of SAMPLE_ANSWERS) {
      if (entry.keywords.some((k) => q.includes(k))) return entry.answer;
    }
    return FALLBACK;
  };

  const ask = (question: string): void => {
    const trimmed = question.trim();
    if (!trimmed) return;
    addMessage(trimmed, 'q');
    addMessage(findAnswer(trimmed), 'a');
  };

  const empty = document.createElement('p');
  empty.className = 'demo-empty';
  empty.textContent = 'Ask a question about the sample document — or tap a suggestion below.';
  log.appendChild(empty);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    ask(input.value);
    input.value = '';
    input.focus();
  });

  root.querySelectorAll<HTMLButtonElement>('[data-demo-q]').forEach((chip) => {
    chip.addEventListener('click', () => {
      const q = chip.getAttribute('data-demo-q');
      if (q) ask(q);
    });
  });
})();
