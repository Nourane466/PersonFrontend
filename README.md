# Rapport — PersonFrontend : Gestion des personnes (React + JSP + Tomcat)

## Description du projet
**PersonFrontend** est une application web de gestion des personnes (CRUD) permettant de :
- Ajouter une personne (nom, prénom, âge)
- Afficher la liste des personnes
- Rechercher par ID ou par nom/prénom
- Modifier / supprimer une personne
- Charger un exemple et vider la liste
- Stocker les données côté navigateur via **localStorage** (persistance après actualisation)

## Technologies utilisées

### Frontend
- **React** : interface utilisateur (composants, rendu dans `<div id="root">`)
- **JavaScript**
- **HTML / CSS**
- **Vite (build React)** : génération des fichiers `index-xxxx.css` et `index-xxxx.js`
- **localStorage** : stockage local des données (persistance après refresh)

### Intégration / Serveur
- **JSP (JavaServer Pages)** : ✅ *utilisée*
  - `index.jsp` sert de page d’entrée et référence les assets React.
- **Apache Tomcat 8.0** : serveur d’application pour exécuter le projet
- **Eclipse IDE (WTP / Servers)** : exécution de Tomcat et déploiement du projet

### Java
- **Java 8 (JRE 1.8.x)** (selon la configuration Eclipse/Tomcat)

## Prérequis
- **Java 8**
- **Apache Tomcat 8.x**
- **Eclipse** avec support **Servers / WTP**
- **Node.js** (uniquement si tu veux reconstruire le build React)

---

## Instructions pour exécuter le projet (Eclipse + Tomcat)
1. Ouvrir le projet dans **Eclipse**.
2. Vérifier que **Tomcat** est bien configuré dans l’onglet **Servers**.
3. Vérifier que le module est bien ajouté :
   - `Servers` → double-clic sur **Tomcat v8.0 Server at localhost**
   - Onglet **Modules**
   - Le projet `PersonFrontend` doit apparaître avec un path du type : `/PersonFrontend`
4. Démarrer Tomcat : **Start**.
5. Ouvrir l’application dans le navigateur :

✅ URL principale :  
`http://localhost:8081/PersonFrontend/`

✅ Ou directement :  
`http://localhost:8081/PersonFrontend/index.jsp`

---

## Structure des fichiers
- `WebContent/index.jsp` : page JSP qui charge l’app React
- `WebContent/react/assets/` : fichiers build React (CSS/JS générés)
- `WebContent/react/index.html` : page build originale
- `WebContent/WEB-INF/` : configuration web

---

## Informations du projet
- **Nom :** NOURANE ABDALLAH  
- **Groupe / Classe :** TD3 / TP6  
- **Date :** 22/12/2025  

---

## Captures d’écran
> Place les images dans un dossier `docs/` à la racine du projet.

![Interface](docs/cap1.png)  
![Interface](docs/cap2.png)

#lien du depot

-https://github.com/Nourane466/PersonFrontend.git
 
