#!/usr/bin/env bash
set -uo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
DATE="$(date +%Y-%m-%d)"
REPORTS_DIR="$PROJECT_DIR/reports/$DATE"
FAILURES=0

mkdir -p "$REPORTS_DIR"

echo "========================================"
echo "  Audit du portfolio — $DATE"
echo "========================================"
echo ""

run_audit() {
  local step="$1" label="$2" output="$3" prompt="$4"
  echo "[$step/3] $label en cours..."
  if claude --print "$prompt" > "$output" 2>/dev/null; then
    echo "  → Rapport sauvegardé : reports/$DATE/$(basename "$output")"
  else
    echo "  ⚠ Échec de $label (code $?), rapport partiel sauvegardé"
    FAILURES=$((FAILURES + 1))
  fi
}

# 1. Audit d'accessibilité
run_audit 1 "Audit d'accessibilité" "$REPORTS_DIR/accessibilite.md" \
  "Fais un audit d'accessibilité complet de ce site portfolio. Vérifie : attributs alt, contraste des couleurs, navigation clavier, structure des headings, ARIA, formulaires, et conformité WCAG 2.1 AA. Donne un rapport structuré avec les problèmes trouvés classés par sévérité (critique, important, mineur) et les corrections recommandées."

# 2. Revue de code
run_audit 2 "Revue de code" "$REPORTS_DIR/revue-code.md" \
  "Fais une revue de code complète de ce projet. Analyse la qualité du HTML, CSS et JavaScript. Vérifie : bonnes pratiques, performance, sécurité, maintenabilité, cohérence du code, et respect des conventions du projet (BEM, variables CSS, etc.). Donne un rapport structuré avec les problèmes classés par sévérité et les améliorations recommandées."

# 3. Checklist de déploiement
run_audit 3 "Checklist de déploiement" "$REPORTS_DIR/deploiement.md" \
  "/deploy-checklist"

# Résumé final
echo ""
echo "========================================"
echo "  Audit terminé"
echo "========================================"
echo ""
echo "Rapports générés dans reports/$DATE/ :"
echo ""
for report in "$REPORTS_DIR"/*.md; do
  lines="$(wc -l < "$report")"
  size="$(du -h "$report" | cut -f1)"
  echo "  • $(basename "$report") — $lines lignes ($size)"
done
echo ""
echo "Pour consulter un rapport :"
echo "  cat reports/$DATE/accessibilite.md"

exit "$FAILURES"
