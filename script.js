/* Charger le document HTML avant l'exécution */
document.addEventListener('DOMContentLoaded', function () {

    /*SÉLECTION DES ÉLÉMENTS*/
    const toggle = document.querySelector('.menu-toggle');
    const navigation = document.querySelector('.navigation');
    const main = document.querySelector('.main');
    const container = document.getElementById('cards-container');

    /*MENU RESPONSIVE*/
    function toggleMenu() {
        toggle.classList.toggle('active');
        navigation.classList.toggle('active');
        main.classList.toggle('active');
    }

    toggle.addEventListener('click', toggleMenu);
    toggle.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
        }
    });

    /*CALCULS À PARTIR DE data.js*/

    function getOverviewCards() {
        return data.charts.apercu.labels.map((label, i) => ({
            title: label,
            value: data.charts.apercu.values[i] +
                (label.includes("Performance") ? "%" : "")
        }));
    }

    function getEmployeesStats() {
        const values = data.charts.employes.values;
        return {
            totalEmployes: values.reduce((a, b) => a + b, 0),
            nbDepartements: values.length
        };
    }

    function getLeavesStats() {
        return data.charts.conges.labels.map((label, i) => ({
            title: "Congés " + label,
            value: data.charts.conges.values[i]
        }));
    }

    function getTasksStats() {
        return data.charts.taches.labels.map((label, i) => ({
            title: label,
            value: data.charts.taches.values[i]
        }));
    }

    function getPerformanceStats() {
        return data.charts.performance.labels.map((label, i) => ({
            title: label,
            value: data.charts.performance.values[i] + "%"
        }));
    }

    /*AFFICHAGE DES CARDS*/

    function renderCards(cards) {
        container.innerHTML = '';
        cards.forEach(card => {
            const el = document.createElement('div');
            el.className = 'card';
            el.innerHTML = `<h3>${card.title}</h3><p>${card.value}</p>`;
            container.appendChild(el);
        });
    }

    /*CARDS PAR DÉPARTEMENT*/
    function displayDepartementCards(dep) {
        const labels = data.charts.employes.labels;
        const values = data.charts.employes.values;

        container.innerHTML = '';

        labels.forEach((d, i) => {
            if (dep === "" || dep === d) {
                const el = document.createElement('div');
                el.className = 'card';
                el.innerHTML = `<h3>${d}</h3><p>${values[i]} employés</p>`;
                container.appendChild(el);
            }
        });
    }

    /*CHART.JS*/

    let currentChart = null;

    function loadChartForSection(sectionKey) {

        const chartMap = {
            general: ["chart-apercu", "apercu"],
            employees: ["chart-employes", "employes"],
            leaves: ["chart-conges", "conges"],
            tasks: ["chart-taches", "taches"],
            performance: ["chart-performance", "performance"]
        };

        const config = chartMap[sectionKey];
        if (!config) return;

        const [canvasId, chartKey] = config;
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        if (currentChart) currentChart.destroy();

        const chartInfo = data.charts[chartKey];

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

    /*NAVIGATION*/

    function showOnlySection(sectionId) {
        document.querySelectorAll(".section")
            .forEach(sec => sec.classList.remove("active"));

        const active = document.getElementById(sectionId);
        if (active) active.classList.add("active");
    }

    const linkMap = {
        "#apercu": "general",
        "#employes": "employees",
        "#conges": "leaves",
        "#taches": "tasks",
        "#performance": "performance"
    };

    document.querySelectorAll(".navigation a").forEach(a => {
        a.addEventListener("click", e => {
            e.preventDefault();

            const href = a.getAttribute("href");
            const sectionKey = linkMap[href];
            const sectionId = href.replace("#", "");

            showOnlySection(sectionId);
            loadChartForSection(sectionKey);

            switch (sectionKey) {
                case "general":
                    renderCards(getOverviewCards());
                    break;
                case "employees":
                    const depFilter = document.getElementById("poste-filter");
                    displayDepartementCards(depFilter ? depFilter.value : "");
                    break;
                case "leaves":
                    renderCards(getLeavesStats());
                    break;
                case "tasks":
                    renderCards(getTasksStats());
                    break;
                case "performance":
                    renderCards(getPerformanceStats());
                    break;
            }
        });
    });

    /*FILTRE DÉPARTEMENT*/

    const depFilter = document.getElementById("poste-filter");
    if (depFilter) {
        depFilter.addEventListener("change", function () {
            if (document.getElementById("employes").classList.contains("active")) {
                displayDepartementCards(this.value);
            }
        });
    }

    /*INITIALISATION*/

    showOnlySection("apercu");
    renderCards(getOverviewCards());
    loadChartForSection("general");

});
