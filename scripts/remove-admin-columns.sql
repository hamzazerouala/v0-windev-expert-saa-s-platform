-- Suppression des colonnes qui stockent l'ID admin (inutiles car un seul admin)

-- Supprimer created_by de formations
ALTER TABLE formations DROP COLUMN IF EXISTS created_by;

-- Supprimer uploaded_by de documents
ALTER TABLE documents DROP COLUMN IF EXISTS uploaded_by;

-- Supprimer uploaded_by de project_documents
ALTER TABLE project_documents DROP COLUMN IF EXISTS uploaded_by;

-- Ajout suppression de assigned_to dans project_tasks
-- Supprimer assigned_to de project_tasks (un seul admin gère toutes les tâches)
ALTER TABLE project_tasks DROP COLUMN IF EXISTS assigned_to;
