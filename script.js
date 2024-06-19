// Función para crear los elementos HTML
function crearElementos(data) {
  var name = document.getElementById("brand-name");
  var brandName = document.createElement("a");
  brandName.className = "navbar-brand";
  brandName.textContent = data[0].hoja;
  brandName.href = "#" + data[0].hoja;
  name.appendChild(brandName);

  //footer
  var footer = document.getElementById("footer");
  spanF = document.createElement("span");
  spanF.className = "text-muted share-tech-mono-regular";
  spanF.textContent = "Menú creado por Pan Comido";
  footer.appendChild(spanF);
  //fin footer

  // crear tabla de contenido
  var dataDiv = document.getElementById("data");
  dataDiv.innerHTML = " "; // Limpiar el contenido

  // Función para crear una celda de encabezado
  // function createHeaderCell(header, hasImageHeader) {
  //   const th = document.createElement("th");
  //   th.className = hasImageHeader && header === "Imagen" ? "col-1" : "col-5";
  //   th.textContent = "";
  //   return th;
  // }



  // Función para crear una celda de datos
  function createDataCell(value, header) {
    const cell = document.createElement("div");
    //const link = document.createElement("a")
    const icon = document.createElement('i')
    cell.textContent = value;
    cell.className = "align-middle";    
    const uppercaseValue =
      typeof value === "string" ? value.toUpperCase() : value;

    switch (header.toUpperCase()) {
      case "VEGANO":
        if (uppercaseValue === "SI") {
          cell.textContent = "";
          addImageToRow(cell, "./img/VEGAN.png", "logo");
        }
        break;
      case "SINTACC":
        if (uppercaseValue === "SI") {
          cell.textContent = "";
          addImageToRow(cell, "./img/SINTACC.png", "logo");
        }
        break;
      case "PRECIO":
        cell.innerHTML = "$" + value;
        cell.className="price";
        break;
      case "NOMBRE":
        cell.className = "title font-weight-bold";
        break;

        case "WHATSAPP":
        //link.href = "https://wa.me/"+ value;
        //link.innerText = value;
        icon.className=('bi bi-whatsapp')
        cell.textContent = "";
        cell.appendChild(icon)          
        cell.setAttribute('href',"https://wa.me/"+ value)
        cell.className ="link"
        break;

        case "INSTAGRAM":
          //cell.href = "https://instagram.com/"+ value;
          //link.innerText = value;
          icon.className=('bi bi-instagram')
          cell.textContent = "";
          cell.appendChild(icon)          
          cell.setAttribute('href',"https://instagram.com/"+ value)
          cell.className ="link"
          break;

          case "FACEBOOK":
            cell.href = "https://FACEBOOK.com/"+ value;
            //link.innerText = value;
            icon.className=('bi bi-facebook')
            cell.textContent = "";
            cell.appendChild(icon)          
            cell.setAttribute('href',"https://FACEBOOK.com/")
            cell.className ="link"
            break;

    }

    cell.addEventListener('click', function() {
        // Llama a la función handleClick con la URL deseada como parámetro
        window.location.href =this.attributes.href.nodeValue;
    });
    return cell;
  }



  // Función para crear un elemento img y añadirlo a la fila
  function addImageToRow(row, src, rowData) {
    var img = document.createElement("img");
    img.src = src;

    //img.alt = rowData["Nombre"]; // Puedes establecer un atributo alt con el nombre del producto
    if (rowData === "logo") {      
      row.className="logos"
      img.style.maxWidth="40px"
    } else {
      img.style.maxWidth = "140px";
      img.style.border = "solid 2px #c79534";
      img.style.borderRadius = "50%";
    }

    //rowData==="logo"?img.style.maxWidth = "40px":img.style.maxWidth = "140px"; // Establece un ancho máximo opcional

    row.appendChild(img);
  }

  data.map((sheet, index, data) => {
    var sheetDiv = document.createElement("div");
    sheetDiv.id = sheet.hoja;
    if (index === 0 || index +1 === data.length ) {
      
    }else{
      sheetDiv.innerHTML = `<h2>${sheet.hoja}</h2>`;
      sheetDiv.className = "mt-4 bg-light border-bottom";  
    }
    

    // Crear lista de navegación
    var li = document.createElement("li");
    li.className = "nav-item";
    var a = document.createElement("a");
    a.href = "#" + sheet.hoja;
    a.textContent = sheet.hoja;
    a.className =
      'nav-link data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show" text-muted';
    var liNav = document.getElementById("navlist");
    liNav.appendChild(li);
    li.appendChild(a);

    // Crear tabla
    var table = document.createElement("div");
    var headers = Object.keys(sheet.datos[0]);
    //var headerRow = document.createElement("tr");
    table.setAttribute(
      "class",
      "table table-borderless table align-middle text-wrap "
    );

    // Comprobar la existencia del encabezado "Imagen"
    var hasImageHeader = headers.includes("Imagen");

    // // Si el encabezado "Imagen" existe, añadirlo al principio
    // if (hasImageHeader) {
    //   var thImagen = document.createElement("th");
    //   thImagen.className = "col-2";
    //   thImagen.textContent = "";
    //   thImagen.className = "text-left col-4";
    //   headerRow.appendChild(thImagen);
    // }

    // Crear celdas de encabezado (excepto "Imagen")
    // headers.forEach((header) => {
    //   if (header !== "") {
    //     headerRow.appendChild(createHeaderCell(header, hasImageHeader));
    //   }
    // });

    //table.appendChild(headerRow);

    // Crear celdas de datos
    sheet.datos.forEach((rowData) => {
      var row = document.createElement("div");
      row.className = "divBottom";
      // Si el encabezado "Imagen" existe y hay una URL de imagen proporcionada en los datos
      if (hasImageHeader && rowData["Imagen"] !== "") {
        var imgRow = document.createElement("div");
        var cellImagen = document.createElement("div");
        cellImagen.className = "imgHeader";
        //cellImagen.colSpan = headers.length;
        addImageToRow(cellImagen, rowData["Imagen"]);
        imgRow.appendChild(cellImagen);
        table.appendChild(imgRow);
      }

      // Crear celdas de datos (excepto "Imagen")
      headers.forEach((header) => {
        if (header !== "Imagen") {
          row.appendChild(createDataCell(rowData[header], header));
        }
        
      });

      table.appendChild(row);
    });

    sheetDiv.appendChild(table);
    dataDiv.appendChild(sheetDiv);
  });
}

// Función para presentar los elementos en la página
async function mostrarDatos() {
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbwaC-qrjz7qICzBgPvp7D5JyLDb7IHOQagN4cV7N8jlG4H9kS9OdUN2OVvyFFyenVI0/exec"
    );
    const data = await response.json();
    crearElementos(data);
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
}

mostrarDatos();
