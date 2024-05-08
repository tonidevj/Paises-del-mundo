const contenedorPaises = document.getElementById('paises-lista');

document.addEventListener('keyup', e =>{

  if(e.target.matches('#buscador')){
    document.querySelectorAll(".paises-item").forEach( countries =>{
      countries.textContent.toLowerCase().includes(e.target.value.toLowerCase())
      ?countries.classList.remove('filtro')
      :countries.classList.add('filtro')
    })
  }
 
} )



const cargarPaises = async () => {
    try {
        const respuesta = await fetch('https://restcountries.com/v3.1/all');

        if (respuesta.status === 200) {
            const datos = await respuesta.json();

            datos.forEach(pais => {
                const nombreComun = pais.name.common;
                const bandera = pais.flags.png;

                const paisHTML = `
                    <li class="paises-item">
                        <div id="paises-img">
                            <img class="paises-img-info" src="${bandera}" alt="">
                        </div>
                        <div id="paises-info">
                            <p class="nombre-pais">${nombreComun}</p>
                        </div>
                    </li>
                `;

                contenedorPaises.innerHTML += paisHTML;
            });

        } else if (respuesta.status === 401) {
            console.log('Error 401: No autorizado');
        } else if (respuesta.status === 404) {
            console.log('Error 404: El país no se encuentra disponible');
        } else {
            console.log('Error inesperado');
        }

    } catch (error) {
        console.log('Error:', error);
    }
}

cargarPaises();
