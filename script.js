$(document).ready(function() {
    // Tableau pour stocker les aliments
    var aliments = [];
  
    // Sélection des éléments du DOM
    var $nomAliment = $("#nomAliment");
    var $calories = $("#calories");
    var $ajouterAlimentBtn = $("#ajouterAlimentBtn");
    var $listeAliments = $("#listeAliments");
    var $graphiqueCalories = $("#graphiqueCalories");
  
    // Gestionnaire d'événement du bouton "Ajouter"
    $ajouterAlimentBtn.on("click", function() {
      var nom = $nomAliment.val();
      var calories = parseInt($calories.val());
  
      if (nom !== "" && !isNaN(calories)) {
        // Création de l'objet aliment
        var aliment = {
          nom: nom,
          calories: calories
        };
  
        // Ajout de l'aliment au tableau
        aliments.push(aliment);
  
        // Réinitialisation des champs de saisie
        $nomAliment.val("");
        $calories.val("");
  
        // Mise à jour du tableau des aliments
        mettreAJourTableauAliments();
  
        // Mise à jour du graphique des calories
        mettreAJourGraphiqueCalories();
      }
    });
  
    // Gestionnaire d'événement pour supprimer un aliment
    $listeAliments.on("click", ".supprimerAlimentBtn", function() {
      var index = $(this).data("index");
      aliments.splice(index, 1);
      mettreAJourTableauAliments();
      mettreAJourGraphiqueCalories();
    });
  
    // Fonction pour mettre à jour le tableau des aliments
    function mettreAJourTableauAliments() {
      $listeAliments.empty();
  
      for (var i = 0; i < aliments.length; i++) {
        var aliment = aliments[i];
  
        var $tr = $("<tr>");
        $tr.append("<td>" + aliment.nom + "</td>");
        $tr.append("<td>" + aliment.calories + "</td>");
        $tr.append(
          '<td><button class="supprimerAlimentBtn" data-index="' +
            i +
            '">Supprimer</button></td>'
        );
  
        $listeAliments.append($tr);
      }
    }
  
    // Fonction pour mettre à jour le graphique des calories
    function mettreAJourGraphiqueCalories() {
        var labels = [];
        var data = [];
      
        $.each(aliments, function(index, aliment) {
          labels.push(aliment.nom);
          data.push(aliment.calories);
        });
      
        // Destruction du graphique précédent s'il existe
        if (typeof chart !== "undefined") {
          chart.destroy();
        }
        
      
        var ctx = $graphiqueCalories[0].getContext("2d");
        chart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Calories consommées",
                data: data,
                backgroundColor: "rgba(66, 133, 244, 0.6)"
              }
            ]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
      
  });