# DUT Remote Control

Web page for controlling a DUT remotely, published with GitHub Pages at
<https://www.emcwebcontroller.com>.

## Firebase config

The Firebase web config (API key, project ID, app ID and so on) is not stored in this
repository. The page loads it from `firebase-config.js`, which git ignores:

- **On GitHub Pages**, the [deploy workflow](.github/workflows/deploy-pages.yml) writes
  `firebase-config.js` from repository secrets.
- **Locally**, copy `firebase-config.example.js` to `firebase-config.js` and fill in the values
  from the Firebase console (Project settings → General → Your apps → SDK setup and configuration).

A Firebase web config can't be hidden from the people who use the page: the browser needs it,
so anyone who opens the published site can read it. Keeping it out of the repository stops it
from leaking through the code. What protects the data is Firestore security rules, together
with an HTTP-referrer restriction on the API key (Google Cloud console → APIs & Services →
Credentials) and, optionally, Firebase App Check.

## Publish to GitHub Pages

One-time setup in the repository's **Settings**:

1. **Secrets and variables → Actions → New repository secret**: add each value from the
   Firebase config.

   | Secret | Config field |
   | --- | --- |
   | `FIREBASE_API_KEY` | `apiKey` (required) |
   | `FIREBASE_PROJECT_ID` | `projectId` (required) |
   | `FIREBASE_APP_ID` | `appId` (required) |
   | `FIREBASE_AUTH_DOMAIN` | `authDomain` |
   | `FIREBASE_DATABASE_URL` | `databaseURL` |
   | `FIREBASE_STORAGE_BUCKET` | `storageBucket` |
   | `FIREBASE_MESSAGING_SENDER_ID` | `messagingSenderId` |

2. **Pages → Build and deployment → Source**: choose **GitHub Actions**.
3. **Pages → Custom domain**: enter `www.emcwebcontroller.com` and save. When a workflow
   publishes the site, GitHub ignores the `CNAME` file, so the domain has to be set here.

GitHub Pages needs a public repository on GitHub Free; a private repository needs GitHub Pro,
Team or Enterprise.

After the setup, every push to `main` publishes the page. To publish without pushing, run
**Deploy to GitHub Pages** from the **Actions** tab.

The workflow publishes only `index.html`, `style.css`, the `.js` files at the top level and
`Media/`. When the page gets a new file or folder, add it to the workflow's
"Collect the site files" step.

## Run locally

The page uses JavaScript modules, so it has to be served over HTTP, not opened as a file:

```bash
python3 -m http.server 5555
```

Then open <http://localhost:5555>. Without `firebase-config.js` the page still works, but
**Listen** fails with an error in the browser console.
