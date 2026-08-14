class Libro:
    def __init__(self, titulo, autor, paginas, disponible = True):
        self.titulo = titulo
        self.autor = autor
        self.paginas = paginas
        self.disponible = disponible


libro1 = Libro("Idigno de ser humano", "Ozamu Dazai", "240")
libro2 = Libro("La Odisea ", "Homero (presuntamente)", "450", False)
libro3 = Libro("La casa de la hojas", "Mark Z. Danielewski ", "736")

lista_libros = [libro1, libro2, libro3]

for libro in lista_libros:
    if libro.disponible == True:
        print(f"El libro {libro.titulo} se encuentra disponible")