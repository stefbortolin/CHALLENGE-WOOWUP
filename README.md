# Sistema de Notificaciones

Este proyecto consiste en una aplicación orientada a la gestión y notificación de alertas, implementada completamente en TypeScript. La aplicación está diseñada siguiendo los principios de Domain-Driven Design (DDD) y la programación orientada a objetos, con un enfoque en la claridad del código y en la aplicación de patrones de diseño y principios SOLID. El proyecto ha sido diseñado con un enfoque en la claridad del código y la adherencia a principios de diseño de software aplicando patrones y principios con el fin de mejorar la extensibilidad y el mantenimiento del sistema.

## Diseño y Arquitectura
### Domain-Driven Design (DDD)
El diseño del sistema está basado en los principios de DDD, que enfatiza la separación de las distintas áreas de responsabilidad y el modelado del dominio de manera que refleje la realidad del problema. 

### Patrones de diseño utilizados
- Strategy Pattern: Se utiliza para definir diferentes algoritmos de clasificación de alertas (UrgentAlertSortingStrategy e InformativeAlertSortingStrategy). La interfaz SortStrategy permite intercambiar fácilmente las estrategias de clasificación sin cambiar el código cliente.

- Factory Pattern: El AlertFactory se encarga de crear instancias de alertas (UrgentAlert e InformativeAlert) según el tipo de alerta solicitado. Esto centraliza la lógica de creación y permite añadir nuevos tipos de alertas de manera sencilla.

- Observer Pattern: Implementado en el sistema de suscripción a temas. Los usuarios (Subscriber) se suscriben a un tema (Publisher) y reciben notificaciones cuando se envían nuevas alertas. La interfaz Publisher define los métodos para suscribir, desuscribir y notificar a los suscriptores.

- Repository Pattern: Se utiliza para encapsular la lógica de acceso a datos, proporcionando una interfaz para interactuar con las entidades del dominio sin exponer los detalles de almacenamiento. El uso del patrón Repository ayuda a mantener el código limpio y desacoplado, permitiendo que la lógica de negocio se enfoque en el dominio sin tener que lidiar con los detalles de la persistencia. En este proyecto no tenemos persistencia por lo que repository no se encarga de comunicarse con ningun gestor de base de datos sino que trabaja en memoria por cada ejecución que hacemos, podria haber hecho una clase DB para simular una base de datos en memoria pero no lo vi necesario:
1. UserRepository: Encapsula la lógica para gestionar usuarios en memoria, proporcionando métodos para registrar y recuperar usuarios.
2. TopicRepository: Maneja la gestión de temas en memoria, incluyendo operaciones de recuperación de temas.
3. AlertRepository: Gestiona las alertas en memoria, permitiendo añadir y recuperar alertas sin preocuparse por los detalles de almacenamiento.

### Principios SOLID aplicados
- Single Responsibility Principle (SRP): Cada clase en el sistema tiene una única responsabilidad. Por ejemplo:AlertSorter se encarga de ordenar alertas según diferentes criterios, pero el ordenamiento especifico de cada tipo de alerta, se encarga cada clase que ordena el tipo de alerta.

- Open/Closed Principle (OCP): Las clases están abiertas para la extensión pero cerradas para la modificación. Los métodos de clasificación de alertas (UrgentAlertSortingStrategy e InformativeAlertSortingStrategy) se extienden mediante la implementación de la interfaz SortStrategy, lo que permite añadir nuevas estrategias de clasificación sin modificar el código existente. Tambien tenemos el caso de las alertas en si, que definí una clase abstracta Alerta y luego para cada tipo se crea una clase nueva sin tener que modificar la logica de Alerta, para este caso en cuestión no da un gran aporte pero si plantearamos algun tipo de logica segun el tipo, que es muy probable que suceda, tener este diseño de clases nos ayudaria para poder extender la logica de Alerta sin estar modificando la clase.

- Liskov Substitution Principle (LSP): Las subclases (UrgentAlert e InformativeAlert) pueden sustituir a su clase base (Alert) sin alterar el funcionamiento del sistema. Cada subclase mantiene el contrato de la clase base y proporciona implementaciones específicas.

- Interface Segregation Principle (ISP): Se ha diseñado una interfaz (SortStrategy) que define un único método para ordenar alertas, evitando interfaces grandes y monolíticas. Esto permite implementar estrategias de ordenación específicas sin imponer métodos innecesarios.

- Dependency Inversion Principle (DIP): El código depende de abstracciones (SortStrategy), no de implementaciones concretas. Las dependencias se inyectan a través de los constructores, facilitando el intercambio de implementaciones y el desacoplamiento entre componentes.

### Polimorfismo
El polimorfismo es utilizado en esta solución en distintas ocasiones como por ejemplo las estrategias para ordenamientos, ambas implementan un interface que les obliga a utilizar el metodo sort(), pero para cada estrategia en concreto el metodo realiza un uso de la funcionalidad de distinta manera. El hecho de haber utilizado patrones de diseño y principios SOLID hacen que el polimorfismo este presente en varias ocasiones a lo largo de la solución planteada.

## Ejecucion y testing
Al momento de clonar el repositorio con tener Node.js haremos npm install e instalara las dependencias necesarias, entre ellas tenemos Jest que será utilizada para realizar los test unitarios, con ella probaremos el correcto funcionamiento de la solucion planteada mediante la prueba de los metodos de las clases propuestas. Los tests planteados contemplan las funcionalidades solicitadas en el enunciado y buscan probar que la logica de cada punto sea la planteada por el software y funcione correctamente, digamos que exista la traza sobre lo solicitado y lo que se desarrollo (plantear los tests pensando en la logica de lo que se necesita y no tanto sobre la implementacion en si). Para ejecutar estos test tenemos 2 opciones:
- Ejecucion de todos los test realizados: Esto lo realizaremos utilizando un npm test, ya que en el package.json se definio un script para utilizar jest mediante este comando, de igual manera lo podrias realizar con un npm jest.
- Ejecucion de cada test por separado: Esto lo realizaremos utilizando tambien npm test, pero agregandole al final el nombre del test a probar, por ejemplo npm test RegisterTopicUseCase, que es el nombre del test que defini para la funcionalidad de registrar un usuario.
Para todo esto necesitamos tener instalado jest (npm install --save-dev ts-jest @types/jest).
