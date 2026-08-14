class AmbienteFormacion:
    pass

#Instancia
ambiente_adso = AmbienteFormacion()
ambiente_redes = AmbienteFormacion()

#Asignacion de atributos a los ambientes de ADSo
ambiente_adso.numero_ambientes = 302
ambiente_adso.capacidad = 35
ambiente_adso. tiene_aire = True

ambiente_redes.numero_ambientes = 104
ambiente_redes.capacidad = 25
ambiente_redes. tiene_aire = False

#Comparacion de capacidades de consola
print("====== COMPARACION DE AMBIENTES DE SENA ======")
if ambiente_adso.capacidad > ambiente_redes. capacidad:
    print(f"El ambiente {ambiente_adso.numero_ambientes} tiene mayor capacidad"
        f"({ambiente_adso.capacidad} aprendices) que el ambiente {ambiente_redes.numero_ambientes}"
        f"({ambiente_redes.capacidad} aprendices)."
        )
else:
    print(
        f"E1 ambiente {ambiente_redes.numero_ambientes} tiene igual o mayor capacidad "
        f"que el ambiente {ambiente_adso.numero_ambientes}."
    )