//const fs = require('fs');
import * as fs from "fs"

fs.readFile("archivo.txt",'utf-8',(err,data)=>{
    if (err) {
        console.log(err + "Error al leer el archivo");
    }else{
        console.log(data);
    }
}
);