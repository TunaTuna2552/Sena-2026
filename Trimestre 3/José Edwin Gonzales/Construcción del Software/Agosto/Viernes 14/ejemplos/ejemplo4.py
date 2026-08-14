class PerfilSocial:
    pass

perfil_1 = PerfilSocial()
perfil_2 = PerfilSocial()
perfil_3 = PerfilSocial()

#Asignacion manual de atributos
perfil_1.username = "@dev_coder"
perfil_1.seguidores = 15000
perfil_1.verificado = True

perfil_2.username = "@gamer_99"
perfil_2.seguidores = 3200
perfil_2.verificado = False

perfil_3.username = "@tech_new"
perfil_3.seguidores = 85000
perfil_3.verificado = True

#Filtrar e imprimir solo los perfiles veificados
lista_perfiles = [perfil_1, perfil_2, perfil_3]
print("====== USUARIOS VERIFICADOS ======")
for perfil in lista_perfiles:
    if perfil.verificado:
        print(f"El usuario {perfil.username} está verificado ({perfil.seguidores})")
