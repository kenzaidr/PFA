# 📌 Conventions de gestion des tâches

## 🎯 Organisation des tâches

* Les fonctionnalités sont définies sous forme de **User Stories (US)**
* Chaque User Story est découpée en **sub-issues (tâches techniques)**

---

## 🗂️ Structure GitHub

* **Roadmap** : contient uniquement les User Stories (vision globale)
* **Kanban** : contient toutes les tâches détaillées (exécution)

---

## 🔄 Workflow des tâches

* Cycle de vie : **Backlog → To Do → In Progress → Done**
* Une tâche doit être **assignée avant d’être commencée**
* Une tâche terminée doit être validée avant passage en *Done*

---

## 🏷️ Convention de nommage

* **User Story** : `US-XXX – Nom de la fonctionnalité`
* **Team Item** : `TEAM ITEM – Description`
* **Sub-issues** : verbe à l’infinitif
  *Exemple : Créer API login, Implémenter validation formulaire*

---

## 🧩 Labels utilisés

* `M:` Module → Auth, AI, Recruiter…
* `T:` Type → Frontend, Backend, Feature, Security…
* `P:` Priorité → High, Medium, Low

---

## 🌿 Workflow Git

* `main` → branche stable (production)
* `dev` → branche d’intégration
* `feature/*` → développement des fonctionnalités

---

## 🔄 Workflow Pull Request

1. Créer une branche `feature/*`
2. Développer la fonctionnalité
3. Push la branche
4. Créer une Pull Request vers `dev`
5. Validation (review + tests)
6. Merge dans `dev`
7. Une fois stable → Pull Request `dev → main`

---

## 🔒 Bonnes pratiques

* ❌ Pas de push direct sur `main`
* ✅ Pull Request obligatoire
* ✅ Code review recommandée
* ✅ Messages de commit explicites

---

## 📅 Organisation Agile

* Développement structuré en **sprints**
* Suivi via **GitHub Projects (Roadmap + Kanban)**
