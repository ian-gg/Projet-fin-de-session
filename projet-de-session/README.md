// Référence markdown : https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet

L'apk se trouve ici : https://github.com/LOG450/projet-de-session-equipe05/blob/main/app/release/app-release.apk

# Projet de session - ColorPickr

## Noms

Ian Garcia-Guerrero - GARI03129605<br/>

## Brève description de l'application

L'application sert à obtenir une couleur via la caméra de son téléphone ou en utilisant la page Color Slider pour créer sa couleur via les curseurs de défilement RGB. De plus, il est possible d’obtenir une couleur en secouant l’appareil mobile. Lorsque l’utilisateur obtient une couleur, il peut aussi obtenir une palette de couleurs qui s'agencent bien avec la couleur choisie, en plus de pouvoir consulter les informations d’une couleur comme son nom et son code hexadécimal. Aussi, lorsqu’on obtient une couleur avec la caméra, on peut partager le code hexadécimal de cette couleur.

## Structure du projet

Le projet est divisé en packages qui représentent le fonctionnement d’une classe, donc on a : <br/>
![alt ext](https://github.com/LOG450/projet-de-session-equipe05/blob/main/imgGit/structure_projet.jpg "Structure du projet")

## Diagramme de classe

![alt ext](https://github.com/LOG450/projet-de-session-equipe05/blob/main/imgGit/diagramme_classes.png "Diagramme de classe")

## CU implémentés

**Les fonctionnalités implémentées :**

+ Obtenir une couleur via la caméra
+ Partager des couleurs
+ Obtenir une couleur en secouant le téléphone
+ Consulter une couleur

**Les fonctionnalités non implémentées :** 

+ Mettre une couleur en favoris
+ Supprimer une couleur
+ L’interaction dans la page Settings 
+ Obtenir une couleur avec les curseurs de défilement RGB dans la page Color Slider
+ Sauvegarde des couleurs dans la mémoire du téléphone
+ Historique des couleurs parcourues

## Problèmes/bogues connus

+ Il y a quelques fois une erreur lors des appels de l'API. Le premier élément de la réponse n'est pas du bon type et cela soulève une erreur dans le système. 
+ On peut empiler plusieurs fenêtres d’information d’une couleur lorsqu’on obtient une couleur en secouant l'appareil.
+ Lorsqu'on utilise le secouage pour obtenir une couleur, les informations affichées correspondent à la couleur obtenue après le premier secouage, car la variable de la couleur aléatoire n'a pas le temps d'être écrite au moment qu'on vérifie si celle-ci est non nulle pour l'afficher à l'utilisateur lors d'un premier secouage. 

## Améliorations possibles

+ L'appareil mobile de l'utilisateur vibre lors de la réception d'une couleur par le secouage. 
+ Utiliser l'application sans l'usage d'Internet pour les informations des couleurs.
+ Lors de l'analyse de l'image, générer une image en *yuv_420_888* contrairement en *JPEG*, car c'est plus rapide.
+ Suggérer un marchand proche qui vend la peinture de la couleur choisie. 
