# Kerolos & Klara — Wedding Invite

A one-page wedding invite site: names + countdown -> memories -> ceremony ->
reception -> full-day timeline.

## Edit your details

Everything you'll want to change lives at the top of `src/App.jsx`:

- `COUPLE` — names
- `WEDDING_DATE` — used for the countdown
- `CEREMONY` / `RECEPTION` — venue name, time, address, Google Maps link,
  and the calendar event details
- `TIMELINE` — the schedule list
- `MEMORIES` — swap the `src` placeholder URLs for your own photos (drop
  images in `public/images/` and point `src` at `/images/your-file.jpg`)

## Run locally

```bash
npm install
npm run dev
```

## Deploy to Vercel

```bash
npm i -g vercel   # if you don't have it
vercel
```

Or connect the folder as a GitHub repo and import it in the Vercel
dashboard — no extra config needed, it's a standard Vite app.

## Notes

- "Remind Me" buttons generate a real `.ics` file for iPhone/Outlook and a
  Google Calendar link for Android/web — no native app required.
- Map buttons link straight to the Google Maps locations you provided.
- All icons are from `react-icons` (no emoji anywhere).
