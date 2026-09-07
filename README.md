# StructureCalc – IS 800 Steel Beam Design

This folder contains the steel beam design page for StructureCalc.

## Files
- `calculators/steel-beam-design.html`
- `css/beam-design.css`
- `js/beam-design.js`

## GitHub upload
Copy these three files into your existing StructureCalc repository, preserving the folders.

Then open:
`calculators/steel-beam-design.html`

## Important engineering note
The current JavaScript is a UI/prototype calculation model. The support diagrams are visual and the support-specific coefficients are preliminary placeholders.

Before using this as a professional IS 800 design calculator, replace the calculation engine with validated implementations for:
- IS 800:2007 section classification
- bending strength
- lateral torsional buckling
- shear strength and web buckling where applicable
- deflection/serviceability
- load combinations
- concentrated load/web bearing checks
- actual structural analysis for fixed, pinned-fixed and fixed-pinned beams
- verified IS 808 section properties

Do not use the present output as a final code-compliance certificate.
