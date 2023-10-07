import { Vehiculo, Terrestre, Aereo } from './clases.js';

document.addEventListener('DOMContentLoaded', function () {
    // Array de objetos de la jerarquía deseada
    const vehiculos = [];

    // JSON con los datos de los vehículos
    const cadenaJSON = '[{"id":14, "modelo":"Ferrari F100", "anoFab":1998, "velMax":400, "cantPue":2, "cantRue":4},{"id":51, "modelo":"Dodge Viper", "anoFab":1991, "velMax":266, "cantPue":2, "cantRue":4},{"id":67, "modelo":"Boeing CH-47 Chinook", "anoFab":1962, "velMax":302, "altMax":6, "autonomia":1200},{"id":666, "modelo":"Aprilia RSV 1000 R", "anoFab":2004, "velMax":280, "cantPue":0, "cantRue":2},{"id":872, "modelo":"Boeing 747-400", "anoFab":1989, "velMax":988, "altMax":13, "autonomia":13450},{"id":742, "modelo":"Cessna CH-1 SkyhookR", "anoFab":1953, "velMax":174, "altMax":3, "autonomia":870}]';

    // Parsear la cadena JSON en un array de objetos
    const datos = JSON.parse(cadenaJSON);

    // Agregar los objetos al array "vehiculos"
    for (const dato of datos) {
        if ('cantPue' in dato && 'cantRue' in dato) {
            // Es un vehículo terrestre
            const vehiculoTerrestre = new Terrestre(dato.id, dato.modelo, dato.anoFab, dato.velMax, dato.cantPue, dato.cantRue);
            vehiculos.push(vehiculoTerrestre);
        } else if ('altMax' in dato && 'autonomia' in dato) {
            // Es un vehículo aéreo
            const vehiculoAereo = new Aereo(dato.id, dato.modelo, dato.anoFab, dato.velMax, dato.altMax, dato.autonomia);
            vehiculos.push(vehiculoAereo);
        }
    }

    function mostrarObjetos() {
        const cuerpoTablaObjetos = document.getElementById('cuerpoTablaObjetos');
        cuerpoTablaObjetos.innerHTML = ''; // Limpia el cuerpo de la tabla antes de mostrar los objetos
    
        const filtro = document.getElementById('filtro').value; // Obtener el valor del filtro seleccionado
    
        vehiculos.forEach(function (vehiculo) {
            if (filtro === 'todos' || (filtro === 'aereo' && vehiculo instanceof Aereo) || (filtro === 'terrestre' && vehiculo instanceof Terrestre)) {
                const fila = document.createElement('tr');
    
                const idCelda = document.createElement('td');
                idCelda.textContent = vehiculo.id;
                fila.appendChild(idCelda);
    
                const modeloCelda = document.createElement('td');
                modeloCelda.textContent = vehiculo.modelo;
                fila.appendChild(modeloCelda);
    
                const anoFabCelda = document.createElement('td');
                anoFabCelda.textContent = vehiculo.anoFab;
                fila.appendChild(anoFabCelda);
    
                const velMaxCelda = document.createElement('td');
                velMaxCelda.textContent = vehiculo.velMax;
                fila.appendChild(velMaxCelda);
    
                // Verifica si el vehículo es de tipo Terrestre
                if (vehiculo instanceof Terrestre) {
                    const cantPueCelda = document.createElement('td');
                    cantPueCelda.textContent = vehiculo.cantPue;
                    fila.appendChild(cantPueCelda);
    
                    const cantRueCelda = document.createElement('td');
                    cantRueCelda.textContent = vehiculo.cantRue;
                    fila.appendChild(cantRueCelda);
    
                    // Crea celdas vacías para Altitud Máxima y Autonomía
                    const altMaxCelda = document.createElement('td');
                    altMaxCelda.textContent = '';
                    fila.appendChild(altMaxCelda);
    
                    const autonomiaCelda = document.createElement('td');
                    autonomiaCelda.textContent = '';
                    fila.appendChild(autonomiaCelda);
                }
    
                // Verifica si el vehículo es de tipo Aéreo
                if (vehiculo instanceof Aereo) {
                    // Crea celdas vacías para Cantidad de Pasajeros y Cantidad de Ruedas
                    const cantPueCelda = document.createElement('td');
                    cantPueCelda.textContent = '';
                    fila.appendChild(cantPueCelda);
    
                    const cantRueCelda = document.createElement('td');
                    cantRueCelda.textContent = '';
                    fila.appendChild(cantRueCelda);
    
                    const altMaxCelda = document.createElement('td');
                    altMaxCelda.textContent = vehiculo.altMax;
                    fila.appendChild(altMaxCelda);
    
                    const autonomiaCelda = document.createElement('td');
                    autonomiaCelda.textContent = vehiculo.autonomia;
                    fila.appendChild(autonomiaCelda);
                }
    
                cuerpoTablaObjetos.appendChild(fila);
            }
        });
    }
    // Llama a la función mostrarObjetos para mostrar los objetos en la lista
    mostrarObjetos();

    const filtroSelect = document.getElementById('filtro');
    filtroSelect.addEventListener('change', mostrarObjetos);

    
    // Función para mostrar u ocultar atributos según los checkboxes seleccionados
    function actualizarTabla() {
        const tablaObjetos = document.getElementById('tablaObjetos');
        const filas = tablaObjetos.getElementsByTagName('tr');
    
        const mostrarID = document.getElementById('mostrarID').checked;
        const mostrarModelo = document.getElementById('mostrarModelo').checked;
        const mostrarAnoFab = document.getElementById('mostrarAnoFab').checked;
        const mostrarVelMax = document.getElementById('mostrarVelMax').checked;
        const mostrarCantPue = document.getElementById('mostrarCantPue').checked;
        const mostrarCantRue = document.getElementById('mostrarCantRue').checked;
        const mostrarAltMax = document.getElementById('mostrarAltMax').checked;
        const mostrarAutonomia = document.getElementById('mostrarAutonomia').checked;
    
        // Recorremos las filas (empezamos desde 1 para omitir la fila de encabezados)
        for (let i = 1; i < filas.length; i++) {
            const celdas = filas[i].getElementsByTagName('td');
    
            // Agregamos o eliminamos la clase CSS "mantener-espacio" según corresponda
            celdas[0].classList.toggle('mantener-espacio', !mostrarID);
            celdas[1].classList.toggle('mantener-espacio', !mostrarModelo);
            celdas[2].classList.toggle('mantener-espacio', !mostrarAnoFab);
            celdas[3].classList.toggle('mantener-espacio', !mostrarVelMax);
            celdas[4].classList.toggle('mantener-espacio', !mostrarCantPue);
            celdas[5].classList.toggle('mantener-espacio', !mostrarCantRue);
            celdas[6].classList.toggle('mantener-espacio', !mostrarAltMax);
            celdas[7].classList.toggle('mantener-espacio', !mostrarAutonomia);
        }
    }
    
    
    // Agrega un event listener para el botón
    const calcularPromedioButton = document.getElementById('calcularPromedioButton');
    const promedioResultado = document.getElementById('promedioResultado');

    calcularPromedioButton.addEventListener('click', function () {
        // Calcula el promedio de la velocidad máxima
        const promedio = vehiculos.reduce(function (total, vehiculo) {
            return total + vehiculo.velMax;
        }, 0) / vehiculos.length;

        // Redondea el promedio a 2 decimales y luego asigna el resultado como texto al elemento
        promedioResultado.textContent = 'El promedio de Velocidad Máxima es: ' + promedio.toFixed(2) + 'Km/h';
    });
    


    // Agregar un event listener a cada checkbox para actualizar la tabla cuando cambien
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', actualizarTabla);
    });


    /*********************************** ABM ****************************************** */

    // Dentro de la función mostrarFormularioABMEnEdicion
    function mostrarFormularioABMEnEdicion(vehiculo) {
        const formAbm = document.getElementById('formAbm');
        const tipoVehiculoSelect = document.getElementById('tipoVehiculo');
        const idInput = document.getElementById('idInput');
        const modeloInput = document.getElementById('modeloInput');
        const anoFabInput = document.getElementById('anoFabInput');
        const velMaxInput = document.getElementById('velMaxInput');
        const cantPueInput = document.getElementById('cantPueInput');
        const cantRueInput = document.getElementById('cantRueInput');
        const altMaxInput = document.getElementById('altMaxInput');
        const autonomiaInput = document.getElementById('autonomiaInput');

        // Configura el formulario para edición si vehiculo no es nulo
        if (vehiculo) {
            tipoVehiculoSelect.value = vehiculo instanceof Terrestre ? 'Terrestre' : 'Aereo';
            idInput.value = vehiculo.id;
            modeloInput.value = vehiculo.modelo;
            anoFabInput.value = vehiculo.anoFab;
            velMaxInput.value = vehiculo.velMax;

            if (vehiculo instanceof Terrestre) {
                cantPueInput.value = vehiculo.cantPue || '';
                cantRueInput.value = vehiculo.cantRue || '';
                altMaxInput.value = '';
                autonomiaInput.value = '';
            } else if (vehiculo instanceof Aereo) {
                cantPueInput.value = '';
                cantRueInput.value = '';
                altMaxInput.value = vehiculo.altMax || '';
                autonomiaInput.value = vehiculo.autonomia || '';
            }
        } else {
            // Si vehiculo es nulo, simplemente restablece los campos del formulario
            tipoVehiculoSelect.value = 'Terrestre'; // Otra opción aquí es establecer un valor predeterminado
            idInput.value = '';
            modeloInput.value = '';
            anoFabInput.value = '';
            velMaxInput.value = '';
            cantPueInput.value = '';
            cantRueInput.value = '';
            altMaxInput.value = '';
            autonomiaInput.value = '';
        }

        // Muestra el formulario ABM
        formAbm.style.display = 'block';
    }


    //Select del ABM
    const tipoVehiculoSelect = document.getElementById('tipoVehiculo');
    const terrestreCampos = document.getElementById('terrestreCampos');
    const aereoCampos = document.getElementById('aereoCampos');

    // Configura "Terrestre" como opción predeterminada al cargar la página
    tipoVehiculoSelect.value = 'Terrestre';

    // Agrega un evento change al select
    tipoVehiculoSelect.addEventListener('change', function () {
        const seleccion = tipoVehiculoSelect.value;

        // Oculta todos los campos específicos primero
        terrestreCampos.style.display = 'none';
        aereoCampos.style.display = 'none';

        // Muestra los campos específicos según la selección
        if (seleccion === 'Terrestre') {
            terrestreCampos.style.display = 'block';
        } else if (seleccion === 'Aereo') {
            aereoCampos.style.display = 'block';
        }
    });


    /************************************ BOTONES ****************************************/
    // Botón "Agregar"
    btnAgregar.addEventListener('click', function () {
        const btnAgregar = document.getElementById('btnAgregar');
        const formAbm = document.getElementById('formAbm');
        const formDatos = document.getElementById('formDatos');
        // Mostrar el formulario de ABM al hacer clic en "Agregar"
        formAbm.style.display = 'block';
        formDatos.style.display = 'none';

        // Configura "Terrestre" como opción predeterminada al abrir el formulario
        tipoVehiculoSelect.value = 'Terrestre';

        // Muestra los campos específicos de "Terrestre" al abrir el formulario
        terrestreCampos.style.display = 'block';
        aereoCampos.style.display = 'none';
    });

    btnCancelar.addEventListener('click', function () {
        formAbm.style.display = 'none';
    });

    btnGuardar.addEventListener('click', function () {
        // Recopila los datos del formulario
        const tipoVehiculo = document.getElementById('tipoVehiculo').value;
        const id = parseInt(document.getElementById('idInput').value);
        const modelo = document.getElementById('modeloInput').value;
        const anoFab = parseInt(document.getElementById('anoFabInput').value);
        const velMax = parseInt(document.getElementById('velMaxInput').value);
        const cantPue = tipoVehiculo === 'Terrestre' ? parseInt(document.getElementById('cantPueInput').value) || null : null;
        const cantRue = tipoVehiculo === 'Terrestre' ? parseInt(document.getElementById('cantRueInput').value) || null : null;
        const altMax = tipoVehiculo === 'Aereo' ? parseInt(document.getElementById('altMaxInput').value) || null : null;
        const autonomia = tipoVehiculo === 'Aereo' ? parseInt(document.getElementById('autonomiaInput').value) || null : null;
    
        // Verifica si los datos son válidos antes de crear el vehículo
        if (isNaN(id) || isNaN(anoFab) || isNaN(velMax)) {
            alert('Por favor, ingresa valores válidos para ID, Año de Fabricación y Velocidad Máxima.');
            return;
        }
    
        // Crea el nuevo vehículo y agrégalo a la lista de vehículos
        if (tipoVehiculo === 'Terrestre') {
            const nuevoTerrestre = new Terrestre(id, modelo, anoFab, velMax, cantPue, cantRue);
            vehiculos.push(nuevoTerrestre);
        } else if (tipoVehiculo === 'Aereo') {
            const nuevoAereo = new Aereo(id, modelo, anoFab, velMax, altMax, autonomia);
            vehiculos.push(nuevoAereo);
        }
    
        // Limpia el formulario y oculta el formulario después de agregar
        formAbm.style.display = 'none';

        // Actualiza la tabla con los datos actualizados
        mostrarObjetos();
        formDatos.style.display = 'block';
    });
    
    
    /*********************************** MOD TABLA *************************************** */
    // Obtener la tabla y sus encabezados
    const tabla = document.getElementById('tablaObjetos');
    const encabezados = Array.from(tabla.querySelectorAll('th'));

    // Obtener las filas de la tabla excluyendo la primera fila (encabezados)
    const filas = Array.from(tabla.querySelectorAll('tr')).slice(1);

    // Inicializar un objeto para realizar un seguimiento del estado de orden de cada columna
    const estadoOrden = {};

    // Función para obtener el índice de columna basado en el encabezado clickeado
    function obtenerIndiceColumna(encabezado) {
    return encabezados.findIndex((header) => header === encabezado);
    }

    // Función para ordenar las filas
    function ordenarFilas(indiceColumna, orden) {
    return filas.map((fila) => fila.cells[indiceColumna].textContent)
                .map((valor, index) => ({ valor, index }))
                .sort((a, b) => {
                    if (orden === 'asc') {
                    return a.valor.localeCompare(b.valor);
                    } else {
                    return b.valor.localeCompare(a.valor);
                    }
                })
                .map((item) => filas[item.index]);
    }

    // Agregar un evento de clic a cada encabezado de columna
    encabezados.forEach((encabezado) => {
    encabezado.addEventListener('click', () => {
        // Obtener el nombre de la columna haciendo referencia al atributo "data-column" en el encabezado
        const columna = encabezado.getAttribute('data-column');

        // Verificar si la columna ya está ordenada de alguna manera
        if (!estadoOrden[columna] || estadoOrden[columna] === 'desc') {
        // Si no está ordenada o está ordenada descendente, ordenar de manera ascendente
        estadoOrden[columna] = 'asc';
        } else {
        // Si ya está ordenada ascendente, ordenar de manera descendente
        estadoOrden[columna] = 'desc';
        }

        // Ordenar las filas en base a la columna y el estado de orden
        const indiceColumna = obtenerIndiceColumna(encabezado);
        const orden = estadoOrden[columna];
        const filasOrdenadas = ordenarFilas(indiceColumna, orden);

        // Eliminar todas las filas de la tabla, excepto la primera fila (encabezados)
        while (tabla.rows.length > 1) {
        tabla.deleteRow(1);
        }

        // Agregar las filas ordenadas de nuevo a la tabla
        filasOrdenadas.forEach((fila) => tabla.appendChild(fila));
    });
    });



});


