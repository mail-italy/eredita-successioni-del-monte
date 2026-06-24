import Script from "next/script";

const GTM_ID = "GTM-P2M4SXP4";
const isDevelopment = process.env.NODE_ENV !== "production";

export function AnalyticsScript() {
  const trackingBootstrap = `
    window.dataLayer = window.dataLayer || [];
    window.__leadTrackingDebug = ${isDevelopment ? "true" : "false"};

    window.__pushTrackingEvent = function(payload) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(payload);

      if (window.__leadTrackingDebug) {
        console.info('[tracking:dataLayer]', payload);
      }
    };

    window.__sendGtagEvent = function(eventName, params) {
      if (typeof window.gtag !== 'function') {
        return;
      }

      window.gtag('event', eventName, params);

      if (window.__leadTrackingDebug) {
        console.info('[tracking:gtag]', eventName, params);
      }
    };

    window.addEventListener(
      'click',
      function(event) {
        if (!(event.target instanceof Element)) {
          return;
        }

        var anchor = event.target.closest('a[href]');

        if (anchor) {
          var rawHref = anchor.getAttribute('href') || '';
          var normalizedHref = rawHref.toLowerCase();
          var resolvedHref = anchor.href || rawHref;
          var pageContext = {
            page_location: window.location.href,
            page_path: window.location.pathname
          };

          if (
            normalizedHref.indexOf('https://wa.me/') === 0 ||
            normalizedHref.indexOf('http://wa.me/') === 0 ||
            normalizedHref.indexOf('https://api.whatsapp.com/') === 0 ||
            normalizedHref.indexOf('http://api.whatsapp.com/') === 0 ||
            normalizedHref.indexOf('whatsapp://') === 0
          ) {
            window.__pushTrackingEvent({
              event: 'click_whatsapp',
              lead_type: 'whatsapp',
              link_url: resolvedHref,
              page_location: pageContext.page_location,
              page_path: pageContext.page_path
            });

            window.__sendGtagEvent('click_whatsapp', {
              event_category: 'lead',
              event_label: 'Click WhatsApp',
              link_url: resolvedHref,
              page_location: pageContext.page_location,
              page_path: pageContext.page_path
            });

            return;
          }

          if (normalizedHref.indexOf('tel:') === 0) {
            window.__pushTrackingEvent({
              event: 'click_phone',
              lead_type: 'phone',
              phone_number: resolvedHref,
              page_location: pageContext.page_location,
              page_path: pageContext.page_path
            });

            window.__sendGtagEvent('chiamata_sito', {
              event_category: 'lead',
              event_label: 'Click telefono sito',
              phone_number: resolvedHref,
              page_location: pageContext.page_location,
              page_path: pageContext.page_path
            });

            return;
          }

          if (normalizedHref.indexOf('mailto:') === 0) {
            window.__pushTrackingEvent({
              event: 'click_email',
              lead_type: 'email',
              email_link: resolvedHref,
              page_location: pageContext.page_location,
              page_path: pageContext.page_path
            });

            window.__sendGtagEvent('click_email', {
              event_category: 'lead',
              event_label: 'Click email',
              email_link: resolvedHref,
              page_location: pageContext.page_location,
              page_path: pageContext.page_path
            });

            return;
          }
        }

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

        window.__pushTrackingEvent({
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
