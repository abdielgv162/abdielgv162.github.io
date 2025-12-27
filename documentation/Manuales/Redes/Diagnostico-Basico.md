---
layout: note
title: Diagnóstico básico de red 🌐
section: documentation
category: redes
cover: /assets/images/notes/redes/diagnostico-red/cover.webp
---




---

## 1. Validar configuración del adaptador de red

Este comando nos muestra la configuración de red TCP/IP de la computadora, mostrándonos información relevante como dirección IP, máscara de subred, puerta de enlace predetermianda, entre otros.

**Principalmente podemos utilizar el siguiente comando para mostrar información de la configuración y direcciones MAC del equipo.** 

```cmd 

ipconfig
ipconfig /all
```


Aqui debemos de revisar que lo siguiente sea correcto:

- Dirección IP correcta, dentro de un rango válido.
- Gateway definido correctamente
- DNS correctos
- DHCP o IP fija según el caso
- Cable de red funcionando correctamente
- Tarjeta de red linkeando
- Uso de DHCP correcto o IP fija

En esta etapa, los principales errores se deben a una IP estática mal configurada, un adaptador virtual tomando prioridad, VPN encendida, VLAN erronea, etc.


### 1.2 Probar Enlace Local

La puerta de enlace nos permite establecer comunicación entre dos redes diferentes, actuando como traductor de protocolos entre redes de distintas arquitecturas. Es un punto de entrada y salida crucial.

Hacer un ping a la puerta de enlace o router, nos permite diagnósticar la conectividad básica entre nuestro dispositivo y la red local. De manera que podemos confirmar si el router está activo y respondiendo, además de que podemos obtener una medida del tiempo de respuesta o pérdida de paquetes.

```cmd

ping <IP_gateway>
```
**Si no responde, puede deberse a problemas del cable/wifi, VLAN incorrecta, firewall, gategay caído, mala configuración del adaptador de red.**

---

## 2. Validar conectividad básica del equipo

Para continuar con la revisión, podemos probar la pila de red TCP/IP. Podemos usar 127.0.0.1 que es la llamada **dirección de loopback o localhost**, que se refiere a nuestro propio equipo. 

Esto nos permite validar el stack TCP/IP del sistema operativo y la comunicación interna del kernel de red.


```cmd

ping 127.0.0.1

ping localhost

ping IP_del_equipo
```

**En caso de que llegue a fallar, el problema está en la propia configuración interna del equipo o es un error con nuestro adaptador de red, no en la conexión a internet.**

---

## 3. Probar DNS

Una vez que ya validamos la IP y gateway, podemos realizar una prueba de DNS.

Esto nos permite verificar la resolución de nombres, es decir, si se están convirtiendo correctamente los nombres de un dominio en direcciones IP.

Podemos realizar la siguiente prueba, en donde tendría que resolver el dominio google.com por su IP correspondiente.

```cmd

ping google.com
```


O también podemos usar la herramienta nslookup:

```cmd

nslookup google.com
```

incluso, podemos forzar a que resuelva el nombre usando un DNS específico, por ejemplo:

```cmd

nslookup google.com 192.168.1.X
```

Esto es útil cuando sí tenemos internet, pero no nos carga un sitio o cuando podemos alcanzar un sitio por IP, pero no por su nombre de dominio.

 También resulta útil para diagnósticar cuando presentamos lentitud al abrir páginas.


### 3.1 Borrar caché DNS

Podemos visualizar y limpiar el caché DNS con los siguientes comandos. Útil cuando un sitio cambió de IP o hay errores de intermitencia:

```cmd

# Mostrar
ipconfig /displaydns

# Eliminar
ipconfig /flushdns

```

---

## 4. Traza de red

Una traza de red es una herramienta de diagnóstico que nos muestra el “camino” que siguen los paquetes enviados desde un punto hasta su destino, permitiéndonos visualizar cada “paso” que dan hacia su destino.

```cmd

tracert google.com 
tracert 192.168.X.X
```

En la salida veremos algo similar a esto:

```cmd

 1  192.168.1.1     1 ms   1 ms   1 ms
 2  10.20.0.1       5 ms   6 ms   5 ms
 3  200.33.xx.1    15 ms  14 ms  16 ms
 4  *  *  *
 5  8.8.8.8        20 ms  19 ms  21 ms
```

En donde nos muestra el número de salto, seguido de la IP o Hostname que respondió seguido de la latencia (en este caso, de 3 intentos). 
Cuando vemos los símbolos `* * *` significa que el router no está respondiendo al protocolo `ICMP/UDP`. **Podría indicar una falla, pero no necesariamente**.

Las trazas nos permiten detectar en que parte presentamos un problema de comunicación. Descartando fallos en la red local, en el ISP o congestión de la red.

Si hay fallas en los saltos iniciales, puede indicar problemas con la red local o gateway. En saltos intermedios, podría indicar problemas con firewall/WAN. Y en saltos finales con latencia alta, podría indica problemas de enlace o congestión.


### 4.1 Pathping

Esta es una opción más completa que nos muestra la pérdida de paquetes por salto y estadísticas.

```cmd

pathping oracle-servidor.midominio.local
```


### 4.2 Latencia estimada


<div class="table-wrapper">
  <table class="data-table">
    <thead>
      <tr>
        <th>Tipo</th>
        <th>Latencia Esperada</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>LAN</td>
        <td>&lt; 1 ms</td>
      </tr>
      <tr>
        <td>ISP Local</td>
        <td>5 – 20 ms</td>
      </tr>
      <tr>
        <td>Conexiones internacionales</td>
        <td>30 – 150 ms</td>
      </tr>
    </tbody>
  </table>
</div>

---

## 5. Probar conectividad por un puerto

Este comando de PowerShell nos permite realizar un diagnóstico de conectividad. A diferencia de ping o tracert, aqui podemos validar los DNS, ruta, puertos TCP específicos y el origen de la falla. Haciendo una sola ejecución.

```powershell

Test-NetConnection IP -Port PUERTO
```

Sintaxis del comando

```powershell

Test-NetConnection <host> [-Port <puerto>] [-InformationLevel <nivel>]
```

Si obtenemos una salida True, nuestra red y firewall están OK. En caso contrario, podría haber puertos bloqueados o servicios caídos.


### 5.1 Obtener vista detallada


```powershell

Test-NetConnection servidor -Port 443 -InformationLevel Detailed
```


### 5.2 Probar múltiples puertos

```powershell

1521,443,80,3389 | % {
  Test-NetConnection oracle-servidor.midominio.local -Port $_ -WarningAction SilentlyContinue
}
```

---


## 6. Limpiar y renovar configuración (útil en DHCP)

```bash

ipconfig /release
ipconfig /renew
ipconfig /flushdns
```

1. `/release` : “Libera” la IP que tiene actualmente el equipo, dejándolo sin IP. Esto hace que el servidor DHCP vea la IP como disponible y la NIC del equipo queda sin configuración de IP.
Es muy útil en casos de IP duplicada o cuando se presentan errores por cambio de VLAN.
2. `/renew` : Solicita una nueva IP al servidor DHCP. Útil despues de un /release , pues necesitamos que se asigne una IP.
3. `/flushdns` : Borra el caché DNS local, sin cambiar IP ni Puerta de Enlace. Elimina las entradas DNS cahceadas, útil cuando un dominio cambia de IP o hay problemas de intermitencia con sitios web.

---

## 7. Caché ARP

ARP permite que una IP se convierta en una MAC dentro de la red local, permitiendo la comunicación en LAN.

Es decir, en la comunicación le indica que MAC address está relacionada a determinada IP para que pueda “responder”:

```powershell

192.168.1.1 → 00-1A-2B-3C-4D-5E
```

### 7.1 Visualizar caché ARP

Nos muestra IP con su MAC asociada y el tipo, ya se dinámica o estática.

```bash

arp -a
```

### 7.2 Limpiar caché ARP

 Esto fuerza a redescubrir las MACs, corrigiendo IPs duplicadas, cambios en el equipo, switches reemplazados o ARP corrupto.

```powershell

arp -d *
```

---

## Diagnóstico rápido (Resumen)

```cmd 

    ipconfig /all

    ping gateway

    ping 8.8.8.8

    nslookup dominio

    tracert

    Test-NetConnection
```

---