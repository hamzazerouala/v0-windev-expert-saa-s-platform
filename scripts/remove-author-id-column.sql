-- Suppression de la colonne author_id de la table blog_posts
ALTER TABLE blog_posts DROP COLUMN IF EXISTS author_id;
