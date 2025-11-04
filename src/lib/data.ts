export interface NavLinkProp {
    title: string;
    route: string; // id used for scrolling (e.g. 'about')
}

// Centralized navigation data used throughout the app
const navLinks: NavLinkProp[] = [
    { title: "About", route: "about" },
    { title: "Services", route: "services" },
    { title: "Testimonials", route: "testimonials" },
    { title: "Contact", route: "contact" },
];

export default navLinks;