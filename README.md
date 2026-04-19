# GEDmd - Explorateur de Documents Markdown

Projet de gestion électronique de documents (GED) basé sur React, Redux Toolkit et Material UI.

## Pré-requis
- Node.js (v18+)
- pnpm (recommandé) ou npm

## Installation
```bash
pnpm install
```
*(ou `npm install`)*

## Lancement (Développement)
```bash
pnpm run dev
```
*(ou `npm run dev`)*

## Fonctionnalités principales
### **Gestion de l'Arborescence** : Création, renommage et suppression de dossiers et fichiers.
![alt text](/imgREADME/image.png)
- 3 buttons pour importer/creer un fichier/creer un dossier
- Glisser-déposer (drag & drop) pour organiser les éléments. Possibilité de déplacer un élément vers la racine en le déposant dans la zone "Racine"

![alt text](/imgREADME/image1.png)
- Actions disponibles : Télécharger un fichier (.md), Renommer et Supprimer

![alt text](/imgREADME/image3.png)
- Insertion d’images (.png, .jpg, .img.mdlc) à la position du curseur (Les photos seront également ajoutées automatiquement à la bibliothèque.)
- **Éditeur Markdown** : Édition avec prévisualisation en temps réel
- Réutilisation rapide de blocs de contenu

### **Bibliothèque de Blocs** : Fragments de texte réutilisables et insérables d'un clic.

![alt text](/imgREADME/image4.png)

- Création de blocs réutilisables
- Import de fichiers .part.mdlc ou .parts.mdlc
- Export d’un bloc individuel ou de tous les blocs

### **Bibliothèque d'images** 

![alt text](/imgREADME/image5.png)

- Import d’images (.png, .jpg, .img.mdlc, .imgs.mdlc)
- Export d’une image ou de l’ensemble

![alt text](/imgREADME/image6.png)

- Renommage et suppression

![alt text](/imgREADME/image7.png)
![alt text](/imgREADME/image8.png)

- Aperçu au survol

## Persistance des données
Les données sont actuellement stockées côté client via localStorage.



