REST -> arquitectura de software
2000 - Roy Fielding
Usado sobretodo para construir apis

REST se basa en la escalabilidad, fiabilidad, estabilidad, simplicidad, visibilidad, fácil de modificar

arquitectura de software -> la idea de crear algo que pueda mantenerse en el tiempo


#FUNDAMENTOS DE REST
RECURSOS
-> Cada recurso, una url
-> Verbos HTTP, definir las operaciones que se pueden realizar con los recursos
CRUD
-> Representaciones: JSON, XML, HTML, etc.
-> Stateless: Cada peticion contiene toda la info necesaria para esa solicitud
-> Interfaz uniforme
-> Separación de conceptos: Permite que cliente y servidor evolucionen de forma separada

graphql -> puedes crear apis, pero no son apis rest api

APIS, abiertas a todo, pero después cerrar, "efecto embudo", solo procesan lo que necesitan 



diferencias: POST, PUT, PATCH

idempotencia: Propiedad de realizar una acción determinada varias veces y aún así conseguir siempre el mismo resultado que se obtendría al hacerlo una vez.


POST -> Crear un nuevo elemento/recurso en el servidor. (no pasas id, creas)

NO ES IDEMPOTENTE PORQUE SIEMPRE CREAS UN NUEVO RECURSO

PUT -> Actualizar totalmente un elemento ya existente o crearlo si no existe. (pasas id)

ES IDEMPOTENTE, YA QUE EL RESULTADO SERÁ SIEMPRE EL MISMO LAS VECES QUE LO LLAMES

PATCH -> Actualizar parcialmente un elemento/recurso. (pasas id)

ES IDEMPOTENTE (normalmente, pero el updateAt puede cambiar), YA QUE EL RESULTADO SERÁ SIEMPRE EL MISMO LAS VECES QUE LO LLAMES


CORS -> Access-Control-Allow-Origin, Access-Control-Allow-Methods.

En caso de DELETE, primero se hace una petición con OPTIONS para saber qué metodos puede usar, esto se llama CORS preflight.



