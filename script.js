
document.addEventListener('DOMContentLoaded', function () {

    const toggle = document.querySelector('.menu-toggle');
    const navigation = document.querySelector('.navigation');
    const main = document.querySelector('.main');
    const container = document.getElementById('cards-container');

    function toggleMenu() {
        toggle.classList.toggle('active');
        navigation.classList.toggle('active');
        main.classList.toggle('active');
    }

    toggle.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
        }
    });


    /* ------------------------------------------------------------
       🔵 FONCTIONS POUR LES CARDS DE DÉPARTEMENTS (NOUVEAU)
       Utilise les données REELLES provenant de data.js
    -------------------------------------------------------------*/

    function displayDepartementCards(dep) {
        const labels = data.charts.employes.labels;   // noms des départements
        const values = data.charts.employes.values;   // nombre d’employés

        container.innerHTML = "";

        // Si "Tous les départements" => afficher toutes les cards
        if (dep === "") {
            labels.forEach((d, index) => {
                const count = values[index];
                const el = document.createElement("div");
                el.className = "card";
                el.innerHTML = `<h3>${d}</h3><p>${count} employés</p>`;
                container.appendChild(el);
            });
            return;
        }

        // Sinon afficher UNE seule card du département choisi
        const index = labels.indexOf(dep);
        if (index !== -1) {
            const count = values[index];
            const el = document.createElement("div");
            el.className = "card";
            el.innerHTML = `<h3>${dep}</h3><p>${count} employés</p>`;
            container.appendChild(el);
        }
    }



    /* ---DONNÉES DES CARDS--- */
    const dataCards = {
        general: [
            { title: "Employés actifs", value: "120" },
            { title: "Congés en cours", value: "8" },
            { title: "Tâches en retard", value: "5" },
            { title: "Performance moyenne", value: "78%" }
        ],
        employees: [
            { title: "Total employés", value: "120" },
            { title: "Départements", value: "6" }
        ],
        leaves: [
            { title: "Congés annuels", value: "20" },
            { title: "Congés maladie", value: "5" }
        ],
        tasks: [
            { title: "À faire", value: "10" },
            { title: "En cours", value: "25" },
            { title: "Terminées", value: "45" }
        ],
        performance: [
            { title: "Objectifs atteints", value: "85%" },
            { title: "Objectifs non atteints", value: "15%" }
        ]
    };


    /* ------------------------------
       CHARGEMENT DES CARDS NORMALES
    --------------------------------*/
    function loadSection(section) {
        const sectionData = dataCards[section];
        if (!sectionData) return;

        container.innerHTML = '';

        sectionData.forEach(card => {
            const el = document.createElement('div');
            el.className = 'card';
            el.innerHTML = `<h3>${card.title}</h3><p>${card.value}</p>`;
            container.appendChild(el);
        });
    }


    /* ------------------------------
       GESTION DES SECTIONS
    --------------------------------*/
    function showOnlySection(sectionId) {
        document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
        const active = document.getElementById(sectionId);
        if (active) active.classList.add("active");
    }


    /* ------------------------------
       CHART.JS : SECTION PAR SECTION
    --------------------------------*/
    const chartData = data.charts; 
    let currentChart = null;

    function loadChartForSection(sectionKey) {

        const chartMap = {
            "general": ["chart-apercu", "apercu"],
            "employees": ["chart-employes", "employes"],
            "leaves": ["chart-conges", "conges"],
            "tasks": ["chart-taches", "taches"],
            "performance": ["chart-performance", "performance"]
        };

        const config = chartMap[sectionKey];
        if (!config) return;

        const [canvasId, chartKey] = config;
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        const chartInfo = chartData[chartKey];

        if (currentChart) currentChart.destroy();

        currentChart = new Chart(canvas, {
            type: chartInfo.type,
            data: {
                labels: chartInfo.labels,
                datasets: [{
                    data: chartInfo.values,
                    backgroundColor: [
                        "#2e97ec", "#4caf50", "#f0c040",
                        "#ff7043", "#6a5acd", "#008b8b"
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: chartInfo.type !== "bar" }
                }
            }
        });
    }


    /* ------------------------------
       NAVIGATION + FILTRE
    --------------------------------*/
    const linkMap = {
        "#apercu": "general",
        "#employes": "employees",
        "#conges": "leaves",
        "#taches": "tasks",
        "#performance": "performance"
    };

    document.querySelectorAll(".navigation a").forEach(a => {
        a.addEventListener("click", function (e) {
            e.preventDefault();

            const href = this.getAttribute("href");
            const sectionKey = linkMap[href];
            const sectionId = href.replace("#", "");

            if (sectionKey) {
                loadSection(sectionKey);
                showOnlySection(sectionId);
                loadChartForSection(sectionKey);

                //  Spécial : Section Employés => appliquer filtrage
                if (sectionKey === "employees") {
                    const depFilter = document.getElementById("poste-filter");
                    if (depFilter) {
                        displayDepartementCards(depFilter.value);
                    }
                }
            }
        });
    });


    /* ------------------------------
       FILTRE PAR DÉPARTEMENT
    --------------------------------*/
    const depFilter = document.getElementById("poste-filter");

    if (depFilter) {
        depFilter.addEventListener("change", function () {
            if (document.getElementById("employes").classList.contains("active")) {
                displayDepartementCards(this.value);
            }
        });
    }


    /* ------------------------------
       INITIALISATION
    --------------------------------*/
    loadSection("general");
    showOnlySection("apercu");
    loadChartForSection("general");

});
