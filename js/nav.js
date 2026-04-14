
const linksDeNav = document.querySelectorAll('nav a[href^="#"]')

const secoes     = document.querySelectorAll('section[id]')     

const observador = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {                             
      if (!entrada.isIntersecting) return

      const idAtivo = entrada.target.getAttribute('id')

      
      linksDeNav.forEach((link) => {                            
        const eAtivo = link.getAttribute('href') === `#${idAtivo}`

        link.setAttribute('aria-current', eAtivo ? 'page' : 'false') 

        
        const noDeTexto = Array.from(link.childNodes)           
          .find(no => no.nodeType === Node.TEXT_NODE)

        link.style.color      = eAtivo ? '#1a56db' : ''
        link.style.fontWeight = eAtivo ? '600'     : ''
      })
    })
  },
  { threshold: 0.45 }
)

secoes.forEach(sec => observador.observe(sec))                 
