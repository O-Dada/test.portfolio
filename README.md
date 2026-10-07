# Olanrewaju Dada — Portfolio Website

A static portfolio site (plain HTML, CSS and a little JavaScript) hosted on GitHub Pages. No build tools needed.

## Files

```
index.html     ← all the page content (edit text here)
styles.css     ← colours, fonts and layout (colours are at the very top)
script.js      ← project filters + footer year
assets/
  favicon.svg               ← browser-tab icon
  img/                      ← portrait, project images, gallery photos
  Olanrewaju-Dada-CV.pdf    ← ADD your CV with exactly this name
```

---

## Updating the live site (replacing the old version)

1. Open your repository on GitHub.
2. Click **Add file → Upload files**.
3. Drag in `index.html`, `styles.css`, `script.js`, `README.md` and the `assets` folder from this download.
   Files with the same name are **replaced** automatically.
4. Click **Commit changes**.
5. Wait 1–2 minutes, then hard-refresh the site (**Ctrl + Shift + R**, or **Cmd + Shift + R** on a Mac).
   The **Actions** tab shows a green tick when it's live.

### Your site address

Your GitHub username is **O-Dada**, so:

- Repository named `olanrewajudada.github.io` → site at **https://o-dada.github.io/olanrewajudada.github.io/**
- Rename the repository to **`O-Dada.github.io`** (Settings → General → Repository name) → site at **https://o-dada.github.io**

---

## Before you share the link — checklist

- [ ] **Search `index.html` for `[`** — every `[LIKE THIS]` placeholder needs real content.
- [ ] **Entrepreneur** line in the blue roles band.
- [ ] **Bio** in the hero — make sure it sounds like you.
- [ ] **CV** saved as `assets/Olanrewaju-Dada-CV.pdf` (both "Download CV" buttons point to it).
- [ ] **Portrait** saved as `assets/img/portrait.jpg` (see the `REPLACE` comment in the hero).
- [ ] **Project images and links** for each card (see the `HOW TO EDIT A PROJECT CARD` comment).
- [ ] **Gallery photos** — only use photos of others with their consent.
- [ ] **Contact links** — search for `href="#"` and `you@example.com`.
- [ ] **Social preview image** (1200×630) at `assets/img/og-image.jpg` for LinkedIn/WhatsApp previews.
- [ ] Check the site on your phone — project cards become a swipeable row there.

## Tailoring for each PhD application

- Change the **Currently exploring** text (search for `EDIT PER APPLICATION`).
- Point supervisors to a filter, e.g. "see the Qualitative projects".

## Common edits

- **Change the blue**: edit `--blue` at the top of `styles.css`.
- **Add a project**: copy one `<article class="card">…</article>` block and set `data-tags` to any of `qual mixed evidence digital services delivery`. The filter count updates automatically.
- **Custom domain (optional, ~£10/year)**: buy a domain, then add it under **Settings → Pages → Custom domain**.
