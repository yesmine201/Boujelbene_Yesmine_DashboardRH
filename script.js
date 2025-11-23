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

	// keyboard accessibility
	toggle.addEventListener('keydown', function (e) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			toggleMenu();
		}
	});

	toggle.addEventListener('click', toggleMenu);

	const data = {
		general: [
			{ title: "Employés actifs", value: 120 },
			{ title: "Congés en cours", value: 8 },
			{ title: "Tâches en retard", value: 5 },
			{ title: "Performances moyennes", value: "78%" }
		],
		employees: [
			{ title: "Total employés", value: 120 },
			{ title: "Nouveaux recrutements", value: 4 },
			{ title: "Turnover", value: "3%" },
			{ title: "Contrats expirant", value: 2 }
		],
		leaves: [
			{ title: "Congés validés", value: 15 },
			{ title: "Congés en attente", value: 3 },
			{ title: "Solde moyen restant", value: "12 jours" },
			{ title: "Types de congés", value: "Annuel, Maladie" }
		],
		tasks: [
			{ title: "Tâches en cours", value: 20 },
			{ title: "Tâches terminées", value: 45 },
			{ title: "Deadlines respectées", value: "92%" },
			{ title: "Projets en retard", value: 2 }
		],
		performance: [
			{ title: "Score moyen", value: "78%" },
			{ title: "Top performers", value: 5 },
			{ title: "Objectifs atteints", value: "85%" },
			{ title: "Suivi nécessaire", value: 3 }
		]
	};

	function loadSection(section) {
		const sectionData = data[section];
		if (!sectionData || !container) return;
		container.innerHTML = '';
		sectionData.forEach(card => {
			const el = document.createElement('div');
			el.className = 'card';
			el.innerHTML = `<h3>${card.title}</h3><p>${card.value}</p>`;
			container.appendChild(el);
		});
	}

	const linkMap = {
		'#aperçu': 'general',
		'#employés': 'employees',
		'#congés': 'leaves',
		'#taches': 'tasks',
		'#performance': 'performance'
	};

	document.querySelectorAll('.navigation a').forEach(a => {
		a.addEventListener('click', function (e) {
			e.preventDefault();
			const key = linkMap[this.getAttribute('href')];
			if (key) loadSection(key);
		});
	});

	// initial load
	loadSection('general');
});

