// YallaEat GA4 Tracking
// Replace G-XXXXXXXXXX with actual measurement ID
(function(){
  var s=document.createElement('script');
  s.async=true;
  s.src='https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
  document.head.appendChild(s);
  window.dataLayer=window.dataLayer||[];
  function gtag(){dataLayer.push(arguments);}
  window.gtag=gtag;
  gtag('js',new Date());
  gtag('config','G-XXXXXXXXXX');

  // Track CTA clicks
  document.addEventListener('click',function(e){
    var link=e.target.closest('a');
    if(!link) return;
    var href=link.href||'';
    if(href.includes('commandes.yallaeat.fr')){
      gtag('event','clic_commander',{event_category:'conversion',event_label:href});
    }
    if(href.startsWith('tel:')){
      gtag('event','clic_telephone',{event_category:'conversion',event_label:href});
    }
    if(href.includes('maps.google')||href.includes('goo.gl/maps')){
      gtag('event','clic_itineraire',{event_category:'conversion',event_label:href});
    }
  });
})();
