import json
import os

ARCHIVO_DATOS = "inventario_farmacia.json"


class Medicamento:
    """Clase modelo que representa un producto farmacéutico."""

    def __init__(
        self,
        codigo: str,
        nombre: str,
        categoria: str,
        laboratorio: str,
        precio_unitario: float,
        cantidad: int,
        requiere_receta: str,
        lote: str,
    ):
        self.codigo = codigo
        self.nombre = nombre
        self.categoria = categoria
        self.laboratorio = laboratorio
        self.precio_unitario = precio_unitario
        self.cantidad = cantidad
        self.requiere_receta = requiere_receta
        self.lote = lote

    def a_diccionario(self) -> dict:
        """Convierte los atributos de la instancia en un diccionario con llaves snake_case."""
        return {
            "codigo": self.codigo,
            "nombre": self.nombre,
            "categoria": self.categoria,
            "laboratorio": self.laboratorio,
            "precio_unitario": self.precio_unitario,
            "cantidad": self.cantidad,
            "requiere_receta": self.requiere_receta,
            "lote": self.lote,
        }


def cargar_inventario() -> list:
    """Lee y deserializa el inventario desde el archivo JSON con control de excepciones."""
    if not os.path.exists(ARCHIVO_DATOS):
        return []

    try:
        with open(ARCHIVO_DATOS, "r", encoding="utf-8") as archivo:
            return json.load(archivo)
    except (FileNotFoundError, json.JSONDecodeError):
        return []


def guardar_inventario(inventario: list) -> None:
    """Serializa y guarda la lista de medicamentos en el archivo JSON con sangría de 4 espacios."""
    with open(ARCHIVO_DATOS, "w", encoding="utf-8") as archivo:
        json.dump(inventario, archivo, indent=4, ensure_ascii=False)


def registrar_medicamento(inventario: list) -> None:
    """Solicita los 8 campos obligatorios por consola aplicando validaciones y persistencia."""
    print("\n--- REGISTRO DE NUEVO MEDICAMENTO ---")

    # Validación de código único
    while True:
        codigo = input("Ingrese código único: ").strip()
        if not codigo:
            print("El código no puede estar vacío.")
            continue

        codigo_existente = any(med["codigo"] == codigo for med in inventario)
        if codigo_existente:
            print(f"Error: Ya existe un medicamento con el código '{codigo}'. Ingrese uno diferente.")
        else:
            break

    nombre = input("Ingrese nombre comercial o principio activo: ").strip()
    categoria = input("Ingrese categoría (ej: Analgésicos, Antibióticos): ").strip()
    laboratorio = input("Ingrese laboratorio (ej: Bayer, Genfar, Pfizer): ").strip()

    # Validación de precio unitario decimal
    while True:
        try:
            precio_unitario = float(input("Ingrese precio unitario (COP): "))
            if precio_unitario <= 0:
                print("El precio debe ser un número positivo.")
                continue
            break
        except ValueError:
            print("Dato inválido: Ingrese un valor numérico decimal para el precio.")

    # Validación de cantidad entera
    while True:
        try:
            cantidad = int(input("Ingrese cantidad disponible en inventario: "))
            if cantidad < 0:
                print("La cantidad no puede ser negativa.")
                continue
            break
        except ValueError:
            print("Dato inválido: Ingrese un número entero para la cantidad.")

    # Validación de requerimiento de receta
    while True:
        receta_input = input("¿Requiere fórmula médica? (SI / NO): ").strip().upper()
        if receta_input in ["SI", "NO"]:
            requiere_receta = receta_input
            break
        print("Opción inválida. Ingrese únicamente 'SI' o 'NO'.")

    lote = input("Ingrese código de lote de producción: ").strip()

    # Instanciación y persistencia
    nuevo_medicamento = Medicamento(
        codigo=codigo,
        nombre=nombre,
        categoria=categoria,
        laboratorio=laboratorio,
        precio_unitario=precio_unitario,
        cantidad=cantidad,
        requiere_receta=requiere_receta,
        lote=lote,
    )

    inventario.append(nuevo_medicamento.a_diccionario())
    guardar_inventario(inventario)
    print(f"\nMedicamento '{nombre}' registrado y guardado con éxito.")


def listar_medicamentos(inventario: list) -> None:
    """Muestra los medicamentos almacenados en formato de tabla alineada."""
    print("\n--- INVENTARIO DE MEDICAMENTOS (FarmaSENA) ---")
    if not inventario:
        print("El inventario se encuentra actualmente vacío.")
        return

    cabecera = (
        f"{'CÓDIGO':<10} | {'NOMBRE':<22} | {'CATEGORÍA':<16} | "
        f"{'LABORATORIO':<14} | {'PRECIO':<12} | {'CANT.':<6} | {'RECETA':<7} | {'LOTE':<12}"
    )
    separador = "-" * len(cabecera)

    print(separador)
    print(cabecera)
    print(separador)

    for med in inventario:
        precio_fmt = f"${med['precio_unitario']:,.2f}"
        print(
            f"{med['codigo']:<10} | "
            f"{med['nombre'][:20]:<22} | "
            f"{med['categoria'][:14]:<16} | "
            f"{med['laboratorio'][:12]:<14} | "
            f"{precio_fmt:<12} | "
            f"{med['cantidad']:<6} | "
            f"{med['requiere_receta']:<7} | "
            f"{med['lote']:<12}"
        )
    print(separador)


def main():
    """Bucle principal de la interfaz interactiva."""
    inventario = cargar_inventario()

    while True:
        print("\n==============================")
        print("   SISTEMA DE CONTROL FarmaSENA")
        print("==============================")
        print("1. Listar medicamentos")
        print("2. Registrar medicamento")
        print("3. Salir")

        opcion = input("Seleccione una opción (1-3): ").strip()

        if opcion == "1":
            listar_medicamentos(inventario)
        elif opcion == "2":
            registrar_medicamento(inventario)
        elif opcion == "3":
            print("\nCerrando sesión del sistema FarmaSENA. ¡Hasta luego!")
            break
        else:
            print("Opción no válida. Por favor ingrese 1, 2 o 3.")


if __name__ == "__main__":
    main()