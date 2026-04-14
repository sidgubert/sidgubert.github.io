
const formulario  = document.querySelector('[data-formulario]')          // querySelector
const botaoEnviar = document.querySelector('[data-botao-enviar]')        // querySelector
const divSucesso  = document.querySelector('[data-formulario-sucesso]')  // querySelector



const mensagensDeErro = {
  nome: {
    valueMissing: 'O campo Nome é obrigatório.',
    tooShort:     'O nome precisa ter pelo menos 3 caracteres.',
  },
  email: {
    valueMissing:  'O campo E-mail é obrigatório.',
    typeMismatch:  'Informe um e-mail válido, ex: nome@dominio.com.',
    tooShort:      'E-mail muito curto. Verifique o endereço informado.',
  },
  telefone: {
    patternMismatch: 'Telefone inválido. Use o formato (77) 99999-9999.',
  },
  cidade: {
    tooShort: 'Informe uma cidade válida (mínimo 3 caracteres).',
  },
  assunto: {
    valueMissing: 'O campo Assunto é obrigatório.',
  },
  mensagem: {
    valueMissing: 'O campo Mensagem é obrigatório.',
    tooShort:     'A mensagem precisa ter pelo menos 10 caracteres.',
  },
}



const retornarMensagemDeErro = function (campo) {               
  const msgs = mensagensDeErro[campo.name]
  if (!msgs) return ''

  if (campo.validity.valueMissing)    return msgs.valueMissing    || 'Campo obrigatório.'
  if (campo.validity.typeMismatch)    return msgs.typeMismatch    || 'Valor inválido.'
  if (campo.validity.tooShort)        return msgs.tooShort        || 'Muito curto.'
  if (campo.validity.patternMismatch) return msgs.patternMismatch || 'Formato inválido.'
  return ''
}


const verificarCampo = (campo) => {                             
  const spanErro = campo.nextElementSibling                     

  const fieldset = campo.parentNode                             

  const totalNos = fieldset.childNodes.length                   

  if (campo.validity.valid) {

    spanErro.innerHTML = ''                                     
    campo.classList.remove('campo__escrita--erro')
    if (campo.value.trim()) campo.classList.add('campo__escrita--valido')
       campo.setAttribute('aria-invalid', 'false')                 
  } else {
    const mensagem = retornarMensagemDeErro(campo)
    spanErro.innerHTML = mensagem                              
    campo.classList.add('campo__escrita--erro')
    campo.classList.remove('campo__escrita--valido')
    campo.setAttribute('aria-invalid', 'true')                  
  }

  return campo.validity.valid
}

const camposDoFormulario = document.querySelectorAll(          
  '[data-formulario] .campo__escrita'
)

camposDoFormulario.forEach(campo => {                           
  campo.addEventListener('blur', () => verificarCampo(campo))  

  campo.addEventListener('input', function () {                   
    if (
      campo.classList.contains('campo__escrita--erro') ||
      campo.classList.contains('campo__escrita--valido')
    ) {
      verificarCampo(campo)
    }
  })
})

formulario.addEventListener('submit', function (evento) {       
  evento.preventDefault()

  let formularioValido  = true
  let primeiroCampoRuim = null

  camposDoFormulario.forEach(campo => {                         
    const campoValido = verificarCampo(campo)
    if (!campoValido) {
      formularioValido = false
      if (!primeiroCampoRuim) primeiroCampoRuim = campo
    }
  })

  if (!formularioValido) {
    primeiroCampoRuim.focus()
    primeiroCampoRuim.scrollIntoView({ behavior: 'smooth', block: 'center' })
    return
  }

  botaoEnviar.setAttribute('disabled', 'true')                  
  botaoEnviar.innerHTML = 'Enviando…'                           

  setTimeout(function () {                                     
    divSucesso.style.display = 'flex'
    formulario.reset()

    document.querySelectorAll('[data-formulario] .campo__escrita').forEach(c => {  
      c.classList.remove('campo__escrita--erro', 'campo__escrita--valido')
      c.setAttribute('aria-invalid', 'false')                   
      if (c.nextElementSibling) c.nextElementSibling.innerHTML = '' 
    })

    botaoEnviar.removeAttribute('disabled')
    botaoEnviar.innerHTML =                                     
      'Enviar mensagem <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>'

    setTimeout(() => { divSucesso.style.display = 'none' }, 5000)  
  }, 800)
})
