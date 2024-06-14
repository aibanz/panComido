//Obtener el JSON desde la URL proporcionada
fetch(
  "https://script.google.com/macros/s/AKfycbwaC-qrjz7qICzBgPvp7D5JyLDb7IHOQagN4cV7N8jlG4H9kS9OdUN2OVvyFFyenVI0/exec"
)
  .then((response) => response.json())
  .then((data) => {
    // Procesar y mostrar los datos en la página
    mostrarDatos(data);
  })
  .catch((error) => {
    console.error("Error al obtener los datos:", error);
  });

// Función para mostrar los datos en la página
function mostrarDatos(data) {
  var name = document.getElementById("brand-name");
  var brandName = document.createElement("a");
  brandName.className = "navbar-brand";
  brandName.textContent = data[0].hoja;
  brandName.href = "#" + data[0].hoja;
  name.appendChild(brandName);

  //footer
  var footer = document.getElementById("footer");
  spanF = document.createElement("span");
  spanF.className = "text-muted";
  spanF.textContent = "Pan Comido";
  footer.appendChild(spanF);
  //fin footer

  // crear tabla de contenido
  var dataDiv = document.getElementById("data");
  dataDiv.innerHTML = " "; // Limpiar el contenido

  data.map((sheet) => {
    var sheetDiv = document.createElement("div");
    sheetDiv.id = sheet.hoja;
    sheetDiv.innerHTML = `<h2>${sheet.hoja}</h2>`;
    sheetDiv.className = "mt-4 bg-light border-bottom";

    // Crear lista de navegación
    var li = document.createElement("li");
    li.className = "nav-item";
    var a = document.createElement("a");
    a.href = "#" + sheet.hoja;
    a.textContent = sheet.hoja;
    a.className =
      'nav-link data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show"';
    var liNav = document.getElementById("navlist");
    liNav.appendChild(li);
    li.appendChild(a);

    // Crear tabla
    var table = document.createElement("table");
    var headers = Object.keys(sheet.datos[0]);
    var headerRow = document.createElement("tr");
    table.setAttribute(
      "class",
      "table table-borderless table align-middle text-wrap table-sm"
    );

    // Si el encabezado "Imagen" existe, añadirlo al principio
    if (headers.includes("Imagen")) {
      var thImagen = document.createElement("th");
      thImagen.setAttribute("scope", "col");
      thImagen.textContent = "";
      thImagen.className = "text-left col-1";
      headerRow.appendChild(thImagen);
    }

    // Crear celdas de encabezado (excepto "Imagen")
    headers.forEach((header) => {
      var th = document.createElement("th");
      if (header === "Imagen") {        
        th.setAttribute("scope", "col");
        th.textContent = header;
        th.className = "col-1";
        th.textContent = "";

      }else {
          th.className = "col-5";
        }      
      headerRow.appendChild(th);
    });

    table.appendChild(headerRow);

    // Función para crear un elemento img y añadirlo a la fila
    function addImageToRow(row, src, rowData) {
      var img = document.createElement("img");
      img.src = src;
      img.alt = rowData["Nombre"]; // Puedes establecer un atributo alt con el nombre del producto
      img.style.maxWidth = "40px"; // Establece un ancho máximo opcional
      //img.className ="rounded align-middle"
      row.appendChild(img);
    }

    // Crear celdas de datos
    sheet.datos.forEach((rowData) => {
      var row = document.createElement("tr");

      // Si el encabezado "Imagen" existe y hay una URL de imagen proporcionada en los datos
      if (headers.includes("Imagen") && rowData["Imagen"] !== "") {
        var cellImagen = document.createElement("td");
        var img = document.createElement("img");
        img.src = rowData["Imagen"];
        img.alt = rowData["Nombre"]; // Puedes establecer un atributo alt con el nombre del producto
        img.style.maxWidth = "80px"; // Establece un ancho máximo opcional
        img.className = "rounded align-middle";
        cellImagen.appendChild(img);
        cellImagen.className = "align-middle";
        row.appendChild(cellImagen);
      } else {
        var cubo = document.createElement("div");
        cubo.style.width = "80px";
        row.appendChild(cubo);
      }

      // Crear celdas de datos (excepto "Imagen")
      headers.forEach((header) => {
        if (header !== "Imagen") {
          var cell = document.createElement("td");
          cell.textContent = rowData[header];
          cell.className = "align-middle";

          switch (header) {
            case "Vegano":
              if (rowData["Vegano"] === "SI") {
                addImageToRow(row, "./img/VEGAN.jpg", rowData);
              }
              break;

            case "SinTacc":
              if (rowData["SinTacc"] === "SI") {
                addImageToRow(row, "./img/SINTACC.jpg", rowData);
              }
              break;

            default:
              row.appendChild(cell);
              break;
          }
        }
      });

      table.appendChild(row);
    });

    sheetDiv.appendChild(table);
    dataDiv.appendChild(sheetDiv);
  });
}
