# Leadership portraits

Run the source photograph through the prep script, then fill in the matching
entry in `src/content/site.ts`. Nothing else needs to change — the pending
states disappear on their own.

```bash
node scripts/prepare-portraits.mjs "path/to/photo.png" ceo
```

It crops to 3:4, resizes to 1200×1600 and re-encodes as progressive JPEG. A
1.8MB PNG comes out around 110KB, and `next/image` then serves ~8KB of AVIF at
phone sizes. Do not commit multi-megabyte source files here — keep the
originals wherever you like and let the script produce what ships.

**The script also deletes `.next/cache/images`, and that is not optional.**
Next's optimizer keys its cache on the request URL, so replacing `ceo.jpg` in
place leaves the old optimized derivative in the cache and the site keeps
serving the previous photograph through a rebuild and a restart. Two swapped
portraits shipped that way once already. If you ever replace a portrait by hand
rather than through the script, clear that folder yourself.

## Expected files

| File | Role | Person |
|---|---|---|
| `ceo.jpg` | مدیرعامل / Chief Executive Officer | مهرزاد نجفی‌پور |
| `chairman.jpg` | رئیس هیئت‌مدیره و مدیر فنی / Chairman & Head of Engineering | ابراهیم چاوشی |

Two people, not three — Ebrahim Chavoshi holds both the chair and the
engineering lead, so the roles are combined into one entry rather than showing
the same face twice under two headings.

## Photography specification

- **Aspect ratio 3:4 (portrait).** The layout crops to this with
  `object-fit: cover`, so anything else loses the top or the sides.
- **Minimum 1200 × 1600px.** They render up to ~30vw on a 2× display.
- Plain, even background — off-white or a soft neutral. The section sits on the
  dark surface, so a busy background fights the type next to it.
- Head and shoulders, eyes roughly on the upper third.
- Consistent lighting and crop across all three. Three portraits shot in
  different places is the single fastest way to make a leadership section look
  improvised.
- The portraits are **desaturated at rest and resolve to colour on hover**, so
  avoid images that depend on one strong colour to read.

## Then update the entry

```ts
// src/content/site.ts
{
  slug: 'ceo',
  index: 1,
  role: { fa: 'مدیرعامل', en: 'Chief Executive Officer' },
  discipline: 'strategy',
  name: { fa: '…', en: '…' },
  bio:  { fa: '…', en: '…' },   // one or two lines, no more
  photo: '/team/ceo.jpg',
  linkedin: 'https://www.linkedin.com/in/…',   // or null
}
```

Any field left `null` keeps rendering its labelled pending state rather than
collapsing the layout — so a half-filled section is still presentable, and a
missing photograph never looks like a bug.

**Do not add a person here without their agreement**, and do not use stock
photography as a stand-in: a fabricated leadership team is the one thing this
site's content model is built to prevent.
