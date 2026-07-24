//fs.openFile("file.txt","r","utf-8",()=>{})
//Lo que va después de la coma se llama flag y es lo que me indica para que quiero abrir el archivo
//"r" Read
//"w" Write - Busca el archivo y si no lo encuentra, lo crea. Si el archivo existe, lo borra y lo crea con la información nueva
//"a" append - Si busca el archivo y no lo encuentra bota error, si lo encuentra,adiciona información
//Entre estos 3 hay diversas combinaciones
//"r+" = rw
//"w+" = Busca el archivo, si no existe lo crea, y si existe, adiciona la información
//"a+" = Adicionar y escribir 

//promise es una funcion asyn que lleva un nombre y que retorna 3 valores: pending, reject y resolve 

/*async function nombre() {

}

await nombre().then(/*Se ejecuta una función)//Cuando sale bien o lo acepta
.catch(/*Se ejecuta una función)//Cuando hay error
.finally()//Se ejecuta si o si, independientemente del resolve o del reject
*/



import * as fs from "fs"; // IMPORTANTE: Sin esto, guardarDato no funciona

function mostrarAlumno() {
    var alumno = "El alumno es visualizado";
    console.log(alumno);
}

function guardar() {
    console.log("El alumno ha sido guardado");
}

function actualizar() {
    console.log("El alumno ha sido actualizado");
}

function borrar() {
    console.log("El alumno ha sido borrado");
}

async function example() {
    try {
        const data = await fs.readFile(
            'file.txt',
            'utf8',
            (err, data)=>{
                if(err){
                    console.log(err + "Error al leer el archivo");
                }else{
                    console.log(data);
                }
            }
        )
    } catch (err) {
        console.log(err)
    }
}

//Función corregida para que el texto se vea ordenado y con saltos de línea, además de que el JSON se vea con sangrías

function guardarDato(empleado) {
    let contenido = "Linea de ejemplo para guardar";

    let info = contenido + "\n" + JSON.stringify(empleado);

    fs.writeFile(
        "file.txt",
        info,
        { encoding: 'utf-8', flag: 'w' },
        (err) => {
            if (err) {
                console.log("Error al escribir el archivo: " + err);
            } 
        }
    );
    var dato = "Archivo creado con éxito";
    return dato;
}



function exp() {

fs.readFile("file.txt",'utf-8',(err,data)=>{
    if (err) {
        console.log(err + "Error al leer el archivo");
    }else{
        console.log(data);
    }
});
}

function borrarArchivo(nomArchivo) {
   // fs.unlink(nomFile);
    fs.stat(nomArchivo, (err) => {
        if (err == null) {
            fs.writeFile( nomArchivo, "", {flag:"w"},
                (err) => {
                    if (err) {
                        console.log("Error al borrar el archivo: " + err);
                    } 
                }
            ); 
            console.log("El archivo se ha borrado");
        }//fin de if
        else{
            console.log("No existe");
        }//fin del else
    });//fin del stat
}//fin de a función borrar archivo

function validar(nomArchivo) {
    fs.stat(nomArchivo, (err) => {
        if (err == null) {
            console.log("El archivo existe");
        }
            else{
                console.log("El archivo no existe");
            }
        }
    )
}

function agregar(nomArchivo, texto) {
    let datos = JSON.stringify(texto)
    fs.stat(nomArchivo, (err) => {
        if (err == null)
        {
            fs.writeFile(nomArchivo, "\n" + datos, {flag:"a"}, (err) => {
                    if (err) {
                        console.log("Error al actualizar el archivo: " + err);
                    } 
                })
            console.log("El empleado ha sido agregado");
        }
        else{
            console.log("El archivo no existe");
        }
    })
}

export { 
    mostrarAlumno, 
    actualizar, 
    borrar, 
    guardarDato, 
    example, 
    exp, 
    borrarArchivo, 
    validar, 
    agregar 
};
