//const fs = require('fs');
import * as fs from "fs"

fs.readFile("file.txt",'utf-8',(err,data)=>{
    if (err) {
        console.log(err + "Error al leer el archivo");
    }else{
        console.log(data);
    }
}
);

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
import * as fs from 'fs'
//const fs = require('fs/promises')

function exp() {

fs.readFile("file.txt",'utf-8',(err,data)=>{
    if (err) {
        console.log(err + "Error al leer el archivo");
    }else{
        console.log(data);
    }
});
}

export { exp }