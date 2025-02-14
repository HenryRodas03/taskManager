<h1 style="color: #007acc;">📌 TaskManager Angular</h1>

Esta aplicación es un administrador de tareas creado con la versión 18.2.11 de [Angular CLI](https://github.com/angular/angular-cli), en el cual el usuario puede crear, editar, eliminar, buscar y aplicar diversos filtros para gestionar las tareas de manera más eficiente.

## ⚙️ Requisitos previos
Estas son las tecnologias que debe tener ya instaladas y configuradas en su computador para ejecutar este proyecto

| Tecnologia | Version | 
| ---------- | ----- |
| Node.js  | v22.13.1 |
| Angular CLI | >= v18.2.11 |
| NPM | v10.9.2 |


## 🚀 Instalación y ejecución
Para ejecutar el proyecto, primero hay que clonarlo con el comando `git clone`. Luego, se abre en el editor de código de preferencia y, desde una terminal dentro del proyecto, se ejecuta el siguiente comando:

```
npm install
```
Hay que esperar a que se complete la instalación de los node_modules. Una vez finalizada, se puede iniciar la aplicación con:

```
ng serve --open
```

Lo que abrirá automáticamente el navegador y permitirá usarla.

## 📦 Librerías utilizadas

| Librería | Version | 
| ---------- | ----- |
| sweetalert2 | >= v11.16.0 |
| tailwindcss | >= v3.4.17 |

## 📂 Estructura del proyecto

📦 task-manager  
 ┣ 📂 src  
 ┃ ┣ 📂 app  
 ┃ ┃ ┣ 📂 components  
 ┃ ┃ ┣ 📂 guards  
 ┃ ┃ ┣ 📂 services  
 ┃ ┃ ┣ 📂 login  
 ┃ ┃ ┣ 📂 task-list  
 ┃ ┃ ┗ 📜 app.config.ts  
 ┃ ┣ 📜 index.html  
 ┃ ┣ 📜 styles.css  
 ┗ 📜 angular.json
