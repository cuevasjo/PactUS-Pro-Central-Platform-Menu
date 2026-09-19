# PactUS Pro CP-5 Localization Architecture

## Objective
Provide one governed localization foundation for the Central Platform and independent PactUS Pro modules.

## Initial locales
- English: `en-US`
- Spanish: `es-US`

The architecture is extensible to additional locales without changing module contracts.

## Rules
1. User-facing platform strings use stable localization keys.
2. English is the default/fallback catalog.
3. A user locale may override the organization default.
4. Unsupported locales fail safely to the English catalog.
5. Locale and time zone are separate concerns.
6. Dates, numbers, percentages, and currencies use `Intl` locale-aware formatting.
7. Currency formatting does not perform currency conversion.
8. Product repositories should expose localization keys rather than create incompatible localization frameworks.
9. Original authored training/support content may remain in its source language while translated variants are stored separately.
10. Access decisions never depend on translated labels.

## Resolution order
Recommended runtime resolution:
1. explicit user locale;
2. organization default locale;
3. supported browser preference;
4. `en-US`.

## Central shell
The shell language selector changes the active locale. Global navigation, LRO/PFIE preserved navigation, accessibility labels, search text, Help controls, and shell chrome resolve through the central catalog.

## Independent repositories
Phase repositories remain independent. CP-13 adapters will connect their localization keys and locale selection to the Central Platform. Repositories should not rewrite working business logic for CP-5.

## Future locales
Adding a locale requires:
- locale definition;
- translation catalog;
- required-key coverage;
- tests;
- locale-specific QA.

## Data formatting
Use locale-aware formatting for display only. Canonical stored values remain locale-neutral.

## Security
Localized text is presentation. IAM permissions, entitlements, route authorization, audit identifiers, and policy codes remain stable machine-readable values.
