export const GA_TRACKING_ID = "G-NRVFXM8JJ1";

// Track page views
export const pageView = (url) => {
  if (window.gtag) {
    window.gtag("event", "page_view", {
      page_title: document.title,
      page_location: window.location.href,
      page_path: url,
    });
  }
};

// Track events
export const trackEvent = (name, params = {}) => {
  window.gtag("event", name, params);
};