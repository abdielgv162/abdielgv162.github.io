---
layout: note
title: Configuración de Git y GitHub en Linux
section: documentation
category: Linux
cover: /assets/images/notes/linux/GIT-Github/cover.webp
---

## 1. Instalar GIT 

Este comando puede cambiar dependiendo del gestor de paquetes que estemos utlizando, en el caso de Ubuntu utilizamos apt como se muestra a continuación.

En este caso vamos a actualizar nuestros paquetes y luego instalar Git.

```bash

sudo apt update && sudo apt install git
```

Podemos validar nuestra versión instalada de Git de la siguiente forma:

```bash

git --version
```

---


## 2. Configurar credenciales

Las credenciales es las información que nos permite establecer conexión con Git y GitHub

1. Creamos una cuenta en GitHub. Para ello, ingresamos al sitio web: [https://github.com/](https://github.com/).
   
2. Una vez que tengamos nuestra cuenta, obtenemos el nombre de nuestro usuario.
   
3. Volvemos a la terminal de Git y nombramos a nuestro usuario:
    
    ```bash

    git config --global user.name "nombre_de_usuario_GitHub"
    ```
    
4. Actualizamos el correo electrónico:
    
    ```bash

    git config --global user.email "email_de_la_cuenta"
    ```
    
5. Verificamos la información
    
    ```bash

    git config --list
    ```
    
### 2.1 Cambiar rama por defecto de `master` a `main`: 

```bash

    git branch -M main
    git pull origin main

```

---



## 3. Creación de llaves

En GitHub utilizamos **SSH**, principalmente para realizar una autenticación segura y sin contraseñas entre nuestro equipo local y los servidores de GitHub. Esto funciona a través de un par de lalves (pública y privada), que nos permite autentificar nuestra identidad brindando mayor seguridad y automatización para poder aplicar cambios en nuestro repositorio sin necesidad de reingersar nuestras credenciales.

1. **Creación** de **llaves** SSH usando el algoritmo **ed25519**:
    
    ```bash

    	ssh-keygen -t ed25519 -C "email_de_github"
    ```
    
2. Asignamos la ruta que nos ofrece por defecto presionando ENTER o podemos elegir una ruta alternativa.
3. Creamos una contraseña (Recomendado)
4. Ahora contaremos con nuestras llaves privadas y pública **(no compartir llave privada)**
5. Verificar servidor SSH:
    
    ```bash

    eval "$(ssh-agent -s)"
    ```
    
6. Y si todo está en orden obtenemos algo similar:
    
    ```bash

    Agent pid #####
    ```
    
7. **Agregamos** la **llave** privada **al** **servidor** SSH:
    
    ```bash

    ssh-add ~/.ssh/id_rsa
    ```
---

## 4. Enlazar llave pública a GitHub

1. En GitHub nos vamos a `settings/SSH and GPI keys`
2. En entornos gráficos nos podemos apoyar de la siguiente herramienta. Nos vamos a la terminal e instalamos `xclip` para copiar nuestra llave SSH de manera segura:
    
    ```bash

    sudo apt install xclip
    ```
    
3. Usamos la herramienta anterior para copiar la llave
    
    ```bash

    xclip -selection clipboard < ~/.ssh/id_rsa.pub
    ```
    
### 4.1 Probar conexión SSH con GitHub

Podemos utilizar el siguiente comando para validar si tenemos comunicación con GitHub via SSH

```bash

ssh -T git@github.com
```

---


## 5. Hacer primeros commits

1. Nos posicionamos en un directorio y habilitamos GIT localmente:
    
    ```bash
    
    git init
    ```
    
2. Verificamos el estado:
    
    ```bash

    git status
    ```
    
3. Añadir TODOS los archivos al repositorio local (**staging**):
    
    ```bash

    git add .
    ```
    
4. Agregar cambios al repositorio:  **Es importante que agreguemos un comentario referente a lo que hemos modificado en cada commit**, pues esto nos permite tener más información y claridad al momento de revisar nuestro histórico de cambios.
    
    ```bash

    git commit -m "comentario"
    ```
    
5. Visualizar commits:
    
    ```bash

    git log
    ```
### 5.1 Flujo completo 

Normalmente, trabajremos realizando el siguiente flujo:

```bash

git init
git status
git add .
git commit -m "Initial commit"
```

---



## 6. Conectando repositorios de GitHub con GIT local

1. Ahora, regresamos a GitHub y presionamos el botón de `new SSH key` y pegamos.
2. Creamos un **repositorio**  de **GitHub** o nos posicionamos en uno ya existente y copiamos la opción de conexión por **SSH**.
Esto nos va a copiar una ruta para conectarnos.
3. Volvemos a la terminal, nos posicionamos en la carpeta del repositorio local que queremos crear y ejecutamos lo siguiente :
    
    ```bash

    git remote add origin git@github.com:usuario/rutacopiada
    ```
    
4. Verificamos que agregamos correctamente el origen remoto:
    
    ```bash

    git remote -v
    ```
    
5. Establecemos nuestra rama principal:
    
    ```bash

    git branch -M main
    ```
    
6. Nos traemos lo ya existente en el repositorio:
    
    ```bash

    git fetch [remote-name]
    ```
    
7. Hacemos un `pull` para traer los elementos del repositorio:
    
    ```bash

    git pull origin main
    ```
    
8. Hacemos `push` para enviar los cambios
    
    ```bash

    git push origin main
    ```

---

## 7. `.gitignore`

Es un archivo de texto plano que le indica a Git que directorios o ficheros debe ignorar y no incluir en el control de versiones, manteniendo el repositorio libre de archivos inecesarios como logs, dependencias o archivos temporales. 

La creación de un `.gitignore` y su estructura es de la siguiente forma:

```bash

touch .gitignore
```

el signo `*` indica que va a ingorar TODOS los ficheros que tengan esa extensión: 

```bash

node_modules/
.env
*.log
.DS_Store

```
