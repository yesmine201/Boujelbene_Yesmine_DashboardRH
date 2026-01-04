NovaQuest Voyages -- Dashboard RH

# Description du projet :

Un tableau de bord interactif permettant la visualisation et le suivi
des employés, des congés, des tâches, et des performances
au sein de l'agence de voyages "NovaQuest voyages"
Ce projet met en place une interface intuitive, responsive et alimentée
par des données dynamiques visualisées grâce à Chart.js.

------------------------------------------------------------------------

🎯 Objectif du projet

Créer un Dashboard RH fonctionnel, moderne et ergonomique,
regroupant : 
- Le suivi des employés par département.
- Le suivi des congés.
- La visualisation des tâches.
- L'analyse des performances.
- Des graphiques dynamiques (Chart.js).
- Un filtre interactif (filtrage par département) pour faciliter l'analyse des données.

------------------------------------------------------------------------

🖥️ Aperçu du projet

Logo du projet :

[logo du dashboard](NovaQuest.png)

Ce dashboard offre une navigation fluide via un menu latéral, une zone
de recherche, des graphiques et des cards dynamiques.
Il est entièrement responsive et optimisé pour tous les écrans.

------------------------------------------------------------------------

# Technologies utilisées

  -----------------------------------------------------------------------
  Technologie                                     Rôle
  ----------------------------------------------- -----------------------
  HTML5                                           Structure du dashboard

  CSS3                                            Mise en forme,
                                                  responsive design,
                                                  layout des cards

  JavaScript                                     Logique, manipulation
                                                  DOM, filtrage,
                                                  navigation

  Chart.js                                        Visualisation des
                                                  statistiques (barres,
                                                  camemberts, doughnuts)

  Google Fonts / Font Awesome                     Typographie et icônes

  Git / GitHub                                    controle de versions et
                                                  hébergement
  -----------------------------------------------------------------------

------------------------------------------------------------------------

# Fonctionnalités principales

1. Tableau de bord principal

-   Aperçu global des employés, congés, tâches et performances
-   Menu dynamique + navigation entre sections

2. Gestion des employés

-   Cards dynamiques affichant le nombre d'employés par département
-   Données synchronisées avec les statistiques Chart.js

3. Filtrage par département (NOUVEAUTÉ)

-   Sélecteur permettant de filtrer l'affichage des cards des employés
-   Affichage :
    -   Toutes les cards → si "Tous les départements" est choisi
    -   Une seule card → si un département spécifique est
        sélectionné
-   Les données affichées proviennent directement du dataset réel dans
    `data.js`
-   Aucune duplication de données → cohérence totale avec la chart

4. Graphiques Chart.js

-   Graphique des employés par département
-   Graphique des congés par type
-   Graphique des tâches (planifiées, en cours, terminées)
-   Graphique des performances RH

5. Interface responsive

-   Sidebar transformée en menu burger sur mobile
-   Mise en page flexible des cards

------------------------------------------------------------------------

🔗 Lien GitHub Pages (démo en ligne)

➡️ Consultez le dashboard via ce lien :
[lien du dashboard](https://yesmine201.github.io/Boujelbene_Yesmine_DashboardRH/)

------------------------------------------------------------------------

# Nouveautés explorées

1. Manipulation avancée de Chart.js

-   Gestion de plusieurs types de graphiques
-   Mise à jour dynamique selon la section active
-   Destruction / recréation de graphiques pour éviter les doublons

2. Filtrage dynamique des données

-   Création d'un système de filtrage par département
-   Synchronisation avec les données du graphique
-   Génération dynamique de cards en fonction du filtre

3. Navigation dynamique par JavaScript

-   Affichage/masquage de sections
-   Mise en place d'une architecture modulaire

4. Organisation du code

-   Séparation des données (data.js)
-   Gestion modulaire des sections
-   Réutilisation du DOM pour éviter les duplications

------------------------------------------------------------------------

# Difficultés rencontrées

1. Incohérence entre les cards et la chart

-   Les cards utilisaient une liste statique
-   Mais les graphiques utilisaient de vraies données 
-   Résultat : affichages incohérents

2. Card du département "Opérations" non affichée"

-   La valeur du filtre était `"Opérations"`
-   Le dataset réel contenait `"Opérations/Réservations"`
-   Donc aucune correspondance → aucune card affichée

3. Mise à jour automatique selon la section active

-   Il fallait éviter d'afficher des cards alors que l'utilisateur
    consultait une autre section

------------------------------------------------------------------------

# Solutions apportées

1. Utiliser directement `data.js` comme source unique

Les cards employés sont désormais générées à partir de :

    data.charts.employes.labels
    data.charts.employes.values

→ Plus de doublons
→ Plus d'incohérences

------------------------------------------------------------------------

2. Synchroniser les valeurs du filtre avec les labels

Le filtre utilise :

``` html
<option value="Opérations/Réservations">Opérations</option>
```

→ L'utilisateur voit "Opérations"
→ Le système utilise la valeur exacte : "Opérations/Réservations"

------------------------------------------------------------------------

3. Card générée dynamiquement

La fonction :

    displayDepartementCards(dep)

-   Si `dep == ""` → afficher toutes les cards
-   Sinon → afficher uniquement le département choisi

------------------------------------------------------------------------

4. Gestion des charts section par section

Recréation du chart à chaque navigation pour éviter les doublons.

------------------------------------------------------------------------

# Structure du projet

    /Boujelbene_Yesmine_DashboardRH
    │── index.html
    │── styles.css
    │── script.js
    │── data.js
    │── NovaQuest.png
    │── README.md

