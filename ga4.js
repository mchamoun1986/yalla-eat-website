// YallaEat GA4 Tracking
// Lazy-loaded on first user interaction — zero impact on LCP/FCP
(function(){
  var GA_ID = 'G-M3I38CT1GK';
  if (!GA_ID) return;

  var loaded = false;
  function loadGA() {
    if (loaded) return; loaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID);

    document.addEventListener('click', function(e){
      var link = e.target.closest('a'); if (!link) return;
      var href = link.href || '';
      if (href.includes('commandes.yallaeat.fr')) gtag('event','clic_commander',{event_category:'conversion',event_label:href});
      else if (href.startsWith('tel:')) gtag('event','clic_telephone',{event_category:'conversion',event_label:href});
      else if (href.includes('maps.google')||href.includes('goo.gl/maps')) gtag('event','clic_itineraire',{event_category:'conversion',event_label:href});
    });
  }

  // Defer loading: wait for browser idle OR first real interaction
  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadGA, {timeout: 3000});
  } else {
    setTimeout(loadGA, 2000);
  }
  ['scroll','pointerdown','keydown','touchstart'].forEach(function(e){
    window.addEventListener(e, loadGA, {once:true, passive:true});
  });
})();
