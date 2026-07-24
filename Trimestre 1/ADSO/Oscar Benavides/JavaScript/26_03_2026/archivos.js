// const papaya = require('prompts')

import prompts from 'prompts'
import { mostrarAlumno, guardar,actualizar, borrar} from './alumno.js';
import * as fs from "fs"


const preguntas = [
    {
            type : "number",
            name : "continuar",
            message : "Digite la opcion"
    },
    /* {
            type : "text",
            name : "direccion",
            message : "Escriba su direccion"
    } */
]

let ejecutar = true

while (ejecutar) {
    
try {
    console.log("======MENU PRINCIPAL=========");
    console.log("1. Leer");
    console.log("2. Guardar");
    console.log("3. Actualizar");
    console.log("4. Borrar");
    console.log("5. salir");
    const res = await prompts(preguntas)
    // console.log(res.continuar);
    switch(res.continuar){
        case 1:
            fs.readFile("archivo.txt",'utf-8',(err,data)=>{
                if (err) {
                    console.log(err + "Error al leer el archivo");
                }else{
                    console.log(data);
                }
            }
            );
            //setTimeout(()=>{mostrarAlumno()},2000)
            //console.log("Leer archivo");
        break;
        case 2:
            guardar()
            //setTimeout(()=>{guardar()},2000)
        break;
        case 3:
            actualizar()
            //setTimeout(()=>{actualizar()},2000)
        break;
        case 4:
            borrar()
            //setTimeout(()=>{borrar()},2000)
        break;
        case 5:
            console.log("Ha salido de la aplicacion");
            ejecutar = false;
        break;
        default:
            console.log("Este valor no existe... Digite uno valido..");
    }

}catch(error){
    console.log(error + "Error al ingresar el campo...");
}
}