# Gbc-Wall-Angular5-App

webapp developed in Angular5 to interact with java-gbc-wall

## Infos
Todo...

## Development libraries
* Generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.5.
* [Boostrap 4.0.0](https://getbootstrap.com/docs/4.0/getting-started/introduction/)
* [ngx-boostrap 2.0.2](https://valor-software.com/ngx-bootstrap/#/getting-started)


## Livraison
* GP: 
   * Milestone à 100%
   * Mise a jour Wiki avec une version V.x définissant fonctionnalités, date, ...
   
  
* Livraison   
    * Tag la version en fonction milestone
    * Versionner les fichiers prod dans git perso
    *   Builder pour prod:
        * ng build --prod --aot=false
        * mvn clean install  (mvn release: prepare et mvn release: perform a mettre en place)
* Livraison sur server Unix
* Modifier la version pour la prochaine itération
    * java dans pom.xml
    * angular dans environment.ts et environent.prod.ts 