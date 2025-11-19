# 🎨 Système de Design MediPass - Ultra Professionnel

## Vue d'ensemble
MediPass utilise un système de design médical moderne avec une palette de couleurs professionnelle et cohérente.

---

## 📊 Palette de Couleurs

### Couleurs Primaires - Bleu Médical
Utilisée pour les éléments principaux, boutons d'action et en-têtes.

| Teinte | Hex | Usage |
|--------|-----|-------|
| 50 | `#f0f7ff` | Arrière-plans très clairs |
| 100 | `#e0eeff` | Arrière-plans clairs |
| 200 | `#c7deff` | Bordures légères |
| 300 | `#a3caff` | Hover états |
| 400 | `#7baae5` | Éléments secondaires |
| 500 | `#5a8dd1` | Éléments actifs |
| 600 | `#4472ba` | **Boutons principal** |
| 700 | `#3a5fa0` | **Boutons hover** |
| 800 | `#2d4a85` | Texte accentué |
| 900 | `#1f3555` | **Texte en-têtes** |
| 950 | `#151e2b` | Arrière-plan sombre |

### Couleurs Secondaires - Teal Médical
Utilisée pour la santé, bien-être et éléments d'accent.

| Teinte | Hex | Usage |
|--------|-----|-------|
| 50 | `#f0fdfa` | Arrière-plans très clairs |
| 100 | `#d9f8f3` | Arrière-plans clairs |
| 200 | `#a6f3e4` | Bordures |
| 300 | `#6dd9d8` | Hover |
| 400 | `#3ebdc4` | Éléments secondaires |
| 500 | `#2ba39f` | **Accent principal** |
| 600 | `#1e8b87` | Accent hover |
| 700 | `#16726e` | Texte accentué |
| 800 | `#0f4d47` | Texte fort |
| 900 | `#083832` | Très sombre |

### Couleurs d'Accent - Vert Santé
Utilisée pour le succès, confirmations et vitalité.

| Teinte | Hex | Usage |
|--------|-----|-------|
| 50 | `#f5f9e8` | Arrière-plans très clairs |
| 100 | `#e8f4d0` | Arrière-plans clairs |
| 200 | `#d4e8a1` | Bordures |
| 300 | `#b8d972` | Hover |
| 400 | `#99c74a` | Éléments actifs |
| 500 | `#7fb023` | **Accent vert** |
| 600 | `#668700` | Accent hover |
| 700 | `#536200` | Texte fort |
| 800 | `#3d4400` | Très sombre |
| 900 | `#242600` | Extrême |

### Couleurs Neutres - Slate Pro
Utilisée pour le texte, bordures et arrière-plans.

| Teinte | Hex | Usage |
|--------|-----|-------|
| 50 | `#f9fafb` | Arrière-plan très clair |
| 100 | `#f3f4f6` | Arrière-plans clairs |
| 200 | `#e5e7eb` | Bordures légères |
| 300 | `#d1d5db` | Bordures normales |
| 400 | `#9ca3af` | Texte tertiaire |
| 500 | `#6b7280` | **Texte secondaire** |
| 600 | `#4b5563` | Texte forte |
| 700 | `#374151` | **Texte principal** |
| 800 | `#1f2937` | **Texte fort** |
| 900 | `#111827` | **Texte très fort** |
| 950 | `#030712` | Extrême |

### Couleurs de Feedback
Utilisées pour le statut et les messages.

- **Success**: `#16a34a` (vert)
- **Warning**: `#d97706` (orange)
- **Error**: `#dc2626` (rouge)

---

## 🎨 Gradients Pré-définis

### gradient-pro
**Usage**: Arrière-plan global du site
```css
linear-gradient(135deg, #f0f7ff 0%, #e8f4f8 50%, #f0f7ff 100%)
```

### gradient-medical
**Usage**: Pages médicales (RV, carnets, santé, médecins)
```css
linear-gradient(135deg, #f0f7ff 0%, #f0fdfa 100%)
```

### gradient-card
**Usage**: Cartes et conteneurs
```css
linear-gradient(135deg, #ffffff 0%, #f8fbff 100%)
```

### gradient-dark
**Usage**: Sections sombres, alternatives
```css
linear-gradient(135deg, #1f3555 0%, #16726e 100%)
```

---

## 🎯 Composants Stylisés

### Boutons (Button)
- **Défaut**: Gradient primary-600 → primary-700 avec ombre
- **Outline**: Bordure primary-600 avec fond transparent
- **Destructive**: Fond error-600 avec ombre
- **Secondary**: Fond slate-200 léger
- **Ghost**: Sans arrière-plan, hover slate-100
- **Link**: Texte souligné primary-600

**Caractéristiques**:
- Coins arrondis `lg` (11px)
- Ombre `shadow-lg` → `shadow-xl` au hover
- Transformation `-translate-y-0.5` au hover
- Font: Semibold

### Cartes (Card)
- **Arrière-plan**: Gradient blanc subtil
- **Bordure**: slate-200 avec épaisseur 1px
- **Ombre**: `shadow-card-pro` → `shadow-md-pro` au hover
- **Coins**: Arrondis `xl` (16px)
- **Transition**: 300ms smooth

### Input/Textarea
- Bordure slate-300
- Focus ring primary-500
- Coins arrondis `lg`

---

## 📏 Ombres (Shadows)

| Nom | Blur | Spread | Usage |
|-----|------|--------|-------|
| `sm-pro` | 2px | -1px | Éléments légers |
| `md-pro` | 6px | -2px | **Défaut des cartes** |
| `lg-pro` | 15px | -4px | Modals légers |
| `xl-pro` | 25px | -6px | Modals principales |
| `card-pro` | 8px | -2px | **Cartes & conteneurs** |

---

## 🎭 Espacements & Coins

### Coins Arrondis
- Boutons: `lg` (0.5rem / 8px)
- Inputs: `lg` (0.5rem / 8px)
- Cartes: `xl` (1rem / 16px)
- Modals: `2xl` (1.5rem / 24px)

### Espacements Internes
- Cartes: `p-6` (1.5rem)
- Boutons: `px-4 py-2` (défaut)
- Sections: `py-8` à `py-12`

---

## 🎬 Animations & Transitions

### Transitions Standard
- Durée: `300ms`
- Easing: `ease-in-out` (défaut)
- Propriétés: `transition-all`

### Au Hover
- Boutons: `-translate-y-0.5` (levée subtile)
- Cartes: Ombre augmente
- Liens: Underline apparaît

### Animations Framer Motion
- Hero sections: `opacity 0 → 1`, `y 30 → 0`
- Listes: Stagger avec `delay: index * 0.1`
- Modals: `scale 0.9 → 1` avec `opacity`

---

## 💡 Bonnes Pratiques

### ✅ À Faire
1. Utiliser les couleurs de la palette primaire pour les actions
2. Utiliser slate-900 pour le texte principal
3. Utiliser des dégradés subtils pour les arrière-plans
4. Appliquer des ombres cohérentes
5. Respecter les coins arrondis lg/xl

### ❌ À Éviter
1. Ajouter nouvelles couleurs non-définies
2. Mélanger gray et slate
3. Utiliser des couleurs brutes sans dégradés
4. Ombres trop prononcées
5. Coins arrondis incohérents

---

## 📱 Responsive Design

Le système de design est entièrement responsive:
- **Mobile**: Texte > 16px, touches > 44px
- **Tablet**: Spacing normal
- **Desktop**: Spacing augmenté, layouts plus amples

---

## 🔧 Utilisation en CSS

```css
/* Backgrounds */
background: linear-gradient(135deg, #f0f7ff 0%, #f0fdfa 100%);

/* Text Colors */
color: theme('colors.slate.900');

/* Buttons */
@apply px-4 py-2 rounded-lg bg-gradient-to-r from-primary-600 to-primary-700 
       text-white font-semibold shadow-lg hover:shadow-xl 
       hover:-translate-y-0.5 transition-all;

/* Cards */
@apply rounded-xl border border-slate-200 bg-gradient-card 
       shadow-card-pro hover:shadow-md-pro transition-shadow;
```

---

## 🎯 Exemples d'Usage

### Page d'accueil
```tsx
<div className="min-h-screen bg-gradient-medical">
  <Button className="bg-gradient-to-r from-primary-600 to-primary-700">
    Action
  </Button>
</div>
```

### Cartes de contenu
```tsx
<div className="rounded-xl border border-slate-200 bg-gradient-card shadow-card-pro">
  <h3 className="text-slate-900 font-semibold">Titre</h3>
  <p className="text-slate-600">Description</p>
</div>
```

### Messages d'information
```tsx
<div className="bg-primary-50 border-l-4 border-primary-500 p-4 rounded">
  <p className="text-sm text-primary-700">Message informatif</p>
</div>
```

---

## 📞 Support

Pour toute question sur le design system, consultez:
- `tailwind.config.js` pour les couleurs
- Composants UI dans `src/components/ui/`
- Pages exemple dans `src/pages/`

---

**Version**: 1.0  
**Dernière mise à jour**: 19 Novembre 2025  
**Statut**: ✅ Production Ready
