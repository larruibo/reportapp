# Reportapp

Reportapp es una pagina web que tiene como finalidad reportar los lugares donde los robos suceden mas frecuentemente, esto con la finalidad de que todos los que visitan la pagina puedan estar precavidos al momento de visitar ciertos sectores de la cuidad.

![Screen shot](https://raw.githubusercontent.com/larruibo/reportapp/master/public/images/screen%20proyecto%202_opt.png)

------------------------------------------------------------------------------
# Correo la pagina Web
Para correr la aplicacion localmente se necesita tener instalados estos complementos.

## Node.js
Para instalar Nodejs puedes visitar su pagina web [Node js](https://nodejs.org/es/download/).

## Mongo db
Como se va a correr localmente se necesita descargar mongodb, para hacerlo puedes visitar su pagina web [Mongo DB](https://www.mongodb.com/download-center/community).

Despues de instalar mongo ecribir en una terminal:

```
mongod
```
Y ya se tiene corriendo localmente la base de datos.


## Variables de entorno
Se necesita crear un `.env` en la carpeta raiz del proyecto y se debe agregar la contraseña del usuario duaeña de la base de datos de la siguiente forma: `PASS=<User Password>`.

Como la pagina web usa la api de google para los mapas estáticos (poner marcadores), utiliza los markerclusterer de google para seccionar por secciones el mapa y juntar los marcadores dependiendo del zoom, y utiliza el geocoder de google para traducir direcciones a coordenadas en el mapa, se necesita una llave privada de google en las variables de entorno. Por lo tanto en el mismo archivo `.env`, debe agregar la siguiente linea `API_KEY=<Inserte su llave>`.

--------------------------------------------------------------------------------------------------
# Start
Para inicializar el proyecto escriba en la consola en la raiz del proyecto lo siguiente:
```
#Añadir dependecias
yarn add nodemon passport 

#Instalar dependencias
yarn install

#Correr pagina web
yarn start
```
-----------------------------------------------------------
# Autores
Luis Ruis y Sebastian Martinez

--------------------------------------------------------------
# Link
[Reportapp](https://intense-cove-58373.herokuapp.com/)

-----------------------------------------------------------
# Licencia
Para el proyecto se utilizo la sieguiente licencia [Licencia](https://raw.githubusercontent.com/larruibo/reportapp/master/LICENSE)
