class Contenedor {
    constructor() {
        this.datos = []
    }
getAll() {
    return this.datos;
}

//Obtener ID del item
getId (items) {
    const proximoId = items[items.length - 1].id + 1;
    return proximoId;
}

//Obtener un item por su ID
getById(id) {
    const item = this.datos.find((x => x.id === id));
    if(!item) {
        const error = new Error('Producto no encontrado')
        throw error;
    }
    return item;
}

//Agregar un item
addItem(item) {
    item.id = this.getId(this.datos);
    this.datos.push(item);
}

//Actualizar un item (se utilizará para método PUT)
updateItem(id, newDatos) {
    if(!newDatos.title || !newDatos.price || !newDatos.thumbnail) {
    const error = new Error('Ingrese la totalidad de los datos requeridos.')
    throw error;
    }
    const item = this.getById(id);
        for (let x in item) {
        if (x !== "id") item[x] = newDatos[x];
    }
}

//Eliminar un item por su id (se utilizará para método DELETE)
deleteItem(id) {
    this.datos.filter((item) => item.id !== id);
}
}

const productos = new Contenedor();

productos.datos = [
    {"title":"Harina","price":"150","thumbnail":"img3.jpg","id":1},
    {"title":"Maicena","price":"120","thumbnail":"img4.jpg","id":2},
    {"title":"Chocolate","price":"180","thumbnail":"img5.jpg","id":3},
    {"title":"Edulcorante","price":"220","thumbnail":"img8.jpg","id":4},
    {"title":"Maiz","price":"80","thumbnail":"img10.jpg","id":5}
]

module.exports = productos