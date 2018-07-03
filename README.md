# Data Dashboard

Este proyecto fue desarrollado para facilitarle a las Training Managers de Laboratoria ver de mánera más fácil y rápida el progreso que las estudiantes tienen en el LMS(Learning Management System), para tener un mejor entendimiento de cómo va cada estudiante en su proceso de aprendizaje.
# Investigación de las prioridades de las usuarias
A través de una entrevista a la Training Manager de Lima, Alejandra Ramirez Villarán, se descubrió que la  información más importante que las Traing Managers necesitan ver en el LMS es el promedio de avance en ejercicios de todo el cohort,ya que un mayor porcentaje de ejercicios desarrollados son un claro indicador de que el cohort está alcanzado su aprendizaje en los niveles esperados.
Estos datos son revisados por las Trainig Managers al final y durante los sprints  (semana) de cada  proyecto que las alumnas desarrollan.

Así, se pensó en crear una interfaz donde las TMs puedan ver y usar la data de progreso del LMS y en el caso de que los datos visualizados no sean los esperados, las Training Managers puedan tomar decisiones y conversar con las alumnas del cohort respectivo para conocer por qué estan teniendo dificultades.

## Características del proyecto:
- Muestra los promedios del cohort en lecturas,quizzes, ejercios y completitud de los cursos.
- Muestra el progresso de cada alumna, para que la Trainig Manager pueda elaborar un plan de acción junto a quienes tengan dificultades.
- Permite acceder a los datos desde cualquier lugar del mundo. Para que la Training Manager esté informada siempre de como estan           avanzando los cohorts.
- Permite acceder a la informacion desde cualquier pantalla: móvil, pc, etc.
## Decisiones de diseño

## Instrucciones 
Para visualizar la funcionalidad del proyecto  ingresa aquí [repositorio1](https://github.com/dcrisanto/lim-2018-05-bc-core-am-datadashboard) o aquí [repositorio22](https://github.com/yulissateran/lim-2018-05-bc-core-am-datadashboard) 

## Planing del proyecto 

En acuerdo con el squad se plantearon las siguientes tareas épicas:
  1. Preparar entorno de trabajo
  2. Investigar herramientas para el proyecto
  3. Entrevistar al usuario
  4. Maquetar Interfaz
  5. Conectar Cohorts con JS
  6. Almacenar y Plasmar datos
  7. Diseñar (CSS) y ReadMe

![kanban1](https://scontent-scl1-1.xx.fbcdn.net/v/t1.15752-9/35464434_1810343875712010_7913204903298727936_n.png?_nc_cat=0&oh=7acd47cb0f214cffd47a23238f819154&oe=5BC3E025)

## Sprint 1

En pareja se acordó comenzar con las siguientes tareas específicas:
 - Investigar las herramientas a utilizar para obtener la data otorgada para este Proyeto:
   Se investigó cómo trabajar con xhr, fetch y se acordó que utilizaríamos fetch.
 - Mostrar en pantalla la lista de estudiantes de un cohort y su porcentaje de completitud general:
   Se logró mostrar en pantalla la lista de estudiantes y su percent.
 - Entrevistar a nuestra usuaria para conocer que información necesitaba ver primero:
   Se le mostró un prototipo de papel, que despues de su feedback quedó así:
 ------------- 

   ### Prototipo de baja fidelidad

   ![img Prototipo baja fidelidad](https://scontent.flim6-1.fna.fbcdn.net/v/t1.15752-9/36513132_2080236568917237_3262799093272936448_n.jpg?_nc_cat=0&_nc_eui2=AeHJoQAlkbzgT1K0Lx7-DfCVW0p-QcT7FO9htRZG_ARlO0FYf3uSEsHVRUaRAGw9IFioSZupEXTw6JO_g8Scap1PWCpG3La1peD98p1QxAgAqg&oh=1bfeeb09262750cac7a33b3a1b0c9750&oe=5BA097D9)

----------------------------------------------------------------------------------------------------------

   ### Prototipo de alta fidelidad

![img Prototipo en marvel 1](https://scontent.flim6-1.fna.fbcdn.net/v/t1.15752-9/36609447_2080206558920238_8505806799830515712_n.png?_nc_cat=0&_nc_eui2=AeFWgKFLpVgoyaWTbYZDk-FRqH8Blf3rPd1qOjN0Jc2FVHWYyQ7_xiAEqoFn6MbotGgM19j9YkUs5xot6vsv_wubwb4Aigo8Y0y3XkyXiqiF3w&oh=bc94ee94e9e470b508c7e9061689bbe3&oe=5BDC9C18)


-------------------------------------------------------------------------------------------------
![img Prototipo en marvel 2](https://scontent.flim6-1.fna.fbcdn.net/v/t1.15752-9/36552722_2080210478919846_1625144671946670080_n.png?_nc_cat=0&_nc_eui2=AeGxGbWeW3LN6AAeBaMFWCdqgPlUf-H-ih4uFhBUXz6FtaTXRsCdMrxSbl7byVxHxctUFWYUItKM5dz-kAHRfm5pCpaYRuUBg0Oudkcflb4cVg&oh=2fa683e9fc6a935607405ba992e5e5f9&oe=5BA133B0)

-----------------------------------------------------------------------------------------------------
## Sprint 2

Nos planteamos cummplir con las siguiente tareas :
- Mostrar en pantalla la lista de estudiantes con su porcentaje de completitud en ejercicios + porcentaje de completitud total.
  Para lograr completar esta tarea, la dividimos en tareas más pequeñas que nos permitieran ir paso a paso y culminar la tarea en el       tiempo propuesto.
  En este segundo sprint utilizamos un [calendario trello](https://trello.com/b/fa3lg2kn/laboratoria-dashboard) para organizarnos y dividirnos las sub-tareas

  ### Trello

  ![img Prototipo en marvel 2](https://scontent.flim6-1.fna.fbcdn.net/v/t1.15752-9/36509329_2080249248915969_8920485071920562176_n.png?_nc_cat=0&_nc_eui2=AeHGG8PBz8miuD-xframVQjxPBgLK_PZ7tksPyF58SLQYiAzxPKT2QCPGGLpAkKnn28TvGvtpbTQCYebN8IwBqXfQTlK-bk2jhNjDFrMF4Eq1Q&oh=a2fd3efd1b35ab00bf0a234bcc30d590&oe=5BE1B0F2)
  
  ******
  
  ## sprint 3

  La meta propuesta para la tercera semana fue conseguir mostrar en pantalla  los datos de completitud y puntuación de las alumnas en cuanto a quizzes, promedio en quizzes, y lecturas.
  Para el planing de esta semana se continuo utilizando trello además del tablero kanban físico.

 ## Herramientas utilizadas

 - Fetch
 - HTML
 - CSS
 - Vanilla Javascript
 ## Información de contacto

 - dorelly.crisanto@gmail.com 
 - yulissa.lteran@gmail.com




