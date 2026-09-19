/* TOC helper for index.html
 * Include this script immediately before </body>.
 * It creates a visible, keyboard-accessible table of contents for every
 * section.page[data-title] and scrolls the horizontal pager to that page.
 */
(function () {
  function initToc() {
    var pager = document.getElementById('pager');
    var holder = document.getElementById('tocAuto');
    if (!pager || !holder) return;

    var pages = Array.prototype.slice.call(pager.querySelectorAll('.page[data-title]'));
    holder.innerHTML = '';

    var table = document.createElement('table');
    table.className = 'toc-table';
    var body = document.createElement('tbody');

    pages.forEach(function (page, index) {
      var row = document.createElement('tr');
      var cell = document.createElement('td');
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'toc-button';
      button.textContent = (index + 1) + '. ' + page.getAttribute('data-title');
      button.setAttribute('aria-label', 'Open section ' + page.getAttribute('data-title'));
      button.addEventListener('click', function () {
        pager.style.scrollSnapType = 'none';
        pager.scrollTo({ left: page.offsetLeft, behavior: 'smooth' });
        window.setTimeout(function () {
          pager.style.scrollSnapType = 'x mandatory';
        }, 700);
      });
      cell.appendChild(button);
      row.appendChild(cell);
      body.appendChild(row);
    });

    table.appendChild(body);
    holder.appendChild(table);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initToc);
  } else {
    initToc();
  }
})();
