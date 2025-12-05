(function(){
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  if(navToggle){
    navToggle.addEventListener('click', ()=> {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      // toggle simple display
      if(!expanded){
        mainNav.style.display = 'flex';
        mainNav.style.flexDirection = 'column';
        mainNav.style.gap = '8px';
      } else {
        mainNav.style.display = '';
      }
    });
  }

  const options = document.querySelectorAll('.quiz-options .option');
  const homeRes = document.getElementById('home-quiz-result');
  if(options && homeRes){
    options.forEach(btn => btn.addEventListener('click', function(){
      const res = this.dataset.result;
      if(res === 'correct'){
        homeRes.textContent = '✔ Bonne réponse — Inclusion, Responsabilité et Durabilité.';
        homeRes.style.color = 'var(--success)';
      } else {
        homeRes.textContent = '✘ Pas tout à fait — essaie une autre réponse.';
        homeRes.style.color = '#d23';
      }
    }));
  }

  window.updateLabel = function(id,val){
    const el = document.getElementById(id);
    if(el) el.textContent = val;
  };

  window.runSim = function(){
    const pWin = Number(document.getElementById('r1').value);
    const replaceYears = Number(document.getElementById('r2').value);
    const hostedOutside = document.getElementById('r3').value === 'yes';
    const buyPolicy = document.getElementById('r4').value;

    let score = 0;
    score += Math.round((pWin/100) * 4);
    score += (replaceYears <= 3) ? 2 : 0;
    score += hostedOutside ? 2 : 0;
    score += (buyPolicy === 'no') ? 2 : (buyPolicy === 'partial' ? 1 : 0);

    const out = document.getElementById('sim-result');
    let html = '';
    if(score <= 3){
      html = `<h3 style="color:var(--success)">Résultat : Faible dépendance</h3>
              <p>Bravo — vous êtes sur la bonne voie. Actions recommandées : renforcer réemploi et hébergement local.</p>`;
    } else if(score <= 6){
      html = `<h3 style="color:orange">Résultat : Dépendance moyenne</h3>
              <p>Actions recommandées : audit de sobriété, formation, test de migration progressive.</p>`;
    } else {
      html = `<h3 style="color:#d23">Résultat : Forte dépendance</h3>
              <p>Priorité : réduire services tiers, plan de migration, reconditionnement du parc.</p>`;
    }
    html += `<p class="mt-8"><a class="btn" href="actions.html">Voir les actions recommandées</a></p>`;
    out.innerHTML = html;
  };

  window.resetSim = function(){
    const r1 = document.getElementById('r1');
    if(r1){ r1.value = 80; updateLabel('l1',80); }
    const r2 = document.getElementById('r2'); if(r2) r2.value = 4;
    const r3 = document.getElementById('r3'); if(r3) r3.value = 'no';
    const r4 = document.getElementById('r4'); if(r4) r4.value = 'partial';
    const out = document.getElementById('sim-result'); if(out) out.innerHTML = '';
  };

  window.submitContrib = function(){
    const name = (document.getElementById('cname') || {}).value || '';
    const email = (document.getElementById('cemail') || {}).value || '';
    const type = (document.getElementById('ctype') || {}).value || '';
    const msg  = (document.getElementById('cmsg') || {}).value || '';
    const res  = document.getElementById('contrib-res');
    if(!name || !email){
      if(res){ res.textContent = 'Merci de renseigner nom et email.'; res.style.color = '#d23'; }
      return;
    }
    const existing = JSON.parse(localStorage.getItem('nird_contribs') || '[]');
    existing.push({name,email,type,msg,t:Date.now()});
    localStorage.setItem('nird_contribs', JSON.stringify(existing));
    if(res){ res.textContent = `Merci ${name} — contribution enregistrée localement (prototype).`; res.style.color = 'var(--success)'; }
    const cm = document.getElementById('cmsg'); if(cm) cm.value = '';
  };

  window.clearContrib = function(){
    const cn = document.getElementById('cname'); if(cn) cn.value = '';
    const ce = document.getElementById('cemail'); if(ce) ce.value = '';
    const cm = document.getElementById('cmsg'); if(cm) cm.value = '';
    const res = document.getElementById('contrib-res'); if(res) res.textContent = '';
  };

  if(document.getElementById('l1') && document.getElementById('r1')){
    updateLabel('l1', document.getElementById('r1').value);
  }

})();
