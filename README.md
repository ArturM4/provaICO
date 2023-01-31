# Prova ICO

## Configuració projecte en local

A la base de dades PostgreSQL local fer "Restore" de la taula observacions (podeu trobar el backup a la carpeta sql "./sql/db_backup.sql").

Es crearà la taula amb les columnes necessaries i amb les 10000 observacions.

Omplir el fitxer db_settings.ini amb les credencials corresponents a la vostre base de dades.

Úbicar el projecte en el directori del servidor web local (htdocs en xampp o similars...) per poder executar codi php.

## Funcionalitats
### Mapa
Al mapa es poden veure els diferents maracadors en el mapa, al clicar es mostra l'informació de la observació.

Els selectors d'adalt del mapa permeten filtrar entre any i espècie.

![](/assets/img1.jpg)

### Taula resum
Al consultar la taula resum s'obre un modal amb el nombre total d'individus de cada espècie i agrupats per cada setmana.

![](/assets/img2.jpg)