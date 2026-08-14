class Servidor:
    pass

#Instancia
servidor_principal = Servidor()
servidor_backup = Servidor()

#Asignar atributos
servidor_principal.estado = "Activo"
servidor_backup. estado = "Matenimiento"

#Demostracion de independencias de memoria y valores
print("====== ESTADO DE LOS SERVIDORES ======")
print(
    f"Principal: estado = {servidor_principal.estado} | Ubicacion en memoria = {hex(id(servidor_principal))}")
print(
    f"Backup: estado = {servidor_backup.estado} | Ubicacion de memoria = {hex(id(servidor_backup))}")

print("\n ====== CONCLUSION TECNICA ======")
print("Ambos objetos pertenecen a la misma clase 'Servidor")
print("pero al tener direcciones distintas en la memoria RAM")
print("modificar uno No afecta en absoluto el estado del otro")