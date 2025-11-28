
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

    toggle.addEventListener('click', toggleMenu);


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


    /* ---CHARGEMENT DES CARDS--- */
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


    /* ---MAPPING NAVIGATION → SECTIONS--- */
    const linkMap = {
        '#aperçu': 'general',
        '#employés': 'employees',
        '#congés': 'leaves',
        '#taches': 'tasks',
        '#performance': 'performance'
    };


    /* ---AFFICHER UNIQUEMENT UNE SECTION--- */
    function showOnlySection(sectionId) {
        document.querySelectorAll(".section").forEach(sec => {
            sec.classList.remove("active");
        });

        const active = document.getElementById(sectionId);
        if (active) active.classList.add("active");
    }


    
    loadSection('general');
    

});

