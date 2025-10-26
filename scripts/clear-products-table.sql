-- Vider la table des produits
-- ATTENTION: Cette opération supprime TOUS les produits de manière définitive

DELETE FROM products;

-- Optionnel: Réinitialiser les séquences si nécessaire
-- (Supabase gère automatiquement les UUID, donc pas besoin de réinitialiser)
