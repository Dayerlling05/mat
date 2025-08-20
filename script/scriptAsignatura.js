const ejercicios = [
    {
        tema: "Explicacion",
        enunciado: "El Movimiento Rectilineo Uniforme (MRU) es un tipo de movimiento en el que un objeto se desplaza en línea recta con velocidad constante. En este contexto, la velocidad se mantiene invariable a lo largo del tiempo, lo que implica que no hay aceleración. Este concepto fundamental en la cinemática nos permite comprender y analizar el comportamiento de los objetos en movimiento rectilíneo bajo condiciones especificas. Para profundizar en la comprensión de este fenómeno, hemos preparado una serie de ejercicios resueltos que abarcan diferentes aspectos del MRU.Estos problemas proporcionarán la oportunidad de aplicar las fórmulas y conceptos asociados con el MRU, como la relación entre posición, velocidad y tiempo. Estos ejercicios resueltos buscan proporcionar una herramienta efectiva para consolidar los conocimientos adquiridos en el estudio del MRU, así como para mejorar las habilidades de resolución de problemas relacionados con este tipo de movimiento. ¡Adelante, sumérgete en el mundo del Movimiento Rectilíneo Uniforme y fortalece tus habilidades en cinemática!",
        imagen: "../imagenes/MRU.png"
    },
    {
        tema: "MRU",
        enunciado: "En el Gran Premio de España Carlos Sainz toma una recta a 340Km/h. Si la recta es de 850m. ¿Cuántos segundos le tomó recorrerla?",
        imagen: "/imagenes/P1.png",
        solucion: [
            {
                infor: "Identificamos los datos conocidos Verificamos que se tengan las mismas unidades.",
                imagen: "/imagenes/solucion1.png"
            },
            {
                infor: "Verificamos que se tengan las mismas unidades. Notamos que la velocidad está dada en kilómetros por hora, entonces la convertimos a metros por segundo",
                imagen: "/imagenes/solucion2.jpg"
            }

        ]
    }
]


const sltema = document.getElementById("tema");
const con = document.getElementById("con");

sltema.addEventListener("change", () => {
  const temaSl = sltema.value;
  con.innerHTML = "";

  const filtrar = ejercicios.filter(ejercicio => ejercicio.tema === temaSl);

  if (filtrar.length === 0) {
    con.innerHTML = "<p>No hay ejercicios de este tema</p>";
  } else {
    filtrar.forEach(ejercicio => {
      const div = document.createElement("div");
      div.classList.add("ejercicio");

      const enunciado = document.createElement("p");
      enunciado.textContent = ejercicio.enunciado;
      div.appendChild(enunciado);

      const img = document.createElement("img");
      img.classList.add("imagen");
      img.src = ejercicio.imagen;
      img.alt = "Imagen del ejercicio";
      div.appendChild(img);

      // Mostrar solución solo cuando el usuario lo desee
      if (Array.isArray(ejercicio.solucion)) {
        const boton = document.createElement("button");
        boton.textContent = "Mostrar solución";
        boton.style.marginTop = "15px";
        boton.style.padding = "8px 12px";
        boton.style.borderRadius = "6px";
        boton.style.border = "none";
        boton.style.backgroundColor = "#1a2b4c";
        boton.style.color = "#fff";
        boton.style.cursor = "pointer";

        const div2 = document.createElement("div");
        div2.classList.add("s");
        div2.style.display = "none"; // Oculto por defecto

        ejercicio.solucion.forEach(solu => {
          const inf = document.createElement("p");
          inf.classList.add("informacion");
          inf.textContent = solu.infor;
          div2.appendChild(inf);

          const img2 = document.createElement("img");
          img2.classList.add("isolucion");
          img2.src = solu.imagen;
          img2.alt = "Paso de solución";
          div2.appendChild(img2);
        });

        boton.addEventListener("click", () => {
          div2.style.display = div2.style.display === "none" ? "block" : "none";
          boton.textContent =
            div2.style.display === "none"
              ? "Mostrar solución"
              : "Ocultar solución";
        });

        div.appendChild(boton);
        div.appendChild(div2);
      }

      con.appendChild(div);
    });
  }
});