import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const plantsDir = join(root, 'src', 'assets', 'plants')
mkdirSync(plantsDir, { recursive: true })

const pot = (clay = '#c4703f', dark = '#a3552c') => `
  <path d="M58 148h84l-8 54c-1 8-7 14-15 14H81c-8 0-14-6-15-14l-8-54z" fill="${clay}"/>
  <rect x="52" y="140" width="96" height="16" rx="5" fill="${dark}"/>
  <path d="M70 160h60l-4 34H74l-4-34z" fill="rgba(255,255,255,0.12)"/>
`

const soil = `<ellipse cx="100" cy="144" rx="40" ry="8" fill="#3e2f23"/>`

const svg = (inner) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 220" width="200" height="220">
  <rect width="200" height="220" rx="16" fill="#f3f8f1"/>
  <circle cx="100" cy="108" r="78" fill="#e4f0de"/>
  ${inner}
</svg>`

const templates = {
  succulent(colors) {
    const [c1, c2, c3] = colors
    let petals = ''
    for (let ring = 0; ring < 3; ring++) {
      const count = 8 + ring * 4
      const radius = 14 + ring * 16
      const size = 22 - ring * 4
      const fill = [c1, c2, c3][ring]
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2 + ring * 0.2
        const cx = 100 + Math.cos(a) * radius
        const cy = 118 + Math.sin(a) * radius * 0.85
        petals += `<ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="${(size * 0.55).toFixed(1)}" ry="${size.toFixed(1)}" fill="${fill}" transform="rotate(${((a * 180) / Math.PI + 90).toFixed(1)} ${cx.toFixed(1)} ${cy.toFixed(1)})"/>`
      }
    }
    return svg(`${soil}${petals}<circle cx="100" cy="118" r="10" fill="${c2}"/>${pot()}`)
  },

  cactus(colors) {
    const [body, light, flower] = colors
    const ribs = [86, 94, 102, 110].map((x) => `<rect x="${x}" y="62" width="3" height="84" rx="1.5" fill="${light}" opacity="0.7"/>`).join('')
    return svg(`${soil}
      <rect x="82" y="62" width="36" height="90" rx="18" fill="${body}"/>
      ${ribs}
      <rect x="54" y="92" width="22" height="44" rx="11" fill="${body}" transform="rotate(-20 65 114)"/>
      <rect x="58" y="96" width="14" height="6" rx="3" fill="${light}" opacity="0.6" transform="rotate(-20 65 99)"/>
      <rect x="124" y="84" width="22" height="50" rx="11" fill="${body}" transform="rotate(18 135 109)"/>
      <rect x="128" y="90" width="14" height="6" rx="3" fill="${light}" opacity="0.6" transform="rotate(18 135 93)"/>
      <circle cx="100" cy="58" r="9" fill="${flower}"/>
      <circle cx="100" cy="58" r="4" fill="#fff3a6"/>
      ${pot('#b8643a', '#96502e')}
    `)
  },

  tallLeaves(colors) {
    const [leaf, edge, accent] = colors
    const blades = [
      { x: 78, h: 96, r: -14, s: 0.9 },
      { x: 94, h: 118, r: -4, s: 1 },
      { x: 110, h: 104, r: 10, s: 0.92 },
      { x: 122, h: 84, r: 20, s: 0.8 },
      { x: 70, h: 74, r: -26, s: 0.75 },
    ]
      .map(({ x, h, r, s }) => {
        const w = 14 * s
        return `<g transform="rotate(${r} ${x} 150)">
          <path d="M${x} 150 C${x - w} ${150 - h * 0.5}, ${x - w * 0.4} ${150 - h * 0.85}, ${x} ${150 - h} C${x + w * 0.4} ${150 - h * 0.85}, ${x + w} ${150 - h * 0.5}, ${x} 150Z" fill="${leaf}"/>
          <path d="M${x} ${150 - h * 0.1} L${x} ${150 - h * 0.9}" stroke="${edge}" stroke-width="2" stroke-linecap="round"/>
        </g>`
      })
      .join('')
    const spots = Array.from({ length: 7 }, (_, i) => {
      const x = 62 + (i * 19) % 78
      const y = 78 + (i * 17) % 54
      return `<circle cx="${x}" cy="${y}" r="3" fill="${accent}" opacity="0.75"/>`
    }).join('')
    return svg(`${soil}${blades}${spots}${pot('#3f7f8c', '#2f646f')}`)
  },

  bushy(colors) {
    const [c1, c2, c3] = colors
    return svg(`${soil}
      <ellipse cx="100" cy="96" rx="52" ry="46" fill="${c1}"/>
      <ellipse cx="72" cy="104" rx="30" ry="28" fill="${c2}"/>
      <ellipse cx="128" cy="106" rx="32" ry="30" fill="${c2}"/>
      <ellipse cx="100" cy="74" rx="34" ry="28" fill="${c3}"/>
      <ellipse cx="84" cy="86" rx="14" ry="12" fill="rgba(255,255,255,0.25)"/>
      <path d="M88 140c4-22 8-34 12-46" stroke="#2f6b3a" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M104 140c-2-20-4-32-6-44" stroke="#2f6b3a" stroke-width="3" fill="none" stroke-linecap="round"/>
      ${pot('#c4703f', '#a3552c')}
    `)
  },

  flowering(colors) {
    const [leaf, bloom, center] = colors
    const flowers = [
      [76, 78], [124, 84], [100, 62], [68, 108], [132, 114], [100, 96],
    ]
      .map(([x, y], i) => {
        const petals = Array.from({ length: 5 }, (_, p) => {
          const a = (p / 5) * Math.PI * 2 - Math.PI / 2
          const px = x + Math.cos(a) * 9
          const py = y + Math.sin(a) * 9
          return `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="6.5" fill="${bloom}"/>`
        }).join('')
        return `<g opacity="${i === 5 ? 1 : 0.95}">${petals}<circle cx="${x}" cy="${y}" r="5" fill="${center}"/></g>`
      })
      .join('')
    return svg(`${soil}
      <ellipse cx="100" cy="118" rx="48" ry="38" fill="${leaf}"/>
      <ellipse cx="74" cy="122" rx="26" ry="22" fill="${leaf}" opacity="0.85"/>
      <ellipse cx="126" cy="124" rx="26" ry="22" fill="${leaf}" opacity="0.85"/>
      ${flowers}
      ${pot('#7a4f2b', '#614024')}
    `)
  },
}

const plants = [
  { file: 'aloe-vera.svg', type: 'succulent', colors: ['#5fa777', '#7bc48f', '#a3d9b1'] },
  { file: 'echeveria.svg', type: 'succulent', colors: ['#8fbf9a', '#b7d8b8', '#d7ead2'] },
  { file: 'barrel-cactus.svg', type: 'cactus', colors: ['#3f8f4e', '#78c98a', '#f07a9a'] },
  { file: 'jade-plant.svg', type: 'bushy', colors: ['#4e9e62', '#6dbb7d', '#8fd29a'] },
  { file: 'zebra-haworthia.svg', type: 'tallLeaves', colors: ['#4f8f5a', '#e8f5e9', '#f4fff6'] },
  { file: 'bunny-ear-cactus.svg', type: 'cactus', colors: ['#5aa965', '#9ad9a4', '#ffe08a'] },
  { file: 'snake-plant.svg', type: 'tallLeaves', colors: ['#2f7a48', '#d9f0c8', '#f7e07a'] },
  { file: 'golden-pothos.svg', type: 'bushy', colors: ['#59a86a', '#7fc98a', '#c9e86a'] },
  { file: 'monstera.svg', type: 'bushy', colors: ['#2e7d4f', '#43a06a', '#66c48d'] },
  { file: 'philodendron.svg', type: 'bushy', colors: ['#3d9158', '#5fb574', '#8ad49a'] },
  { file: 'boston-fern.svg', type: 'tallLeaves', colors: ['#4c9e5e', '#e3f5e4', '#bde6c3'] },
  { file: 'zz-plant.svg', type: 'tallLeaves', colors: ['#1f6b3e', '#cfeccd', '#9fe0b0'] },
  { file: 'peace-lily.svg', type: 'flowering', colors: ['#2f7d4b', '#f7f7f2', '#f0d75a'] },
  { file: 'orchid.svg', type: 'flowering', colors: ['#3f8f5a', '#d58ae0', '#fff2a8'] },
  { file: 'anthurium.svg', type: 'flowering', colors: ['#2f7d4b', '#e85d5d', '#ffe9a8'] },
  { file: 'african-violet.svg', type: 'flowering', colors: ['#4a9e5e', '#9b6bd6', '#ffd76a'] },
  { file: 'jasmine.svg', type: 'flowering', colors: ['#3f8f55', '#fffdf5', '#f4d35e'] },
  { file: 'bird-of-paradise.svg', type: 'flowering', colors: ['#2e7d4f', '#f5a03c', '#e85d2a'] },
]

for (const p of plants) {
  writeFileSync(join(plantsDir, p.file), templates[p.type](p.colors))
}

const bg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 900" width="1440" height="900" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0d3b2e"/>
      <stop offset="45%" stop-color="#145a40"/>
      <stop offset="100%" stop-color="#0a2e22"/>
    </linearGradient>
    <radialGradient id="glow" cx="70%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#8fd9a8" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#8fd9a8" stop-opacity="0"/>
    </radialGradient>
    <pattern id="leaves" width="180" height="180" patternUnits="userSpaceOnUse">
      <path d="M40 140c0-40 30-70 70-70-10 40-30 70-70 70z" fill="#1c6b4a" opacity="0.55"/>
      <path d="M120 40c-35 5-60 35-55 75 35-10 60-35 55-75z" fill="#247a55" opacity="0.5"/>
      <path d="M150 150c-25-25-25-60 5-85 15 30 15 60-5 85z" fill="#1a5c40" opacity="0.45"/>
      <circle cx="50" cy="50" r="6" fill="#3a9a6a" opacity="0.4"/>
    </pattern>
  </defs>
  <rect width="1440" height="900" fill="url(#sky)"/>
  <rect width="1440" height="900" fill="url(#leaves)"/>
  <rect width="1440" height="900" fill="url(#glow)"/>
  <g opacity="0.5" fill="#0a2418">
    <path d="M0 900V620c80-40 160-30 240 10 60-70 150-90 240-40 70-60 160-70 250-20 80-50 170-50 260 10 70-40 150-40 230 10 70-30 130-20 220 30v270z"/>
  </g>
  <g opacity="0.35" fill="#061a12">
    <path d="M0 900V740c120-50 240-40 360 20 100-70 220-80 340-20 110-60 230-60 350 10 120-50 240-40 390 40v110z"/>
  </g>
</svg>`

writeFileSync(join(root, 'src', 'assets', 'landing-bg.svg'), bg)
console.log(`Generated ${plants.length} plant images and landing background.`)
