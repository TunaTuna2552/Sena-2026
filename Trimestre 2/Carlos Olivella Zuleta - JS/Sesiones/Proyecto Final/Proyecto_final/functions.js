import readline from 'readline-sync';
import fs from 'fs';
import { componentes, marcasGenericas, datosComponentes } from './data.js';

function seleccionarOpcion(mensaje, opciones) {
    console.log(`\n${mensaje}`);
    const index = readline.keyInSelect(opciones, 'Selecciona una opcion:', { cancel: 'Ninguna/Cancelar' });
    if (index === -1) return null;
    return opciones[index];
}

export function registrarComponente() {
    const compSeleccionado = seleccionarOpcion("¿Qué componente deseas registrar?", componentes);
    if (!compSeleccionado) {
        console.log("Registro cancelado.");
        return null;
    }

    let detalle = `Componente: ${compSeleccionado}\n`;

    // 1. PROCESADORES
    if (compSeleccionado === "Procesador") {
        const datosProcesador = datosComponentes["Procesador"];
        const marca = seleccionarOpcion("Selecciona la marca del procesador:", datosProcesador.marcas);
        
        if (marca && datosProcesador[marca]) {
            const especificos = datosProcesador[marca];
            const modelo = seleccionarOpcion(`Selecciona el modelo de ${marca}:`, especificos.modelos);
            const gen = seleccionarOpcion(`Selecciona la generación de ${marca}:`, especificos.generaciones);
            
            detalle += `- Marca: ${marca}\n- Modelo: ${marca} ${modelo || 'N/A'}\n- Gen: ${gen || 'N/A'}\n`;
        } else {
            detalle += `- Marca: No especificada\n`;
        }

    // 2. TARJETAS GRÁFICAS
    } else if (compSeleccionado === "Tarjeta gráfica") {
        const datosGrafica = datosComponentes["Tarjeta gráfica"];
        const marca = seleccionarOpcion("Selecciona la marca de la tarjeta gráfica:", datosGrafica.marcas);
        
        if (marca && datosGrafica[marca]) {
            const especificos = datosGrafica[marca];
            const modelo = seleccionarOpcion(`Selecciona la serie/modelo de ${marca}:`, especificos.modelos);
            const version = seleccionarOpcion(`Selecciona la versión de ${marca}:`, especificos.versiones);
            
            detalle += `- Marca: ${marca}\n- Modelo: ${modelo || 'N/A'}\n- Versión: ${version || 'N/A'}\n`;
        } else {
            detalle += `- Marca: No especificada\n`;
        }

    // 3. CABLES
    } else if (compSeleccionado === "Cables") {
        const datosCables = datosComponentes["Cables"];
        const marca = seleccionarOpcion("Selecciona la marca del cable:", datosCables.marcas);
        const conexion = seleccionarOpcion("Selecciona el tipo de conexión:", datosCables.conexiones);
        const longitud = readline.question("Introduce la longitud del cable (ej. 1m, 2m): ");
        
        detalle += `- Marca: ${marca || 'N/A'}\n- Conexión: ${conexion || 'N/A'}\n- Longitud: ${longitud || 'No especificada'}\n`;

    // 4. ADAPTADORES Y HUBS
    } else if (compSeleccionado === "Adaptadores") {
        const datosAdaptador = datosComponentes["Adaptadores"];
        const marca = seleccionarOpcion("Selecciona la marca del adaptador/HUB:", datosAdaptador.marcas);
        const tipoCategoria = seleccionarOpcion("¿Qué tipo de dispositivo es?", datosAdaptador.tipos);
        let especificacion = "";

        if (tipoCategoria && datosAdaptador[tipoCategoria]) {
            especificacion = seleccionarOpcion(`Selecciona la configuración del ${tipoCategoria}:`, datosAdaptador[tipoCategoria]);
        }

        detalle += `- Marca: ${marca || 'N/A'}\n- Categoría: ${tipoCategoria || 'N/A'}\n- Especificación: ${especificacion || 'N/A'}\n`;

    // 5. ALMACENAMIENTO
    } else if (compSeleccionado === "Almacenamiento") {
        const datos = datosComponentes["Almacenamiento"];
        const marca = seleccionarOpcion("Selecciona la marca:", datos.marcas);
        const tipo = seleccionarOpcion("Selecciona el tipo de almacenamiento:", datos.tipos);
        
        detalle += `- Marca: ${marca || 'N/A'}\n- Tipo: ${tipo || 'N/A'}\n`;
        
        if (tipo === "RAM") {
            const capacidad = readline.question("Introduce la capacidad de la memoria RAM (ej. 16GB): ");
            detalle += `- Capacidad: ${capacidad}\n`;
        } else if (tipo === "ROM") {
            const subTipo = seleccionarOpcion("Selecciona el tipo de disco:", ["Disco Duro (HDD)", "Unidad de Estado Sólido (SSD)"]);
            detalle += `- Subtipo: ${subTipo || 'N/A'}\n`;
            
            if (subTipo === "Unidad de Estado Sólido (SSD)") {
                const tecnologia = seleccionarOpcion("Selecciona la tecnología del SSD:", ["SATA", "NVMe"]);
                detalle += `- Tecnología SSD: ${tecnologia || 'N/A'}\n`;
            }
        }

    // 6. FUENTES, AUDÍFONOS, MICRÓFONOS
    } else if (datosComponentes[compSeleccionado]) {
        const datos = datosComponentes[compSeleccionado];
        const marca = seleccionarOpcion("Selecciona la marca:", datos.marcas);
        
        let propiedadExtra = "";
        if (datos.tipos) propiedadExtra = seleccionarOpcion("Selecciona el tipo:", datos.tipos);
        if (datos.intervalosVatios) propiedadExtra = seleccionarOpcion("Selecciona el rango de vatios:", datos.intervalosVatios);
        
        detalle += `- Marca: ${marca || 'N/A'}\n`;
        if (propiedadExtra) detalle += `- Clasificación: ${propiedadExtra}\n`;

    // 7. COMPONENTES GENÉRICOS (Mouse, Teclado, Chasis, etc.)
    } else {
        const marca = seleccionarOpcion("Selecciona la marca:", marcasGenericas) || readline.question("Introduce la marca manualmente: ");
        const modelo = readline.question("Introduce el modelo o descripción corta: ");
        
        detalle += `- Marca: ${marca}\n- Detalle: ${modelo}\n`;
    }

    console.log("\n¡Componente registrado exitosamente en la lista temporal!");
    return detalle;
}

export function guardarEnArchivo(listaRegistros) {
    if (listaRegistros.length === 0) {
        console.log("No hay registros para guardar.");
        return;
    }

    let contenidoArchivo = "=== REPORTE DE COMPONENTES REGISTRADOS ===\n\n";
    listaRegistros.forEach((registro, index) => {
        contenidoArchivo += `--- Registro #${index + 1} ---\n${registro}\n`;
    });

    try {
        fs.writeFileSync('componentes_registrados.txt', contenidoArchivo, 'utf-8');
        console.log("\n[Éxito] Se ha creado el archivo 'componentes_registrados.txt' con todos tus registros.");
    } catch (error) {
        console.error("Hubo un error al crear el archivo:", error);
    }
}