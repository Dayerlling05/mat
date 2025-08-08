const ejercicios = [
    {
        tema: "Explicacion",
        enunciado: "El Movimiento Rectilineo Uniforme (MRU) es un tipo de movimiento en el que un objeto se desplaza en línea recta con velocidad constante. En este contexto, la velocidad se mantiene invariable a lo largo del tiempo, lo que implica que no hay aceleración. Este concepto fundamental en la cinemática nos permite comprender y analizar el comportamiento de los objetos en movimiento rectilíneo bajo condiciones especificas. Para profundizar en la comprensión de este fenómeno, hemos preparado una serie de ejercicios resueltos que abarcan diferentes aspectos del MRU.Estos problemas proporcionarán la oportunidad de aplicar las fórmulas y conceptos asociados con el MRU, como la relación entre posición, velocidad y tiempo. Estos ejercicios resueltos buscan proporcionar una herramienta efectiva para consolidar los conocimientos adquiridos en el estudio del MRU, así como para mejorar las habilidades de resolución de problemas relacionados con este tipo de movimiento. ¡Adelante, sumérgete en el mundo del Movimiento Rectilíneo Uniforme y fortalece tus habilidades en cinemática!",
        imagen:"../imagenes/MRU.png"
    },
    {
        tema: "MRU",
        enunciado:"En el Gran Premio de España Carlos Sainz toma una recta a 340Km/h. Si la recta es de 850m. ¿Cuántos segundos le tomó recorrerla",
        imagen:"../imagenes/P1.png",
        solucion: "Identificamos los datos conocidos Verificamos que se tengan las mismas unidades. Notamos que la velocidad está dada en kilómetros por hora, entonces la convertimos a metros por segundo"
    
    },
    {
        tema: "MRU",
        enunciado:"En el Gran Premio de España Carlos Sainz toma una recta a 340Km/h. Si la recta es de 850m. ¿Cuántos segundos le tomó recorrerla",
        imagen:"../imagenes/P1.png",
        solucion: "Identificamos los datos conocidos Verificamos que se tengan las mismas unidades. Notamos que la velocidad está dada en kilómetros por hora, entonces la convertimos a metros por segundo"
    
    },
    {
        tema: "MRU",
        enunciado:"En el Gran Premio de España Carlos Sainz toma una recta a 340Km/h. Si la recta es de 850m. ¿Cuántos segundos le tomó recorrerla",
        imagen:"../imagenes/P1.png",
        solucion: "Identificamos los datos conocidos Verificamos que se tengan las mismas unidades. Notamos que la velocidad está dada en kilómetros por hora, entonces la convertimos a metros por segundo"
    }
]


const sltema = document.getElementById("tema");
const con = document.getElementById("ejercicios");


sltema.addEventListener("change", () =>{
    const temaSl = sltema.value;
    con.innerHTML = "";

    const filtrar = ejercicios.filter(
        ejercicio => ejercicio.tema ===temaSl
    );

    if(filtrar.length === 0){
        con.innerHTML= "<p>No hay ejercicios de este tema</p>";
    }
    else{
        filtrar.forEach(ejercicio =>{
            const div = document.createElement("div");
            div.classList.add("ejercicio");
            div.textContent = ejercicio.enunciado;
            con.appendChild(div);

            const img = document.createElement("img");
            img.classList.add("imagen");
            img.src= ejercicio.imagen;
            con.appendChild(img);

           
        })
    }
});
