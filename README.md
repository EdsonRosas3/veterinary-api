# veterinary-api

#Peticiones en funcionamiento

##GET 
Esta ruta devuelve una lista de todas la publicaciones que aun no an sido acetadas por el superuser
###https://veterinary-api.herokuapp.com/api/informations/pending

##PUT
El superuser podra actulizar el estado de cada publicacion "status:false" a "status:true" para que la publicacion ya se pueda publicar 
###https://veterinary-api.herokuapp.com/api/informations/answer/:id

##POST
Esta ruta es para que el veterinario pueda crear una nueva publicacion
###https://veterinary-api.herokuapp.com/api/informations/

##DELETE
Esta ruta es para que el veterinario pueda borrar una publicacion
###https://veterinary-api.herokuapp.com/api/informations/:id

##GET
Esta ruta es para que se pueda ver una publicacion en especifico mediante el id
###https://veterinary-api.herokuapp.com/api/informations/:id

##GET 
Esta ruta respode con una lista de todas las publicaciones aceptadas o permitidas es decir "status:true"
###https://veterinary-api.herokuapp.com/api/informations/
