document.addEventListener('DOMContentLoaded', function () {

    /* ------------------------------
       MENU BURGER (mobile)
    --------------------------------*/
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

    toggle.addEventListener('click', toggleMenu);


    /* ------------------------------
       DONNÉES DES CARDS
    --------------------------------*/
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
       CHARGEMENT DES CARDS
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
       MAPPING NAVIGATION → SECTIONS
    --------------------------------*/
    const linkMap = {
        '#apercu': 'general',
        '#employes': 'employees',
        '#conges': 'leaves',
        '#taches': 'tasks',
        '#performance': 'performance'
    };


    /* ------------------------------
       AFFICHER UNIQUEMENT UNE SECTION
    --------------------------------*/
    function showOnlySection(sectionId) {
        document.querySelectorAll(".section").forEach(sec => {
            sec.classList.remove("active");
        });

        const active = document.getElementById(sectionId);
        if (active) active.classList.add("active");
    }


    /* ------------------------------
       CHART.JS — CHARGEMENT DYNAMIQUE
    --------------------------------*/
    const chartData = data.charts;
    let chartsInstances = {};

    function loadChartForSection(sectionKey) {

        const chartMap = {
            'general': ["chart-apercu", "aperçu"],
            'employees': ["chart-employes", "employes"],
            'leaves': ["chart-conges", "conges"],
            'tasks': ["chart-taches", "taches"],
            'performance': ["chart-performance", "performance"]
        };

        const config = chartMap[sectionKey];
        if (!config) return;

        const [canvasId, chartKey] = config;
        const chartInfo = chartData[chartKey];
        const canvas = document.getElementById(canvasId);

        if (!canvas) return;

        // Supprimer ancienne chart
        if (chartsInstances[canvasId]) {
            chartsInstances[canvasId].destroy();
        }

        // Créer la nouvelle chart
        chartsInstances[canvasId] = new Chart(canvas, {
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
                    legend: { display: chartInfo.type !== 'bar' }
                }
            }
        });
    }


    /* ------------------------------
       NAVIGATION : changer section + chart
    --------------------------------*/
    document.querySelectorAll('.navigation a').forEach(a => {
        a.addEventListener('click', function (e) {
            e.preventDefault();

            const key = linkMap[this.getAttribute('href')];
            const sectionId = this.getAttribute("href").replace("#", "");

            if (key) {
                loadSection(key);                 // appliquer les cards
                showOnlySection(sectionId);       // afficher la bonne section
                loadChartForSection(key);         // afficher la bonne chart
            }
        });
    });


    /* ------------------------------
       INITIALISATION AU CHARGEMENT
    --------------------------------*/
    loadSection('general');
    showOnlySection("apercu");
    loadChartForSection('general');

});
