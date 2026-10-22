// node make-icons.js – erzeugt icon-192.png und icon-512.png aus dem Sonnenblumen-Sprite
import { writeFileSync } from 'node:fs';
import { deflateSync, crc32 } from 'node:zlib';
import { SPRITES, pixel, art } from './logic.js';

const HG = [0xe8, 0xf0, 0xd0];
const rgb = hex => [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16));

function chunk(typ, daten) {
  const len = Buffer.alloc(4); len.writeUInt32BE(daten.length);
  const td = Buffer.concat([Buffer.from(typ), daten]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
}

function png(groesse) {
  const sprite = SPRITES[4], farben = art('sonnenblume').farben;
  const skala = Math.floor(groesse / 22); // Rand für "maskable" Icons
  const versatz = Math.floor((groesse - 16 * skala) / 2);
  const zeilen = [];
  for (let y = 0; y < groesse; y++) {
    const z = Buffer.alloc(1 + groesse * 3); // Filterbyte 0
    for (let x = 0; x < groesse; x++) {
      const sx = Math.floor((x - versatz) / skala), sy = Math.floor((y - versatz) / skala);
      const c = sprite[sy]?.[sx] && pixel(sprite[sy][sx], farben);
      (c ? rgb(c) : HG).forEach((v, i) => { z[1 + x * 3 + i] = v; });
    }
    zeilen.push(z);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(groesse, 0); ihdr.writeUInt32BE(groesse, 4);
  ihdr[8] = 8; ihdr[9] = 2; // 8 Bit, RGB
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(Buffer.concat(zeilen))), chunk('IEND', Buffer.alloc(0))]);
}

for (const g of [192, 512]) writeFileSync(`icon-${g}.png`, png(g));
console.log('Icons geschrieben');
