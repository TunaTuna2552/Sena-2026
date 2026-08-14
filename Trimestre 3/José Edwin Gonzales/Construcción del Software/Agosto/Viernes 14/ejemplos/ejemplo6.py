class ProductoTienda:
    pass

#Creamos una instancia
laptop = ProductoTienda()

#Asignacion dinamica de atributos
laptop. nombre = "laptop Gamer Pro"
laptop.precio = 3500000
laptop.stock = 8

#Calcular el total del invetario en pantalla
valor_total = laptop.precio * laptop.stock

print("====== INVENTARIOS DE PRODUCTOS ======")
print(f"Producto: {laptop.nombre}")
print(f"Precio Unitario: {laptop.precio}")
print(f"Unidades disponibles: {laptop.stock}")
print(f"Valor total del inventario: ${valor_total:,.2f}")

