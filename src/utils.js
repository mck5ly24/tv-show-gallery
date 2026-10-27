// Cache successful and in-flight requests for this browser session.
const requests = new Map();

export function getJSON(url) {
  if (!requests.has(url)) {
    const request = fetch(url).then(response => {
      if (response.status === 429) throw new Error('TVmaze is receiving too many requests. Please wait a moment and try again.');
      if (response.status === 404) throw new Error('This show could not be found. Check the URL and try again.');
      if (!response.ok) throw new Error('Unable to load data from TVmaze. Please try again.');
      return response.json();
    }).catch(error => {
      requests.delete(url);
      throw error;
    });
    requests.set(url, request);
  }
  return requests.get(url);
}

export function plainText(html) {
  if (!html) return 'Summary not available.';
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent?.trim() || 'Summary not available.';
}
export function dateOnly(date) {
  if (!date) return 'Not available';
  const parsed = new Date(date + 'T00:00:00');
  return Number.isNaN(parsed.getTime()) ? 'Not available' : parsed.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
}
export function updatedDate(timestamp) {
  if (!timestamp) return 'Not available';
  const parsed = new Date(timestamp * 1000);
  return Number.isNaN(parsed.getTime()) ? 'Not available' : parsed.toLocaleString();
}
export function genres(show) {
  return show.genres?.length ? show.genres.join(', ') : 'Not available';
}
export function rating(show) {
  return show.rating?.average != null ? show.rating.average + ' / 10' : 'Not available';
}
