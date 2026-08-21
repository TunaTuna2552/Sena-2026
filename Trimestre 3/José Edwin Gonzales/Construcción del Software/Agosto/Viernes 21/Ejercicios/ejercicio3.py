# Actividad 3: El perfil Multimedia (Herencia Multiple)

class Texto:

    def redactar_post(self):
        print("Hola mundo")



class Imagen:

    def aplicar_filtro(self):
        print("Aplicando filtro a la imagen")

class Audio:

    def ajustar_volumen(self):
        print("Ajustando el vvolumen")


class PublicacionInstagram(Texto, Imagen, Audio):
    def __del__(self):
        print("Publicación archivada")

publicacion = PublicacionInstagram()
print(publicacion.redactar_post())
print(publicacion.aplicar_filtro())
print(publicacion.ajustar_volumen())