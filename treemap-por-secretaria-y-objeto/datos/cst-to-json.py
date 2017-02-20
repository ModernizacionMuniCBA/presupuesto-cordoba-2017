"""
Transformar los CSV en varios JSON compatibles con el _Zoomable Treemap_ para diferentes gráficos.
"""

p17finalidad = "presupuesto-2017-por-finalidad-y-funcion.csv"
p17objeto = "presupuesto-2017-por-objeto-del-gasto.csv"

import csv
import json

fjson = []  # json final


with open(p17objeto) as csvfile:
    """ 
    Este archivo describe el presupuesto por objeto del Gasto y tienen un primer campo
    _Nivel_ que define la estructura jerárquica de los datos
    """
    reader = csv.DictReader(csvfile, delimiter=';', quotechar='"')
    
    """
    ['Nivel', 'Nombre', 
    'SCRETARIA DE ECONOMIA Y FINANZAS', 'SECRETARIA DE CULTURA', 'SECRETARIA DE SERVICIOS PUBLICOS',
    'SECRETARIA DE GOBIERNOS, PARTICIPACION CIUDADANA Y\nDESARROLLO SOCIAL', 'SECRETARIA DE EDUCACION',
    'TRIBUNAL DE CUENTAS', 'SECRETARIA DE SALUD', 'TOTAL', 'CONCEJO DELIBERANTE', 'DEPARTAMENTO EJECUTIVO',
    'SECRETARIA GENERAL', 'SECRETARIA DE MODERNIZACION, COMUNICACION Y DESARROLLO ESTRATEGICO', 
    'ADMINISTRACION GENERAL DE LA JUSTICIA ADMINISTRATIVA\nMUNICIPAL DE FALTAS',
    'SECRETARIA DE PLANEAMIENTO E INFRAESTRUCTURA', 'SECRETARIA DE CONTROL, FISCALIZACION Y CONVIVENCIA CIUDADANA']
    """

    detalle = {}  # detalle de la linea actual dentro de la estructura
    for row in reader:
        
        nivel = None if row['Nivel'] == "" else int(row['Nivel'])
        
        if nivel is not None:
            nombre = row["Nombre"].strip()
            if nombre.split()[0].isnumeric():
                nombre = " ".join(nombre.split()[1:])
            detalle[nivel] = nombre
            
            if nivel == 3:
                # iterar por todas las secretarías para tomar los datos
                for k in row.keys():
                    if k in ["Nivel", "Nombre", "Total"]:
                        continue
                    value = 0 if row[k] == "" else int(row[k])
                    linea = {"key": detalle[3], "region": k , "subregion": detalle[2], "value": value}
                    fjson.append(linea)

f = open("presupuesto-por-secretarias-por-objeto.json", "w")
f.write(json.dumps(fjson, indent=4, sort_keys=True))
f.close()


