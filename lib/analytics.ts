type AnalyticsEvent =
  | "call_click"
  | "form_submit"
  | "form_success"
  | "form_error"
  | "quote_click"
  | "state_page_view"
  | "guide_view";

interface EventData {
  [key: string]: string | number | boolean | undefined;
}

export function trackEvent(event: AnalyticsEvent, data?: EventData): void {
  // TODO: Replace with actual analytics implementation (GA4, Segment, Mixpanel, etc.)
  console.log("[Analytics Event]", {
    event,
    data,
    timestamp: new Date().toISOString(),
    url: typeof window !== "undefined" ? window.location.href : "",
  });
}

export function trackPageView(page: string): void {
  console.log("[Analytics PageView]", { page, timestamp: new Date().toISOString() });
}
