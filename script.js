document.addEventListener('DOMContentLoaded', function () {

    /* ------------------------------
       MENU BURGER
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

    toggle.addEventListener('click', toggleMenu);
    toggle.addEventListener('keydown', function (e) {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleMenu();
        }
    });


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
            { title: "Congés maladie", value: "5" },   
            { title: "Congés parental", value: "3" },
            { title: "Congés sans solde", value: "2" }
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

        container.innerHTML = "";

        sectionData.forEach(card => {
            const el = document.createElement("div");
            el.className = "card";
            el.innerHTML = `<h3>${card.title}</h3><p>${card.value}</p>`;
            container.appendChild(el);
        });
    }


    /* ------------------------------
       GESTION DES SECTIONS (1 seule visible)
    --------------------------------*/
    function showOnlySection(sectionId) {
        document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));

        const active = document.getElementById(sectionId);
        if (active) active.classList.add("active");
    }


    /* ------------------------------
       CHART.JS : CHARGEMENT PAR SECTION
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

        // détruire l'ancienne chart
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
       NAVIGATION
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
            }
        });
    });


    /* ------------------------------
       INITIALISATION
    --------------------------------*/
    loadSection("general");
    showOnlySection("apercu");
    loadChartForSection("general");

});
