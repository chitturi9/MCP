# 🚀 Helloemma Telnyx — Railway Deployment

## Deploy in 3 Steps

### Step 1 — Push to GitHub
1. Create a new repo on GitHub (e.g. `helloemma-telnyx`)
2. Upload all these files to it
3. **Do NOT upload your `.env` file** — keep it local

### Step 2 — Deploy on Railway
1. Go to [railway.app](https://railway.app) and sign in
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your `helloemma-telnyx` repo
4. Railway will auto-detect Node.js and deploy ✅

### Step 3 — Add Environment Variables on Railway
In your Railway project → **Variables** tab, add:

| Key | Value |
|-----|-------|
| `TELNYX_API_KEY` | `KEY019CEDBB47CB6B79130DA861820F3E40` |
| `TELNYX_PHONE` | `+19452290064` |
| `TELNYX_CONNECTION_ID` | *(get from Telnyx portal)* |

---

## API Endpoints

Once live, your Railway URL will be something like:
`https://helloemma-telnyx-production.up.railway.app`

### Health Check
```
GET /
```

### Send SMS
```
POST /sms
Content-Type: application/json

{ "to": "+16319032126", "text": "Hello from Helloemma!" }
```

### Make a Voice Call
```
POST /call
Content-Type: application/json

{ "to": "+16319032126" }
```

### Telnyx Webhook
```
POST /webhook
```
Set this URL in your Telnyx portal under **Messaging → Webhooks**

---

## Test It (after deploy)
```bash
curl -X POST https://YOUR-RAILWAY-URL/sms \
  -H "Content-Type: application/json" \
  -d '{"to":"+16319032126","text":"Hello from Helloemma!"}'
```
