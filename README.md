# audreycj-lessons

Ma'am Audrey's lessons: a self-study website for my BSIT courses at Davao Oriental State University. Each lesson explains concepts in plain English, with interactive visuals that students can play with on their phones, paper practice, and ungraded self-checks.

## Courses

- **ITC 120 Data Structures and Algorithms** (`/itc120/`): midterm lessons first, prelim topics to follow
- **IT 110 Introduction to Computing**: coming soon

## Run it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
npx wrangler deploy   # publish to Cloudflare Workers
```

## Where things are

- `src/data/itc120.js`: the ITC 120 lesson list (change a lesson's `status` to `live` and add its `href` when it is ready)
- `src/pages/itc120/`: one file per lesson
- `src/lib/tree.js`: tree logic and drawing used by both the static figures and the interactive labs
- `src/components/`: reusable pieces (AVL lab, balance-factor explorer, tree figure, quiz, contents drawer)

Built by Audrey Nanual, with help from [Claude](https://claude.ai/) (Anthropic) for code and documentation.
