function crearElementos(data) {
  var name = document.getElementById("brand-name");
  var brandName = document.createElement("a");
  brandName.className = "navbar-brand";
  brandName.textContent = data[0].hoja;
  brandName.href = "#" + data[0].hoja;
  name.appendChild(brandName);

  // //footer
  // var footer = document.getElementById("footer");
  // var spanF = document.createElement("span");
  // spanF.className = "text-muted share-tech-mono-regular";
  // spanF.textContent = "Menú creado por Pan Comido";
  // footer.appendChild(spanF);
  // //fin footer

  // Obtener el contenedor donde se agregarán los acordeones
  var accordionContainer = document.getElementById("accordionContainer");

  data.forEach((sheet, index,arr) => {
    // Crear el elemento de acordeón
    var accordionItem = document.createElement("div");
    accordionItem.className = "accordion-item";

    
    // Encabezado del acordeón
    var accordionHeader = document.createElement("h2");
    accordionHeader.className = "accordion-header";
    accordionHeader.id = "heading" + index;

    var accordionButton = document.createElement("button");
    accordionButton.className = "accordion-button";
    accordionButton.type = "button";
    accordionButton.setAttribute("data-bs-toggle", "collapse");  
    if (index === 0 || index === arr.length -1) {}else{
     
      accordionButton.setAttribute("data-bs-target", "#collapse" + index);
      accordionButton.setAttribute("aria-expanded", "true");
      accordionButton.setAttribute("aria-controls", "collapse" + index);
      accordionButton.textContent = sheet.hoja;
      accordionHeader.appendChild(accordionButton);
      accordionItem.appendChild(accordionHeader);
    }
    
 

    // Cuerpo del acordeón
    var accordionCollapse = document.createElement("div");
    accordionCollapse.id = "collapse" + index;
    accordionCollapse.className = "accordion-collapse collapse";
    if (index === 0 || index === arr.length -1) {
      accordionCollapse.className += "show"; // Mostrar el primer acordeón al cargar
      accordionHeader.textContent = ""
    }
    accordionCollapse.setAttribute("aria-labelledby", "heading" + index);
    accordionCollapse.setAttribute("data-bs-parent", "#accordionContainer");

    var accordionBody = document.createElement("div");
    accordionBody.className = "accordion-body";



    // Crear tabla
    var table = document.createElement("div");
    var headers = Object.keys(sheet.datos[0]);
    table.setAttribute(
      "class",
      "table table-borderless table align-middle text-wrap"
    );

    // Crear celdas de datos
    sheet.datos.forEach((rowData) => {
      var row = document.createElement("div");
      row.className = "divBottom";

      // Verificar si el encabezado "Imagen" existe en la fila actual de datos
      var hasImageHeader = Object.keys(rowData).includes("Imagen");

      // Si el encabezado "Imagen" existe y hay una URL de imagen proporcionada en los datos
      if (hasImageHeader && rowData["Imagen"] !== "") {
        var imgRow = document.createElement("div");
        var cellImagen = document.createElement("div");
        cellImagen.className = "imgHeader";        
        imgRow.appendChild(cellImagen);
        row.appendChild(imgRow);
        addImageToRow(cellImagen, rowData["Imagen"]);
      }

      // Crear celdas de datos
      headers.forEach((header) => {
        if (header !== "Imagen") {
          // Crear la celda de datos normal
          var dataCell = createDataCell(rowData[header], header);
          row.appendChild(dataCell);
        }
      });



      table.appendChild(row);
    });

    accordionBody.appendChild(table);
    accordionCollapse.appendChild(accordionBody);
    accordionItem.appendChild(accordionCollapse);
    accordionContainer.appendChild(accordionItem);
  });

  // Activar el acordeón de Bootstrap
  //var accordion = new bootstrap.Accordion(document.getElementById("accordionContainer"));

  // Evento de clic para ocultar la barra de navegación en dispositivos móviles
  var navLinks = document.querySelectorAll('.navbar-nav li a');
  navLinks.forEach(function(navLink) {
    navLink.addEventListener('click', function() {
      var navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
      }
    });
  });
}



function createDataCell(value, header) {
  const cell = document.createElement("div");

  // Set the text content of the cell to the value passed
  cell.textContent = value;

  // Add a class to style the cell based on its content or header
  cell.className = "align-middle";

  // Convert the value to uppercase if it's a string
  const uppercaseValue = typeof value === "string" ? value.toUpperCase() : value;

  // Switch statement to customize cell based on header
  switch (header.toUpperCase()) {
    case "VEGANO":
      if (uppercaseValue === "SI") {
        // Clear text content if value is "SI" and add an image
        cell.textContent = "";
        cell.className = "logos";
        addImageToRow(cell, "./img/VEGAN.png", "logo");
        
      }
      break;
    case "SINTACC":
      if (uppercaseValue === "SI") {
        // Clear text content if value is "SI" and add an image
        cell.textContent = "";
        cell.className = "logos";
        addImageToRow(cell, "./img/SINTACC.png", "logo");
      }
      break;
    case "PRECIO":
      // Format the cell content for the "PRECIO" header (add "$" prefix)
      cell.innerHTML = "$" + value;
      cell.className = "price";
      break;
    case "NOMBRE":
      // Add class to style the cell for "NOMBRE" header (bold font)
      cell.className = "title font-weight-bold";
      break;
    case "WHATSAPP":
      // Customize cell for "WHATSAPP" header (add WhatsApp icon and link)
      const whatsappIcon = document.createElement('i');
      whatsappIcon.className = 'bi bi-whatsapp';
      cell.textContent = "";
      cell.appendChild(whatsappIcon);
      cell.setAttribute('href', "https://wa.me/" + value);
      cell.className = "link";
      break;
    case "INSTAGRAM":
      // Customize cell for "INSTAGRAM" header (add Instagram icon and link)
      const instagramIcon = document.createElement('i');
      instagramIcon.className = 'bi bi-instagram';
      cell.textContent = "";
      cell.appendChild(instagramIcon);
      cell.setAttribute('href', "https://instagram.com/" + value);
      cell.className = "link";
      break;
    case "FACEBOOK":
      // Customize cell for "FACEBOOK" header (add Facebook icon and link)
      const facebookIcon = document.createElement('i');
      facebookIcon.className = 'bi bi-facebook';
      cell.textContent = "";
      cell.appendChild(facebookIcon);
      cell.setAttribute('href', "https://facebook.com/" + value);
      cell.className = "link";
      break;
  }

  // Add an event listener to the cell to handle click events
  cell.addEventListener('click', function() {
    // Navigate to the URL specified in the cell's href attribute
    window.location.href = this.attributes.href.nodeValue;
  });

  // Return the created cell element
  return cell;
}

// Función para crear un elemento img y añadirlo a la fila
function addImageToRow(row, src, rowData) {
  var img = document.createElement("img");
  img.src = src;

  //img.alt = rowData["Nombre"]; // Puedes establecer un atributo alt con el nombre del producto
rowData!="logo"?img.className="image":img.className="logos"

  // if (rowData === "logo") {
  //   row.className = "logos"
  //   img.style.maxWidth = "40px"
  // } else {
  //   img.style.maxWidth = "140px";
  //   img.style.border = "solid 2px #c79534";
  //   img.style.borderRadius = "50%";
  // }

  //rowData==="logo"?img.style.maxWidth = "40px":img.style.maxWidth = "140px"; // Establece un ancho máximo opcional

  row.appendChild(img);
}

// async function mostrarDatos() {
//   try {
//     const response = await fetch(
//       "https://script.google.com/macros/s/AKfycbwaC-qrjz7qICzBgPvp7D5JyLDb7IHOQagN4cV7N8jlG4H9kS9OdUN2OVvyFFyenVI0/exec"
//     );
//     const data = await response.json();
//     crearElementos(data);
//   } catch (error) {
//     console.error("Error al obtener los datos:", error);
//   }
// }
//mostrarDatos();
const data = [{"hoja":"Pan Comido","datos":[{"Descripcion":"Bienvenido a nuestro Menú aqui podrá encontrar todas las opciones actualizadas y disponibles.","Imagen":"./img/PANCOMIDO.png"}]},{"hoja":"Aperitivos","datos":[{"Nombre":"Fernet Branca","Descripcion":"","Precio":4000,"Imagen":"","Vegano":"","SinTacc":""},{"Nombre":"Campari","Descripcion":"","Precio":4500,"Imagen":"","Vegano":"","SinTacc":""},{"Nombre":"Gin tonic","Descripcion":"Gin con menta y limon","Precio":5200,"Imagen":"","Vegano":"","SinTacc":""}]},{"hoja":"Entradas","datos":[{"Nombre":"Pate de Pato","Descripcion":"Pate hecho a mano de pato patagonico","Precio":2500,"Imagen":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3kd8I21l9C19z1nnLO1WAbVLgPkLJ6cAiYw&s","Vegano":"SI","SinTacc":"SI"},{"Nombre":"Tabla de fiambres","Descripcion":"Todas las texturas de la tabla clasica Argentina.","Precio":4200,"Imagen":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiHmVek0M_iBZwnKiPMwPsVhl7phSkmtPGFg&s","Vegano":"SI","SinTacc":"Si"}]},{"hoja":"Principal","datos":[{"Nombre":"Handmade duck pate","Descripcion":"Hamburguesa doble con panceta chedar y salsa especial","Precio":4200,"Imagen":"","Vegano":"","SinTacc":""},{"Nombre":"Asado Criollo ","Descripcion":"Asado de coccion lenta echo a la leña","Precio":6100,"Imagen":"","Vegano":"","SinTacc":"SI"},{"Nombre":"ñoquis ","Descripcion":"ñoquis de papa ","Precio":3200,"Imagen":"","Vegano":"","SinTacc":""},{"Nombre":"pastas","Descripcion":"fideo tallarín ","Precio":2300,"Imagen":"","Vegano":"","SinTacc":"si"}]},{"hoja":"Bebidas","datos":[{"Nombre":"Agua con gas","Descripcion":"Agua del manantial","Precio":8000,"Imagen":"","Vegano":"","SinTacc":""},{"Nombre":"Cerveza 1l","Descripcion":"Cerveza tirada artesanal ","Precio":12000,"Imagen":"https://estaticos-cdn.prensaiberica.es/clip/326588c9-f817-4753-a57d-953afd7f0210_alta-aspect-ratio_default_0.jpg","Vegano":"","SinTacc":""}]},{"hoja":"Postres","datos":[{"Nombre":"Postre Oreo","Descripcion":"Pastel de queso con colchon de oreos","Precio":4200,"Imagen":"","Vegano":"","SinTacc":""},{"Nombre":"Flan D&C","Descripcion":"Flan con dulce y crema","Precio":3000,"Imagen":"","Vegano":"","SinTacc":""}]},{"hoja":"Rutini","datos":[{"Nombre":"Trumpeter Cab. Franc","Descripcion":"","Precio":12000,"Imagen":"","Vegano":"","SinTacc":""},{"Nombre":"Rutini Malbec","Descripcion":"","Precio":38500,"Imagen":"","Vegano":"","SinTacc":""},{"Nombre":"Rutini Mal. Cab. Sau","Descripcion":"","Precio":21000,"Imagen":"","Vegano":"","SinTacc":""}]},{"hoja":"Contacto","datos":[{"Horario":"Seguinos en las redes","WhatsApp":5491158000906,"Instagram":"Aibanz_Zubi","Facebook":"Aibanzz","X":""}]}]
window.addEventListener("load", function(event) {
  crearElementos(data);
});