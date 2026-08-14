#Defnición de la clase siguiendo la convención de PascalCase
class UsuarioSistema:
    pass

#Instancia con dos objetos
usuario_admin = UsuarioSistema()
usuario_invitado = UsuarioSistema()

#Asignación manual de atributos
usuario_admin.nickname = "Admin_root"
usuario_admin.rol = "Administrador"

usuario_invitado.nickname = "Aprendiz_2026"
usuario_invitado.rol = "Invitado"

#Impresión e inspección de los ID de memoria con id()
print("====== REGISTRO DE USUARIOS ======")
print(f"El usuario: {usuario_admin.nickname} tiene el rol de {usuario_admin.rol} con Id de memoria: {id(usuario_admin)}")

print(f"El usuario: {usuario_invitado.nickname} tiene el rol de {usuario_invitado.rol} con Id de memoria: {id(usuario_invitado)}")
