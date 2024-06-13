//Obtener el JSON desde la URL proporcionada
fetch('https://script.google.com/macros/s/AKfycbwaC-qrjz7qICzBgPvp7D5JyLDb7IHOQagN4cV7N8jlG4H9kS9OdUN2OVvyFFyenVI0/exec')
  .then(response => response.json())
  .then(data => {
    // Procesar y mostrar los datos en la página
    mostrarDatos(data);
  })
  .catch(error => {
    console.error('Error al obtener los datos:', error);
  });

// Función para mostrar los datos en la página
function mostrarDatos(data) {

  var name = document.getElementById('brand-name');
  var brandName = document.createElement('a');
  brandName.className = 'navbar-brand';
  brandName.textContent = data[0].hoja
  brandName.href = '#' + data[0].hoja;     
  name.appendChild(brandName)

//footer
var footer = document.getElementById('footer');
spanF = document.createElement('span');
spanF.className = 'text-muted'
spanF.textContent = 'Pan Comido'
footer.appendChild(spanF)
//fin footer

  // crear tabla de contenido
  var dataDiv = document.getElementById('data');
  dataDiv.innerHTML = ' '; // Limpiar el contenido

  data.map(sheet => {
    var sheetDiv = document.createElement('div');
    sheetDiv.id = sheet.hoja;
    sheetDiv.innerHTML = `<h2 style="font-family: math; font-size: 35px; color: #c79534; text-align: center">${sheet.hoja}</h2>`;
    sheetDiv.className = "mt-4 bg-light border-bottom";

    // Crear lista de navegación
    var li = document.createElement('li');
    li.className = 'nav-item';
    var a = document.createElement('a');
    a.href = '#' + sheet.hoja;     
    a.textContent = sheet.hoja;
    a.className = 'nav-link data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show"';
    var liNav = document.getElementById('navlist');
    liNav.appendChild(li);
    li.appendChild(a);

    // Crear tabla
    var table = document.createElement('table');
    var headers = Object.keys(sheet.datos[0]);
    var headerRow = document.createElement('tr');
    table.setAttribute('class', 'table text-wrap table-borderless table-sm');
    
    // Si el encabezado "Imagen" existe, añadirlo al principio
    if (headers.includes("Imagen")) {
        var thImagen = document.createElement('th');
        thImagen.setAttribute('scope', 'col');
        thImagen.textContent = "";
        thImagen.className = 'text-left col-md-2';
        headerRow.appendChild(thImagen);
    }
    
    // Crear celdas de encabezado (excepto "Imagen")
    headers.forEach(header => {
        if (header !== "Imagen") {
            var th = document.createElement('th');
            th.setAttribute('scope', 'col');
            th.textContent = header;
            th.className = 'col-md-2';
            headerRow.appendChild(th);
        }
    });

    table.appendChild(headerRow);

    // Crear celdas de datos
    sheet.datos.forEach(rowData => {
        var row = document.createElement('tr');
        
        // Si el encabezado "Imagen" existe, añadirlo al principio de la fila
        if (headers.includes("Imagen") & rowData["Imagen"] != "") {
            var cellImagen = document.createElement('td');
            var img = document.createElement('img');
            img.src = rowData["Imagen"];
            img.alt = rowData["Nombre"]; // Puedes establecer un atributo alt con el nombre del producto
            img.style.maxWidth = "100px"; // Establece un ancho máximo opcional
            cellImagen.appendChild(img);
            row.appendChild(cellImagen);
        }else{
          var cubo = document.createElement('div')
          cubo.style.width = "100px";
          row.appendChild(cubo)
        }
        
        // Crear celdas de datos (excepto "Imagen")
        headers.forEach(header => {
            if (header !== "Imagen") {
                var cell = document.createElement('td');
                cell.textContent = rowData[header];
                
                // Alinear celdas dependiendo de la propiedad
                if (header !== "Nombre") {
                    cell.className = 'text-right'; // Alinear a la derecha si no es el nombre
                } else {
                    cell.className = 'text-left'; // Alinear a la izquierda si es el nombre
                }
                
                row.appendChild(cell);
            }
        });

        table.appendChild(row);
    });

    sheetDiv.appendChild(table);
    dataDiv.appendChild(sheetDiv);
});



}

