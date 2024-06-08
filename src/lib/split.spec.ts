import test from 'tape';

import split from './split';

test('[split] splits csv', t => {
  t.deepEqual(
    split('a,b,c'),
    ['a', 'b', 'c'],
    'splits comma'
  );

  t.deepEqual(
    split('"a","b","c"'),
    ['"a"', '"b"', '"c"'],
    'splits comma with quotes'
  );

  t.deepEqual(
    split('"a,","b,","c,"'),
    ['"a,"', '"b,"', '"c,"'],
    'splits comma with quoted commas'
  );

  t.end();
});
