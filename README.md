# olanrewajudada.com

This is the code behind my portfolio website, [olanrewajudada.com](https://olanrewajudada.com).

I built it to sit alongside my CV when I apply for PhD positions and speak with potential supervisors. My CV lists what I've done. This site shows it: the projects, the people and organisations I've worked with, and the research that came out of it.

I'm a health researcher working mainly with qualitative and mixed methods, with a background in digital health, software engineering and project management. I wanted one place that brings all of that together.

## How it's built

It's a plain static site: HTML, CSS and a little JavaScript. No framework and no build step, so what's in this repository is exactly what goes live.

GitHub Pages hosts it from the `main` branch, and the domain is managed in Cloudflare.

The Writing section pulls in my latest Medium posts. A small GitHub Action checks my Medium feed every morning and saves the newest posts to `assets/data/medium.json`, so when I publish on Medium the site catches up on its own within a day. If I want it to update straight away, I go to **Actions → Update Medium posts → Run workflow**.

## What's in here

| File | What it does |
|---|---|
| `index.html` | All the content on the page. Most of my edits happen here. |
| `styles.css` | Colours, fonts and layout. The colours are at the very top. |
| `script.js` | The project filters, the "Show all projects" button, the scrolling logo strip and the Writing section. |
| `CNAME` | Connects the site to olanrewajudada.com. Don't delete it. |
| `assets/Olanrewaju-Dada-CV.pdf` | My CV. Both "Download CV" buttons point to this file. |
| `assets/img/` | My portrait, project covers, gallery photos and organisation logos. |
| `assets/data/medium.json` | My latest Medium posts, used by the Writing section. Updated automatically. |
| `.github/workflows/medium-posts.yml` | The daily job that refreshes `medium.json` from my Medium feed. |

## How I update the site

1. Make the change in `index.html` (text) or `styles.css` (look).
2. On GitHub, go to **Add file → Upload files**, drag the file in and click **Commit changes**.
3. Wait for the green tick in the **Actions** tab, then refresh the site with **Ctrl + Shift + R**.

### Things I learnt the hard way

- **Start from the version on GitHub, not an old copy on my laptop.** Otherwise I undo changes I made directly on GitHub.
- **Clear out my Downloads folder first.** If an old `index.html` is already there, the browser saves the new one as `index (1).html`, and it's easy to upload the wrong one.
- **Never upload a file with "(1)" in the name.** GitHub adds it as a new file instead of replacing the old one, so the site doesn't change.
- **Keep the repository public.** On a free account, making it private takes the site offline.

## Quick edits

**Adding a project.** Copy one `<article class="card">…</article>` block in `index.html` and change the text, link and image. Projects run newest first. The `data-tags` decide which filter a project shows under: `qual`, `mixed`, `digital`, `services`, `global` or `delivery`. The count updates by itself.

**Adding a publication.** Copy one `<li class="pub">…</li>` block. To link the title, wrap it in `<a href="...">Title</a>`.

**Adding an organisation logo.** Save it in `assets/img/` as `logo-` plus the name in that organisation's `data-logo`, e.g. `logo-wihea.png`. Until the file is there, the strip just shows the name.

**Updating my CV.** Upload the new PDF to `assets/` with exactly the same name, `Olanrewaju-Dada-CV.pdf`.

**Changing the blue.** Edit `--blue` at the top of `styles.css`.

## Still to do

- [ ] Add my Google Scholar link in the Publications section and the footer (search for `GS-LINK`)
- [ ] Add logos for WIHEA and Akesis Health

## Get in touch

If you've found this through GitHub and want to talk about research, a project or a PhD opportunity, you can email me at [hello@olanrewajudada.com](mailto:hello@olanrewajudada.com) or find me on [LinkedIn](https://www.linkedin.com/in/lanredada).
