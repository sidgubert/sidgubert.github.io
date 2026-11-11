# Terminal Portfolio · Sidnelson Gubert

Landing page pessoal com estética retro-terminal / cyberpunk.

**Stack:** React 18 · Vite 6 · Tailwind CSS 4 · Framer Motion · Lucide Icons

## Rodando localmente

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera ./dist (caminhos relativos, pronto para GitHub Pages)
npm run preview
```

## Estrutura

```
src/
├── data/profile.js          # TODO o conteúdo (bio, stack, projetos, links) — edite aqui
├── components/
│   ├── Typewriter.jsx       # efeito de digitação (Framer Motion staggerChildren)
│   ├── TerminalWindow.jsx   # janela com barra de título e bordas finas
│   ├── Prompt.jsx / Cursor.jsx / SectionHeader.jsx / Navbar.jsx
└── sections/
    ├── Hero.jsx             # boot: comando → logs → título digitado → subtítulo
    ├── SystemInfo.jsx       # neofetch
    ├── TechStack.jsx        # ls -la ~/tech_stack (AI em destaque âmbar)
    ├── Deployments.jsx      # cards systemctl com glow no hover
    ├── UserConfig.jsx       # easter egg: terminal minimizado + mini-shell interativo
    └── Footer.jsx           # links + prompt final com cursor piscando
```

## Easter egg

Expanda o bloco `User_Config` e digite `help`. Comandos: `whoami`, `ls`,
`cat personal_interests.json`, `cat .secrets`, `date`, `echo`, `sudo hire-me`, `clear`.

## Acessibilidade

- Respeita `prefers-reduced-motion` (sem digitação/flicker, texto aparece direto).
- Texto completo exposto via `aria-label` durante a digitação.
- Link "pular para o conteúdo", foco visível e navegação por teclado.

