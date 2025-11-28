var data = data || {};

data.charts = {
  aperçu: {
    type: 'bar',
    labels: ["Employés actifs", "Congés en cours", "Tâches en retard", "Performance moyenne"],
    values: [120, 8, 5, 78]
  },
  employes: {
    type: 'bar',
    labels: ["RH", "Opérations/Réservations", "Marketing", "Finance", "Support","Développement"],
    values: [12, 35, 8, 10, 5, 4]
  },
  conges: {
    type: 'doughnut',
    labels: ["Annuel", "Maladie", "Parental", "Sans solde"],
    values: [20, 5, 3, 2]
  },
  taches: {
    type: 'pie',
    labels: ["À faire", "En cours", "Terminées"],
    values: [10, 25, 45]
  },
  performance: {
    type: 'bar',
    labels: ["Objectifs atteints", "Objectifs non atteints"],
    values: [85, 15]
  }
};

