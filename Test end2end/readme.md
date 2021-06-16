_______________________________
## Scénario 1

**Given** Je suis un visiteur (non connecté)

**When** Je ne remplis pas le champ e-mail ou le champ password du login Employé et je clique sur le bouton "Se connecter"

**Then** Je reste sur la page Login et je suis invité à remplir le champ manquant

________________________________
## Scénario 2

**Given** Je suis un visiteur (non connecté)

**When** Je remplis le champ e-mail du login Employé au mauvais format (sans la formechaîne@chaîne) et je clique sur le bouton Se connecter

**Then** Je reste sur la page Login et je suis invité à remplir le champ e-mail au bon format

_______________________________
## Scénario 3

**Given** Je suis un visiteur (non connecté)

**When** Je remplis le champ e-mail du login Employé au bon format (sous la formechaîne@chaîne), le champ password du login Employé et je clique sur le bouton "Se connecter"

**Then** Je suis envoyé sur la page "bills"

_______________________________
## Scénario 4

**Given** Je suis connecté en tant qu'employé

**When** Je clique sur l'icone "log-out"

**Then** Je suis déconnecté et reonvyé sur la page login
_______________________________
## Scénario 5

**Given** Je suis un nouvel utilisateur "employé"

**When** Je remplis correctement les champs email et password

**Then** Un nouveau compte est créé et je suis envoyé sur la page "bills". (La création se confirme via message dans la console)
_______________________________
## Scénario 6

**Given** Je suis un utilisateur "employé" existant

**When** Je remplis correctement les champs email et password

**Then** Un message dans la console confirme que l'utilisateur existe, et envoie sur la page "bills"
_______________________________
## Scénario 7

**Given** Je suis un utilisateur "employé" existant sans note de frais, ou un nouvel utilisateur

**When** Je suis envoyé sur la page "bills"

**Then** Aucune note de frais ne doit apparaitre
_______________________________
## Scénario 8

**Given** Je suis un utilisateur "employé" existant

**When** Je suis envoyé sur la page de "bills" et mon compte contient des notes enregistré

**Then** Je dois voir la liste des notes de frais
_______________________________
## Scénario 9

**Given** Je suis un employé sur la page "bills"

**When** Je clique sur l'icone en forme d'oeil

**Then** Je vois une modale qui affiche l'image correspondante a la note de frais
_______________________________
## Scénario 10

**Given** Je suis un employé sur la page "bills"

**When** Je clique sur le bouton "Nouvelle note de frais"

**Then** Je suis redirigé vers la page "bill/new"
_______________________________
## Scénario 11

**Given** Je suis un employé connecté sur la page "bill/new"

**When** Je clique sur l'icone "log out"

**Then** Je suis renvoyé sur la page "login"

_______________________________
## Scénario 12

**Given** Je suis un employé connecté sur la page "bill/new"

**When** Je clique sur le champ input "type dépense"

**Then** Une liste déroulante doit s'afficher listant tout les types possibles
_______________________________
## Scénario 13

**Given** Je suis un employé connecté sur la page "bill/new"

**When** Je clique sur le champ "date"

**Then** Une boite de dialogue de type "datepicker" doit s'afficher
_______________________________
## Scénario 14

**Given** Je suis un employé connecté sur la page "bill/new"

**When** Je clique sur le champ "fichier"

**Then** Une boite de dialogue de type "explorateur" doit s'afficher, et limiter le choix des fichiers au type image
_______________________________
## Scénario 15

**Given** Je suis un employé connecté sur la page "bill/new"

**When** Je clique sur le champ "Envoyer", et les données saisie sont incorrect

**Then** Une boite de dialogue doit s'afficher en montrant l'endroit de l'erreur, et son type
_______________________________
## Scénario 16

**Given** Je suis un employé connecté sur la page "bill/new"

**When** Je clique sur le champ "Envoyer", et les données saisie sont correct

**Then** Je suis redirigé vers la page "bill", et la nouvelle note est visible