// node test.js
import assert from 'node:assert/strict';
import { SPRITES, STADIEN, ARTEN, METHODEN, TAG, hp, hpFarbe, giessStatus, startIntervall, spriteSVG } from './logic.js';

assert.equal(SPRITES.length, STADIEN.length);
SPRITES.forEach((s, i) => {
  assert.equal(s.length, 16, `Sprite ${i}: 16 Zeilen`);
  s.forEach((row, y) => assert.equal(row.length, 16, `Sprite ${i} Zeile ${y}: "${row}"`));
});

const ids = new Set();
for (const a of ARTEN) {
  assert.ok(!ids.has(a.id), `doppelte id ${a.id}`); ids.add(a.id);
  assert.ok(a.intervall > 0 && a.farben.length === 3, a.id);
  if (a.keimung) {
    assert.ok(METHODEN[a.keimung.methode], `${a.id}: Methode`);
    assert.ok(['Frucht', 'Tüte'].includes(a.keimung.herkunft), `${a.id}: Herkunft`);
    assert.ok(a.keimung.schritte.length > 0);
  }
}

const jetzt = Date.now();
const p = (tageHer, intervall = 10) => ({ gegossen: jetzt - tageHer * TAG, intervall });
assert.equal(hp(p(0), jetzt), 1);
assert.equal(hp(p(5), jetzt), 0.5);
assert.equal(hp(p(30), jetzt), 0);
assert.equal(hpFarbe(0.8), 'gruen');
assert.equal(hpFarbe(0.3), 'gelb');
assert.equal(hpFarbe(0.1), 'rot');
assert.equal(giessStatus(p(0), jetzt), 'Gießen in 10 Tagen');
assert.equal(giessStatus(p(9), jetzt), 'Gießen in 1 Tag');
assert.equal(giessStatus(p(10.5), jetzt), 'Heute gießen!');
assert.equal(giessStatus(p(13), jetzt), 'Seit 3 Tagen überfällig!');
assert.equal(startIntervall('kaktus', 0), 2);
assert.equal(startIntervall('kaktus', 3), 21);
assert.equal(startIntervall('kresse', 0), 1);
assert.ok(spriteSVG(4, ARTEN[0].farben).startsWith('<svg'));

console.log('OK –', ARTEN.length, 'Arten,', ARTEN.filter(a => a.keimung).length, 'Keimanleitungen');
