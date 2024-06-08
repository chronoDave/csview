import splitCsv from './lib/split';
import createElement from './lib/createElement';

document.querySelector<HTMLInputElement>('#fileupload')
  ?.addEventListener('change', async event => {
    const { files } = (event.target as HTMLInputElement);
    const text = await files?.[0].text();

    const [header, ...rows] = text?.split(/\r?\n/g)
      .map(splitCsv) ?? [];

    const table = createElement('table', {}, [
      createElement('thead', {}, createElement('tr', {}, header.map((cell, i) => createElement('th', {
        'data-numeric': !Number.isNaN(parseFloat(rows[0][i])),
        'data-order': 'descending',
        'data-label': cell.toLocaleLowerCase()
      }, [
        createElement('div', {}, [
          cell,
          createElement('button', {
            type: 'button',
            'data-index': i,
            'aria-label': `Sort by ${cell} (descending)`
          }, createElement('span', { 'aria-hidden': true }, '-'))
        ])
      ])))),
      createElement('tbody', {}, rows.map(row => createElement('tr', {}, row
        .map(cell => createElement('td', {}, cell)))))
    ]);

    table.querySelectorAll<HTMLButtonElement>('th button').forEach(root => {
      root.addEventListener('click', () => {
        const i = root.dataset.index ? +root.dataset.index : 0;
        const headerCell = Array.from(table.querySelectorAll('th'))[i];
        const isNumeric = headerCell.dataset.numeric === 'true';
        const isDescending = headerCell.dataset.order === 'descending';
        const button = headerCell.querySelector('button');

        table.querySelector('tbody')?.replaceChildren(...rows
          .sort((a, b) => {
            const x = a[i];
            const y = b[i];

            if (isNumeric && isDescending) return +y - +x;
            if (isNumeric) return +x - +y;
            if (isDescending) return y.localeCompare(x);
            return x.localeCompare(y);
          })
          .map(row => createElement('tr', {}, row.map(cell => createElement('td', {}, cell)))));

        headerCell.dataset.order = isDescending ? 'ascending' : 'descending';
        button?.setAttribute('aria-label', `Sort by ${headerCell.dataset.label} (${headerCell.dataset.order})`);
        table.querySelectorAll<HTMLButtonElement>('th button').forEach(x => { x.innerText = '-'; });
        if (button) button.innerText = isDescending ? '↓' : '↑';
      });
    });

    document.querySelector('#output')?.replaceChildren(table);
  });
