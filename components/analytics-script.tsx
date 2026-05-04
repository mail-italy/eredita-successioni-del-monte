import Script from "next/script";

const GTM_ID = "GTM-P2M4SXP4";

export function AnalyticsScript() {
  const trackingBootstrap = `
    window.dataLayer = window.dataLayer || [];

    window.addEventListener(
      'click',
      function(event) {
        var target = event.target instanceof Element
          ? event.target.closest('[data-track-event]')
          : null;

        if (!target) {
          return;
        }

        var trackEvent = target.getAttribute('data-track-event');

        if (!trackEvent) {
          return;
        }

        window.dataLayer.push({
          event: trackEvent,
          event_category: 'engagement',
          event_label: target.getAttribute('data-track-label') || undefined
        });
      },
      { passive: true }
    );
  `;

  const gtmBootstrap = `
    (function() {
      var loadGtm = function() {
        if (window.__gtmLoaded) {
          return;
        }

        window.__gtmLoaded = true;
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });

        var script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtm.js?id=${GTM_ID}';
        document.head.appendChild(script);
      };

      if ('requestIdleCallback' in window) {
        requestIdleCallback(loadGtm, { timeout: 3500 });
        return;
      }

      window.setTimeout(loadGtm, 2200);
    })();
  `;

  return (
    <>
      <Script
        id="tracking-delegation"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: trackingBootstrap }}
      />

      <Script
        id="google-tag-manager"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: gtmBootstrap }}
      />
    </>
  );
}
