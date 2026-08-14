class ProductoMenu:
    def __init__(self, nombre, categoria, precio_base):
        self.nombre = nombre
        self.categoria = categoria
        self.precio_base = precio_base

        self.precio_venta = (precio_base + (precio_base * 0.1))

        print(f"El primer producto es una {nombre}, su precio base es de {precio_base:,} y su precio de venta sugerido es de {self.precio_venta:,}")

producto1 = ProductoMenu("Bandeja Paisa", "Plato", 30000)
producto2 = ProductoMenu("Salchipapa", "Plato", 15000)
producto3 = ProductoMenu("Cocacola 3L", "Bebida", 7000)

