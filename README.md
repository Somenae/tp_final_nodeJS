# tp_final_nodeJS

Faire un fichier .env en suivant le template
Faire npm install pour installer les dépendances
Pour les documents, faire un dossier public/documents à la racine
Vous pouvez lancer l'environnement de dev avec "npm run dev", et les tests avec "npm run test"

Plusieurs fonctionnalités seront à ajouter, ou améliorer (liste non exhaustive) :
- Différentes sécurités : s'assurer qu'un utilisateur ne puisse pas modifier des données en changeant l'id envoyé par la requête par exemple

- Mieux gérer l'inscription d'un utilisateur à un voyage : faire la modification du nombre de places restantes sur le voyage concerné

- Faire un sorte de pouvoir télécharger le document envoyé par un utilisateur (utilisateur concerné et admin)

- Créer le dossier public/documents automatiquement si inexistant

- Faire en sorte qu'un admin puisse créer un autre compte admin (peut-être rajouter un super admin qui peut supprimer/modifier les aurtes admins)

- Rajouter plus de tests unitaires, et plus précis

- Faire en sorte de renvoyer les erreurs en messages dans le front, et pas en JSON