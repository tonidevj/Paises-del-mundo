 const buscador = document.querySelector('#buscador');


 const cargarPaises = async() => {
     try{
         const respuesta = await fetch('https://restcountries.com/v3.1/all');
           //si la respuesta es correcta
           if(respuesta.status === 200){
             const datos = await respuesta.json()
            
             for (let i = 0; i < datos.length; i++) {
                const pais = datos[i];
                const capital = pais.capital[0] || 'no posee';
                const nombreComun = datos[i].name.common;
                const bandera = pais.flags.png;
                const habitantes = pais.population.toLocaleString();
                
                console.log(`País: ${nombreComun}`);
                console.log(`Bandera: ${bandera}`);
                console.log(`Habitantes: ${habitantes}`);
                console.log(`Capital: ${capital}`);
                console.log('---');}



             console.log(datos);
           } else if(respuesta.status === 401){
             console.log('mal');
           }else if(respuesta.status === 404){
             console.log('el pais no se encuentra disponible');
           }else{
             console.log('error inesperado');
           }

     }catch(error){
         console.log(error);
     }
 }

 cargarPaises();



// const buscador = document.querySelector('#buscador');

// const cargarPaises = async () => {
//     try {
//         const respuesta = await fetch('https://restcountries.com/v3.1/all');
//         console.log(respuesta);

//         // Si la respuesta es correcta
//         if (respuesta.ok) {
//             const datos = await respuesta.json();
//             console.log(datos);
//             mostrarOpciones(datos);
//         } else if (respuesta.status === 401) {
//             console.log('Error 401: No autorizado');
//         } else if (respuesta.status === 404) {
//             console.log('Error 404: El país no se encuentra disponible');
//         } else {
//             console.log('Error inesperado');
//         }
//     } catch (error) {
//         console.log('Error:', error.message);
//     }
// }

// const mostrarOpciones = (datos) => {
//     const datalist = document.createElement('datalist');
//     datalist.setAttribute('id', 'listaPaises');

//     datos.forEach(pais => {
//         const option = document.createElement('option');
//         option.textContent = pais.name.common;
//         datalist.appendChild(option);
//     });

//     buscador.setAttribute('list', 'listaPaises'); // Asociar el datalist con el input
//     document.body.appendChild(datalist); // Agregar el datalist al DOM
// }

// cargarPaises();



// async obtenPaises() {
//     try {
//         let res = await fetch('https://restcountries.com/v3.1/all');
//         let listaDePaises = await res.json();
//         console.log(listaDePaises);
//     } catch(error) {
//         console.log(error);
//     }
// }
