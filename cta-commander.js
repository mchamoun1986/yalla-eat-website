// Boutons « Commander » sur mobile (< 900 px) : un bouton dans l'en-tête à côté du burger,
// et une pilule flottante en bas de l'écran qui apparaît au défilement, sans bande autour.
(function(){
  var URL_COMMANDE = 'https://yallaeat.dishop.co/';

  var css = ''
    + '.nav-order{display:none}'
    + '.cta-flottant{display:none}'
    + '@media(max-width:900px){'
    + '.nav-order{display:inline-flex;align-items:center;margin-left:auto;margin-right:14px;padding:.5rem 1.05rem;border-radius:50px;'
    + 'background:var(--gold,#f9ad4d);color:#0d4f3d!important;font:700 .82rem/1 Poppins,system-ui,sans-serif;letter-spacing:.02em;text-decoration:none;white-space:nowrap}'
    + '.cta-flottant{display:inline-flex;align-items:center;gap:.45rem;position:fixed;left:50%;bottom:calc(18px + env(safe-area-inset-bottom,0px));z-index:990;'
    + 'padding:.85rem 1.6rem;border-radius:50px;background:var(--gold,#f9ad4d);color:#0d4f3d!important;font:800 .95rem/1 Poppins,system-ui,sans-serif;'
    + 'text-decoration:none;box-shadow:0 8px 24px rgba(0,0,0,.28);transform:translate(-50%,140%);opacity:0;pointer-events:none;'
    + 'transition:transform .3s cubic-bezier(.16,1,.3,1),opacity .25s ease}'
    + '.cta-flottant.visible{transform:translate(-50%,0);opacity:1;pointer-events:auto}'
    + '}'
    + '@media(prefers-reduced-motion:reduce){.cta-flottant{transition:none}}';
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  function lien(classe, texte){
    var a = document.createElement('a');
    a.href = URL_COMMANDE;
    a.className = classe;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.textContent = texte;
    return a;
  }

  var burger = document.getElementById('burger');
  if (burger && burger.parentNode) burger.parentNode.insertBefore(lien('nav-order', 'Commander'), burger);

  var pilule = lien('cta-flottant', 'Commander →');
  pilule.setAttribute('aria-label', 'Commander en ligne');
  document.body.appendChild(pilule);

  var pied = document.querySelector('footer');
  var liens = document.getElementById('navLinks');
  var enAttente = false;
  function maj(){
    enAttente = false;
    var basPied = pied ? pied.getBoundingClientRect().top < window.innerHeight : false;
    var menuOuvert = liens ? liens.classList.contains('open') : false;
    pilule.classList.toggle('visible', window.scrollY > 450 && !basPied && !menuOuvert);
  }
  window.addEventListener('scroll', function(){
    if (!enAttente){ enAttente = true; requestAnimationFrame(maj); }
  }, {passive:true});
  if (liens) new MutationObserver(maj).observe(liens, {attributes:true, attributeFilter:['class']});
  maj();
})();
