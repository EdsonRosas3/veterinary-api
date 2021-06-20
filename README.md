# veterinary-api

## Rutas Funcionales
## Login POST
En esta ruta veterinario podra iniciar sesion, si la sesion es correcta responde un objeto con los datos del veterinario
### https://veterinary-api.herokuapp.com/api/auth/signin

## Register POST
En esta ruta el veterinario podra registrarse si todo va bien entonces devuelve un objeto veterinario con todos sus datos
### https://veterinary-api.herokuapp.com/api/auth/signup

## GET veterinarios
### https://veterinary-api.herokuapp.com/api/user/veterinarians

## GET veterinario
Solo obtener un veterinario es importamte pasar el  ID para obtener solo el veterinario que se quiere.
### https://veterinary-api.herokuapp.com/api/user/veterinary/:id

## PUT veterinario
Actualizar datos del veterinario es importante pasar el ID para poder actualizar los datos del veterinario.
### https://veterinary-api.herokuapp.com/api/user/veterinary/:id

## GET publicaciones pendientes
Esta ruta devuelve una lista de todas la publicaciones que aun no an sido acetadas por el superuser.
### https://veterinary-api.herokuapp.com/api/informations/pending

## PUT aseptar o rechazar publicación
El superuser podra actulizar el estado de cada publicacion "state:false" a "state:true" para que la publicacion ya se pueda publicar 
### https://veterinary-api.herokuapp.com/api/informations/answer/:id

## POST crear publicación
Esta ruta es para que el veterinario pueda crear una nueva publicacion
### https://veterinary-api.herokuapp.com/api/informations/

## DELETE
Esta ruta es para que el veterinario pueda borrar una publicacion
### https://veterinary-api.herokuapp.com/api/informations/:id

## GET una publicación
Esta ruta es para que se pueda ver una publicacion en especifico mediante el id
### https://veterinary-api.herokuapp.com/api/informations/:id

## GET publicaciones aceptadas
Esta ruta respode con una lista de todas las publicaciones aceptadas o permitidas es decir "state:true"
### https://veterinary-api.herokuapp.com/api/informations/

# REPORTE
primero debemos generar el reporte y luego podremos descargarlo o verlos en el navegador 
## GET generar reporte
Genera el reporte con los datos actuales de la base de datos
### https://veterinary-api.herokuapp.com/pdf/report/generate

## GET descargar reporte
Desgarga automatica
### https://veterinary-api.herokuapp.com/pdf/report/dowload

## GET previsualizar el reporte 
Ver el pdf en el navegador
### https://veterinary-api.herokuapp.com/pdf/report/view

## Categoria de publicaciones
## GET cuidado alimenticios
### https://veterinary-api.herokuapp.com/api/informations/category/nutritional/care
## GET efermedades
### https://veterinary-api.herokuapp.com/api/informations/category/diseases
## GEt vacunas
### https://veterinary-api.herokuapp.com/api/informations/category/vaccines



