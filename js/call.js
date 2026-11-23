(function () {
  if (typeof HTMLDialogElement === 'undefined') return;
  var dlg = document.createElement('dialog');
  dlg.className = 'calldlg';
  dlg.setAttribute('aria-labelledby', 'calldlg-title');
  dlg.innerHTML =
    '<h2 id="calldlg-title">Call Able Dental?</h2>' +
    '<p>Do you want to call <strong class="calldlg-num"></strong>?</p>' +
    '<div class="calldlg-btns">' +
    '<button type="button" class="btn ghost" data-cancel>Cancel</button>' +
    '<a class="btn" data-go href="#">Call</a>' +
    '</div>';
  document.body.appendChild(dlg);
  var num = dlg.querySelector('.calldlg-num'),
      go = dlg.querySelector('[data-go]');

  function pretty(href) {
    var d = href.replace(/\D/g, '').slice(-10);
    return d.length === 10 ? '(' + d.slice(0, 3) + ') ' + d.slice(3, 6) + '-' + d.slice(6) : href.replace('tel:', '');
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href^="tel:"]') : null;
    if (!a || a === go) return;
    e.preventDefault();
    var href = a.getAttribute('href');
    num.textContent = pretty(href);
    go.setAttribute('href', href);
    dlg.showModal();
  });

  dlg.addEventListener('click', function (e) {
    if (e.target === dlg || e.target.hasAttribute('data-cancel')) dlg.close();
  });
  go.addEventListener('click', function () { setTimeout(function () { dlg.close(); }, 300); });
})();
