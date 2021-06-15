#Scénario 1

_Given_​ Je suis un visiteur (non connecté)
_When_​ Je ne remplis pas le champ e-mail ou le champ password du login Employé et je clique sur le bouton "Se connecter"
_Then​_ Je reste sur la page Login et je suis invité à remplir le champ manquant

#Scénario 2
_Given​_ Je suis un visiteur (non connecté)
_When_​ Je remplis le champ e-mail du login Employé au mauvais format (sans la formechaîne@chaîne) et je clique sur le bouton Se connecter
_Then_​ Je reste sur la page Login et je suis invité à remplir le champ e-mail au bon format

