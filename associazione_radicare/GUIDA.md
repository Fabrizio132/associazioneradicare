# 🌿 Guida completa — Associazione Radicare su Hugo + GitHub Pages

> Guida per DevOps con WSL + VSCode, senza esperienza web precedente.

---

## INDICE

1. [Installare Hugo su WSL](#1-installare-hugo-su-wsl)
2. [Struttura del progetto](#2-struttura-del-progetto)
3. [Primo avvio in locale](#3-primo-avvio-in-locale)
4. [Personalizzare il sito](#4-personalizzare-il-sito)
5. [Caricare il logo](#5-caricare-il-logo)
6. [Aggiungere contenuti](#6-aggiungere-contenuti)
7. [Deploy su GitHub Pages](#7-deploy-su-github-pages)
8. [Collegare il dominio custom](#8-collegare-il-dominio-custom)
9. [Workflow quotidiano](#9-workflow-quotidiano)
10. [Troubleshooting](#10-troubleshooting)

---

## 1. Installare Hugo su WSL

Apri il terminale WSL (Ubuntu) e digita:

```bash
# Installa Hugo (versione extended)
sudo apt update
sudo apt install -y wget

# Scarica Hugo extended (controlla la versione più recente su github.com/gohugoio/hugo/releases)
wget https://github.com/gohugoio/hugo/releases/download/v0.124.0/hugo_extended_0.124.0_linux-amd64.deb
sudo dpkg -i hugo_extended_0.124.0_linux-amd64.deb

# Verifica installazione
hugo version
# Output atteso: hugo v0.124.0+extended linux/amd64
```

---

## 2. Struttura del progetto

```
radicare/
├── hugo.toml                        ← CONFIGURAZIONE PRINCIPALE (modifica qui)
├── .github/
│   └── workflows/
│       └── deploy.yml               ← Deploy automatico su GitHub Pages
├── content/                         ← I TUOI CONTENUTI (Markdown)
│   ├── _index.md                    ← Homepage
│   ├── chi-siamo/_index.md
│   ├── progetti/
│   │   └── orto-urbano.md           ← Esempio progetto
│   ├── eventi/
│   │   └── festa-primavera-2025.md  ← Esempio evento
│   ├── news/
│   │   └── iscrizioni-2025.md       ← Esempio news
│   └── contatti/_index.md
├── static/
│   └── images/                      ← LE TUE IMMAGINI (logo, hero, foto)
│       └── hero-placeholder.svg
├── data/
│   └── statistiche.yaml             ← Numeri in evidenza in homepage
└── themes/
    └── radicare/                    ← TEMA CUSTOM
        ├── layouts/                 ← Template HTML
        ├── static/
        │   ├── css/main.css         ← Tutti gli stili (variabili colore qui)
        │   └── js/main.js
        └── theme.toml
```

**Regola d'oro:** non toccare mai `themes/` per i contenuti. Metti tutto in `content/` e `static/images/`.

---

## 3. Primo avvio in locale

```bash
# Copia la cartella del progetto nella tua home WSL
# (o clonala dal repo se l'hai già su GitHub)
cd ~
# Se hai scaricato il file ZIP:
unzip radicare.zip
cd radicare

# Avvia il server di sviluppo
hugo server -D

# Apri nel browser:
# http://localhost:1313
```

Il server si aggiorna in **tempo reale** ogni volta che salvi un file.  
Per fermarlo: `Ctrl+C`

**Aprire con VSCode:**
```bash
code .
```

---

## 4. Personalizzare il sito

Tutto il sito è controllato da **`hugo.toml`**. Apri quel file e modifica:

```toml
# Dominio del sito
baseURL = "https://tuodominio.it/"

# Dati dell'associazione
[params]
  nomeAssociazione = "Associazione Radicare"
  slogan           = "Il tuo slogan"
  email            = "info@tuamail.it"
  indirizzo        = "Via Esempio 1, Acri (CS)"
  facebook         = "https://facebook.com/tuapagina"
  instagram        = "https://instagram.com/tuoprofilo"
```

### Cambiare i colori

Apri `themes/radicare/static/css/main.css` e modifica le variabili in cima:

```css
:root {
  --color-giallo:  #F5C842;  /* ← cambia qui */
  --color-verde:   #5A8A4A;  /* ← cambia qui */
  --color-rosso:   #C94040;  /* ← cambia qui */
  --color-marrone: #7A5C3A;  /* ← footer */
}
```

### Aggiornare i numeri in homepage

Apri `data/statistiche.yaml`:

```yaml
items:
  - numero: "10+"
    etichetta: "Anni di attività"
  - numero: "50+"
    etichetta: "Progetti realizzati"
```

---

## 5. Caricare il logo

1. Metti il file del logo in `static/images/logo.png`
2. Verifica che in `hugo.toml` ci sia: `logoPath = "/images/logo.png"`
3. Il logo apparirà automaticamente nella navbar

**Dimensione consigliata:** 200×80 px, PNG con sfondo trasparente.

Per la **favicon** (icona tab del browser):
- Metti il file in `static/images/favicon.ico`
- O usa un generatore online: https://favicon.io

---

## 6. Aggiungere contenuti

### Nuovo progetto

Crea il file `content/progetti/nome-progetto.md`:

```markdown
---
title: "Nome del progetto"
description: "Breve descrizione per SEO"
date: 2025-04-01
categoria: "Territorio"           # oppure: Cultura, Comunità, ecc.
immagine: "/images/progetti/foto.jpg"  # ← opzionale
---

Testo del progetto scritto in **Markdown**.

## Sottotitolo

Contenuto...
```

### Nuovo evento

Crea `content/eventi/nome-evento.md`:

```markdown
---
title: "Nome dell'evento"
data: 2025-05-15           # ← formato YYYY-MM-DD (usato per ordinamento)
luogo: "Piazza Principale, Acri"
immagine: "/images/eventi/foto.jpg"
---

Descrizione dell'evento...
```

### Nuova news

Crea `content/news/titolo-news.md`:

```markdown
---
title: "Titolo della notizia"
date: 2025-04-10
categoria: "Comunicati"
---

Testo della notizia...
```

**Tip:** Hugo ordina automaticamente i contenuti per data (più recente prima).

---

## 7. Deploy su GitHub Pages

### 7a. Crea il repository su GitHub

1. Vai su https://github.com/new
2. Nome repo: `associazioneradicare.github.io` (o il nome che preferisci)
3. Visibilità: **Public** (obbligatorio per GitHub Pages gratuito)
4. **Non** inizializzare con README

### 7b. Collega il tuo progetto al repo

```bash
cd ~/radicare

# Inizializza git
git init
git add .
git commit -m "🌿 Prima versione sito Associazione Radicare"

# Collega al repo GitHub (sostituisci con il tuo URL)
git remote add origin https://github.com/TUO_USERNAME/NOME_REPO.git
git branch -M main
git push -u origin main
```

### 7c. Abilita GitHub Pages

1. Vai su GitHub → tuo repo → **Settings** → **Pages**
2. In "Source" seleziona: **GitHub Actions**
3. Salva

### 7d. Primo deploy

Il deploy avviene **automaticamente** ad ogni push su `main`.  
Il workflow `.github/workflows/deploy.yml` che hai già compila Hugo e pubblica su GitHub Pages.

Per vedere i log del deploy:  
GitHub → repo → **Actions** → clicca sull'ultimo workflow

Il sito sarà online a: `https://TUO_USERNAME.github.io/NOME_REPO/`

---

## 8. Collegare il dominio custom

Se hai già un dominio (es. `associazioneradicare.it`):

### 8a. Crea il file CNAME

```bash
echo "associazioneradicare.it" > static/CNAME
git add static/CNAME
git commit -m "Aggiungi dominio custom"
git push
```

### 8b. Configura i DNS

Nel pannello del tuo provider DNS (es. Aruba, Register, GoDaddy) aggiungi:

```
Tipo    Host    Valore
A       @       185.199.108.153
A       @       185.199.109.153
A       @       185.199.110.153
A       @       185.199.111.153
CNAME   www     TUO_USERNAME.github.io
```

### 8c. Abilita HTTPS su GitHub

GitHub → Settings → Pages → spunta **"Enforce HTTPS"**  
(appare dopo che i DNS si sono propagati, ~24h)

### 8d. Aggiorna hugo.toml

```toml
baseURL = "https://associazioneradicare.it/"
```

---

## 9. Workflow quotidiano

```bash
# 1. Vai nella cartella del progetto
cd ~/radicare

# 2. Avvia il server locale per vedere le modifiche in tempo reale
hugo server -D

# 3. Fai le modifiche con VSCode
code .

# 4. Quando sei soddisfatto, pubblica
git add .
git commit -m "Descrizione delle modifiche"
git push
# → Il sito si aggiorna automaticamente in 1-2 minuti
```

---

## 10. Troubleshooting

### Il sito non si vede in locale

```bash
# Assicurati di essere nella cartella giusta
cd ~/radicare
hugo server -D
# Se dà errori, controlla hugo.toml per typo
```

### I contenuti non appaiono

- Verifica che il file `.md` abbia il **front matter** (la parte tra `---`)
- I file con `draft: true` non vengono pubblicati (usa `-D` in locale per vederli)

### Immagini non si vedono

- Le immagini devono stare in `static/images/`
- Il percorso nel front matter deve iniziare con `/images/` (non `static/images/`)

### Il deploy su GitHub Actions fallisce

- Vai su GitHub → Actions → clicca sul workflow fallito → leggi i log
- Errore comune: `baseURL` sbagliato in `hugo.toml`

### Form contatti non funziona

Il form usa **Formspree** (gratuito fino a 50 messaggi/mese):
1. Vai su https://formspree.io e crea un account
2. Crea un nuovo form
3. Copia l'ID (es. `xpzgkwqr`)
4. In `themes/radicare/layouts/contatti/single.html` sostituisci `YOUR_FORM_ID` con il tuo ID

---

## Risorse utili

- **Documentazione Hugo:** https://gohugo.io/documentation/
- **Markdown cheatsheet:** https://www.markdownguide.org/cheat-sheet/
- **Formspree (form contatti):** https://formspree.io
- **Favicon generator:** https://favicon.io
- **Compressione immagini:** https://squoosh.app

---

*Buona fortuna con il sito! 🌿*
