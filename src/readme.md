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

