// src/components/Footer.jsx
/**
* Footer Component
* Renders the application footer with copyright information
*
* Features:
* - Dynamic copyright year that updates automatically
* - Consistent styling with the application theme
* - Responsive design with Tailwind CSS
* - Fixed positioning at the bottom of the page
*
* Styling:
* - Background color matches navbar (bg-gray-800)
* - White text for contrast
* - Centered content
* - Top margin to separate from main content
* - Responsive padding
*
*/
export default function Footer() {
return (
// Main footer container with styling
<footer className="bg-gray-800 text-white text-center py-3 mt-10">
{/*
Copyright text
- Dynamic year using Date object
- Small text size for subtle appearance
- Centered alignment
*/}
<p className="text-sm">
© {new Date().getFullYear()} Blog App. All rights reserved.
</p>
</footer>
);
}