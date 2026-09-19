# PactUS Pro Central Platform Release Baseline

## Release candidate lineage
The Central Platform production-certification branch is derived from:
`4d933ea5bc06c817c101a897b4a3ac04d70b46cf`

## Phase completion
- CP-0 Architecture: certified
- CP-1 Registry: certified
- CP-2 IAM / Effective Access: certified
- CP-3 Application Shell: certified
- CP-4 Navigation: certified
- CP-5 Localization: certified
- CP-6 Experience Center: certified
- CP-7 Support / SLA: certified
- CP-8 Service / Training Credits: certified
- CP-9 Improvements / Feature Requests: certified
- CP-10 Surveys / Customer Experience: certified
- CP-11 Global Time & Billing: certified
- CP-12 Admin Center: certified
- CP-13 Product / Phase Adapters: certified
- CP-14 Security / Integration Testing: certified
- CP-15 Production Certification: pending final gate

## External repository policy
Phase 28, Phase 29 UCSII, Phase 30 Benefits, and Phase 31 LRO/TipTap remain independent repositories.

The Central Platform integrates through governed adapter contracts and must not silently fork or replace their business logic.

## Release controls
The final baseline is eligible for a release tag only after:
1. CP-15 full certification gate passes;
2. no tracked working-tree modifications remain;
3. certification artifacts are present;
4. final HEAD is recorded;
5. product owner authorizes merge/tag/release actions.

## Merge policy
CP-15 certification does not automatically merge to `main`.

Merge/tag/release remains an explicit product-owner decision.
