// Writes the Firebase web config the page loads (firebase-config.js) from the FIREBASE_*
// environment variables, which the deploy workflow fills from repository secrets.
// Usage: node .github/scripts/write-firebase-config.mjs <output file>
import { writeFileSync } from "node:fs";

// Firebase config field -> environment variable (repository secret) it comes from.
const FIELDS = {
  apiKey: "FIREBASE_API_KEY",
  authDomain: "FIREBASE_AUTH_DOMAIN",
  databaseURL: "FIREBASE_DATABASE_URL",
  projectId: "FIREBASE_PROJECT_ID",
  storageBucket: "FIREBASE_STORAGE_BUCKET",
  messagingSenderId: "FIREBASE_MESSAGING_SENDER_ID",
  appId: "FIREBASE_APP_ID",
};
// Firestore needs at least these; the others are written when set.
const REQUIRED = ["FIREBASE_API_KEY", "FIREBASE_PROJECT_ID", "FIREBASE_APP_ID"];

const output = process.argv[2];
if (!output) {
  console.log("Usage: node write-firebase-config.mjs <output file>");
  process.exit(2);
}

const env = (name) => (process.env[name] ?? "").trim();

const missing = REQUIRED.filter((name) => !env(name));
if (missing.length > 0) {
  // "::error::" shows the message on the workflow run's summary page.
  console.log(
    `::error::Missing repository secrets: ${missing.join(", ")}. ` +
      "Add them under Settings > Secrets and variables > Actions (see README.md).",
  );
  process.exit(1);
}

const config = {};
for (const [field, name] of Object.entries(FIELDS)) {
  if (env(name)) config[field] = env(name);
}

writeFileSync(output, `export const firebaseConfig = ${JSON.stringify(config, null, 2)};\n`);
console.log(`Wrote ${output} (${Object.keys(config).join(", ")}).`);
