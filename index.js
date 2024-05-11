const searchInput = document.querySelector('#buscador');
const container = document.querySelector('#paises-lista');
const containerNormal = document.querySelector('#paises-information')
const information = document.querySelector('.info')
const tarjetInfo = document.querySelector('#add')

// Los paises descargados desde la api se guardan en el array de countries
// La api deberia pedirse solo una vez
// Usar este array para crear el filtrado
let countries = [];

// Funcion que pide todos los paises
const cargarPaises = async () => {

    // Llamo a la API Rest Countries
    const respuesta = await fetch(`https://restcountries.com/v3.1/all`);

     // Transformo la respuesta a JSON
  const datos = await respuesta.json();

  // Guardo el array de los paises recibido dentro de contries
countries = datos;
 
;}


cargarPaises();

searchInput.addEventListener('input', async e => {
    const search = e.target.value.toLowerCase();
    
    let countriesInfoHTML = '';
    const paisesFiltro = countries.filter(p => p.name.common.toLowerCase().startsWith(search));
    information.innerHTML ='';
    info.innerHTML ='';

    if (paisesFiltro.length === 0){
        info.innerHTML = `<p class="info">
                            Especifica mejor tu búsqueda.
                          </p>`;
    } else if(paisesFiltro.length > 10){
        info.innerHTML = `<p class="info">
                            Demasiados países, especifica mejor tu búsqueda.
                          </p>`;
    } else {
        // Función asincrónica para obtener el clima
        const obtenerClima = async (lat, lon) => {
            const climaRespuesta = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=dd0715961b797ee9d38075e60157e745&units=metric`);
            const climaDatos = await climaRespuesta.json();
            return climaDatos;
        };

        // Iterar sobre los países y obtener el clima
        for (const p of paisesFiltro) {
            const climaDatos = await obtenerClima(p.latlng[0], p.latlng[1]);    
            const nube = climaDatos.weather[0].icon;                        
            const tiempo = climaDatos.main.temp;
            const nombre = p.name.common;
            const bandera = p.flags.svg;
            const capital = p.capital;
            const continente = p.continents;
            const time = p.timezones;
            const habitantes = p.population;
            countriesInfoHTML += `
                <li class="paises-item">
                    <div id="paises-img">
                        <img class="paises-img-info" src="${bandera}" alt="">
                    </div>
                    <div id="paises-info">
                        <p class="nombre-pais-title">${nombre}</p>
                        <p class="nombre-pais-info">Capital: ${capital}</p>
                        <p class="nombre-pais-info">Habitantes: ${habitantes}</p>
                        <p class="nombre-pais-info">Continente ${continente}</p>
                        <p class="nombre-pais-info">Zona horaria: ${time}</p>
                        <div class="tiempo"> 
                          <img class="nombre-pais-info" src= "https://openweathermap.org/img/wn/${nube}@2x.png">
                          <p class="nombre-pais-info"> ${tiempo} Celsius</p>
                        </div>
                    </div>
                </li>
            `;
        };
        container.innerHTML = countriesInfoHTML;
    };
                                container.addEventListener('click', e => {
                                    let listItem = e.target.closest('.paises-item');
                                    const pe = listItem.querySelectorAll('.nombre-pais-info');
                                    pe.forEach(info => {
                                        info.classList.remove('nombre-pais-info');
                                        info.classList.add('nombre-pais');
                                    });
                                    // Si se hizo clic en un <li> o algún elemento dentro de él
                                    if (listItem) {
                                        listItem.classList.remove('paises-item');
                                        listItem.classList.toggle('paises-itemenes');
                                        const ulInfo = document.querySelector('#paises-information');
                                        ulInfo.appendChild(listItem);
                                        // Imprime el <li> completo
                                        // Aquí puedes realizar cualquier acción que necesites con el elemento <li>
                                    };
                                });
                                    // primero cambiar la clase del p
                                containerNormal.addEventListener('click', e => {
                                    let listNormal = e.target.closest('.paises-itemenes');
                                    const normal = listNormal.querySelectorAll('.nombre-pais');
                                     normal.forEach(noInfo => {
                                        noInfo.classList.remove('nombre-pais');
                                        noInfo.classList.add('nombre-pais-info');
                                    })
                                    // Si se hizo clic en un <li> o algún elemento dentro de él
                                    if (listNormal) {
                                        listNormal.classList.remove('paises-itemenes');
                                        listNormal.classList.toggle('paises-item');
                                        const ulNoInfo = document.querySelector('#paises-lista');
                                        ulNoInfo.appendChild(listNormal);
                                    };
                                });
});

// disculpe la demora