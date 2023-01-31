# Prova ICO

## Configuració projecte en local

A la base de dades PostgreSQL local fer "Restore" de la taula observacions (podeu trobar el backup a la carpeta sql "./sql/db_backup.sql").

Es crearà la taula amb les columnes necessàries i amb les 10000 observacions.

Omplir el fitxer db_settings.ini amb les credencials corresponents a la vostre base de dades.

Ubicar el projecte en el directori del servidor web local (htdocs en xampp o similars...) per poder executar codi php.

Obrir el directori http://localhost/provaICO/public/

## Funcionalitats
### Mapa
Al mapa es poden veure els diferents marcadors en el mapa, al clicar es mostra la informació de la observació.

Els selectors de dalt del mapa permeten filtrar entre any i espècie.

![](/assets/img1.jpg)

![](/assets/img3.jpg)

### Taula resum
Al consultar la taula resum s'obre un modal amb el nombre total d'individus de cada espècie i agrupats per cada setmana.

![](/assets/img2.jpg)