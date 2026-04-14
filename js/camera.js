
const botaoCamera     = document.querySelector('[data-botao-camera]')        
const overlayCamera   = document.querySelector('[data-overlay-camera]')      
const divCamera       = document.querySelector('[data-camera]')              
const elementoVideo   = document.querySelector('[data-video]')               
const botaoFoto       = document.querySelector('[data-tirar-foto]')     

const canvas          = document.querySelector('[data-video-canvas]')        
const divMensagem     = document.querySelector('[data-mensagem]')            
const linkSalvar      = document.querySelector('[data-salvar-foto]')         
const botaoTirarOutra = document.querySelector('[data-tirar-outra]')         


const botoesFechar = document.querySelectorAll('[data-botao-fechar-modal]')  


let streamAtivo = null

const fecharCamera = () => {                                    
  if (streamAtivo) {
    streamAtivo.getTracks().forEach(track => track.stop())     
    streamAtivo = null
  }
  overlayCamera.classList.remove('camera--exibir')
  divCamera.classList.remove('formulario__camera--exibir')      
  divMensagem.classList.remove('formulario__mensagem--sucesso') 
}


const iniciarCamera = () => {                                   
  overlayCamera.classList.add('camera--exibir')
  divCamera.classList.add('formulario__camera--exibir')         
  divMensagem.classList.remove('formulario__mensagem--sucesso')

  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(function (stream) {                                 
      streamAtivo = stream
      elementoVideo.srcObject = stream
    })
    .catch((erro) => {                                          
      console.error('Câmera não disponível:', erro)
      divCamera.innerHTML +=                                    
        `<p style="color:#dc2626;font-size:13px;text-align:center;margin-top:8px">
           Não foi possível acessar a câmera.<br/>Verifique as permissões do navegador.
         </p>`
    })
}


botaoCamera.addEventListener('click', iniciarCamera)            


botoesFechar.forEach(function (btn) {                          
  btn.addEventListener('click', fecharCamera)                   
})


botaoFoto.addEventListener('click', () => {                     
  const ctx = canvas.getContext('2d')


  canvas.setAttribute('width',  elementoVideo.videoWidth  || 320)   
  canvas.setAttribute('height', elementoVideo.videoHeight || 240)   

  ctx.drawImage(elementoVideo, 0, 0)


  const ts = new Date().toISOString().slice(0, 19).replace(/[T:]/g, '-')


  linkSalvar.setAttribute('download', `foto-sid-gubert-${ts}.png`)  
  linkSalvar.setAttribute('href', canvas.toDataURL('image/png'))   


  linkSalvar.innerHTML =                                        
    `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
       <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
       <polyline points="7 10 12 15 17 10"/>
       <line x1="12" y1="15" x2="12" y2="3"/>
     </svg> Salvar foto`


  if (streamAtivo) {
    streamAtivo.getTracks().forEach(track => track.stop())      
    streamAtivo = null
  }


  const containerFoto = divCamera.nextElementSibling            
  divCamera.classList.remove('formulario__camera--exibir')      
  containerFoto.classList.add('formulario__mensagem--sucesso')  
})

botaoTirarOutra.addEventListener('click', iniciarCamera)        


overlayCamera.addEventListener('click', function (evento) {    

  if (evento.target === overlayCamera) fecharCamera()
})
