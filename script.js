const url = 'https://dummyjson.com/quotes/random';
const autor = document.getElementById('autor');
const frase = document.getElementById('frase');
const input = document.createElement('input');
const btnCopiar = document.getElementById('btn-copiar');
const btnSelect = document.querySelector('select');

const getFrase = async () => {
  const resp = await fetch(url);
  const respJson = await resp.json();
  
  if (resp.status == 200){
    autor.textContent = respJson.author;
    
    //evento para llamar a la funcion que traduce la frase del ingles al portugues
    //la siguiente vez lo hara al idioma al espanhol caso sea seleccionado
    fraseTotranslate(respJson.quote);  
  }else{
    throw new error(resp)
  }
}

//funcion que traduce la frase por primera vez quando viene em ingles
const fraseTotranslate =  async (text) => {
  let idiomaSelected = btnSelect.options[btnSelect.selectedIndex].value;
  const urlTraductor = `https://api.mymemory.translated.net/get?q=${text}&langpair=en|${idiomaSelected}`;
  const resp = await fetch(urlTraductor);
  
  if (resp.status == 200){
    const respJson = await resp.json();
    //frase traducida
    frase.textContent = respJson.responseData.translatedText;
    //uso um input para almacenar la frase para poder copiar
    input.value = frase.textContent + " Autor: " + autor.textContent;
  }
}

//funcion para copiar mobile
copiarMobile = () => {
  input.select();
  input.setSelectionRange(0, 99999);
  alert('Copiado!')
}

//funcion para copiar em pc
copiar = () => {
  navigator.clipboard.writeText(input.value);
  alert('Copiado!')
}

//funcion para traducir a frase
traducir = async () => {
  let idiomaSelected = btnSelect.options[btnSelect.selectedIndex].value;
  text = frase.textContent;
  if (idiomaSelected == 'es'){
    idiomaActual = 'pt'
  }else{
    idiomaActual = 'es'
    idiomaSelected = 'pt'
  }

  const mudarIdioma = `https://api.mymemory.translated.net/get?q=${text}&langpair=${idiomaActual}|${idiomaSelected}`;
  const resp = await fetch(mudarIdioma);
  if(resp.status === 200){
    const respJson = await resp.json();

    frase.textContent = respJson.responseData.translatedText;
  }
}

//eventos
getFrase();

btnCopiar.addEventListener('touchend', copiarMobile);
