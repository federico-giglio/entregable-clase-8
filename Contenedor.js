const fs = require("fs")

class Contenedor {
    constructor(fileName) {
        this.fileName = fileName
    }
//escribimos o sobreescribimos el archivo
    async save(obj) {
        try {
            const datosGetAll = await this.getAll(); //igualo los datos con getAll para obtener los datos de lectura
            if (!datosGetAll) {
                obj.id = 1;
                await fs.promises.writeFile(`${this.fileName}`, JSON.stringify([obj]));
                console.log("Creating file...");
            } else {
                obj.id = (datosGetAll.length)+1;
                datosGetAll.push(obj); 
                /* Spread Operator: 
                datosGetAll= [
                    ...datosGetAll, 
                    obj
                ]                */
                await fs.promises.writeFile(`${this.fileName}`, JSON.stringify(datosGetAll));
                return obj.id
            }
        } catch {
            console.log("Error in function save")
        }
    }

//devolvemos el ID del producto
    async getById(id) {
        try {
            const datosGetAll = await this.getAll()
            .then(resp => resp.find(a => id == a.id ))
            return datosGetAll || null
        } catch {
            console.log("Error in function getById")
        }
    }

//llamamos a todos los productos para leerlos del archivo
    async getAll() {
        try {
            const readFs = await fs.promises.readFile(`${this.fileName}`, "utf-8");
            const arr = await JSON.parse(readFs);
            return arr
            } catch {
            console.log("Error in function getAll")
        }
    }

//randomize
    async randomize() {
        try {
            const datosGetAll = await this.getAll()
            return datosGetAll[Math.floor(Math.random()*datosGetAll.length)]
        } catch {
            console.log('error')
        }
    }

//borramos productos por ID
    async deleteById(id) {
        try {
            const datosGetAll = await this.getAll()
            .then(resp => resp.filter(a => id != a.id ));
            await fs.promises.writeFile(`${this.fileName}`, JSON.stringify(datosGetAll));
            console.log(datosGetAll)
        } catch {
            console.log("Error in function deleteById")
        }
    }

//borramos todos los productos
    async deleteAll() {
        try {
            await fs.promises.writeFile(`${this.fileName}`,"");
            console.log("Deleting file datos...");
        } catch {
            console.log("Error in function deleteAll")
        }
    }
}

const producto = new Contenedor("productos.txt")

//producto.getAll()

/*producto.save(
    {
        title:"leche",
        price:120,
        thumbnail:"img6"
    }
    )
*/
//producto.getById(2).then(resp => console.log(resp))

//producto.getById(99).then(resp => console.log(resp))

//producto.deleteById(3)

//producto.deleteAll()


module.exports = Contenedor