// Centralized YouTube Data API fetch with API key fallback

const envKeys = [
  process.env.REACT_APP_YOUTUBE_API_KEY1,
  process.env.REACT_APP_YOUTUBE_API_KEY2,
  process.env.REACT_APP_YOUTUBE_API_KEY3,
  process.env.REACT_APP_YOUTUBE_API_KEY4,
  process.env.REACT_APP_YOUTUBE_API_KEY5,
].filter(Boolean);

const isQuotaError = (payload, status) => {
  try {
    if (status === 403 && payload?.error?.errors) {
      const reasons = payload.error.errors.map((e) => e.reason);
      return reasons.some((r) =>
        ["quotaExceeded", "dailyLimitExceeded", "rateLimitExceeded"].includes(r)
      );
    }
  } catch (_) {}
  return false;
};

export async function fetchYouTube(endpoint, params = {}) {
  if (!envKeys.length) throw new Error("No YouTube API keys configured");

  // Build base URL
  const base = new URL(`https://www.googleapis.com/youtube/v3/${endpoint}`);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") base.searchParams.set(k, v);
  });

  let lastError;
  for (const key of envKeys) {
    const url = new URL(base.toString());
    url.searchParams.set("key", key);
    const res = await fetch(url.toString());
    const json = await res.json().catch(() => ({}));
    if (res.ok && !json.error) return json;
    if (!isQuotaError(json, res.status)) {
      // Non-quota errors should not rotate keys unnecessarily
      lastError = new Error(json?.error?.message || `HTTP ${res.status}`);
      break;
    }
    lastError = new Error(json?.error?.message || "Quota exceeded");
  }
  throw lastError || new Error("YouTube API request failed");
}

export function firstAvailableApiKey() {
  return envKeys[0] || null;
}
