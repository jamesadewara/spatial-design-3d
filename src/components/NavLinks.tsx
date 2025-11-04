import React from "react";
import type { NavLinkProp } from "@/lib/data";
import { Button } from "./ui/button";

interface NavLinksProps {
    links: NavLinkProp[];
    onLinkClick: (id: string) => void;
    activeId?: string | null;
    className?: string;
    /** Render vertically as a stacked list (mobile) */
    vertical?: boolean;
}

export const NavLinks: React.FC<NavLinksProps> = ({ links, onLinkClick, activeId, className = "", vertical = false }) => {
    if (vertical) {
        return (
            <ul className={`flex flex-col w-full divide-y divide-muted-foreground/10 ${className}`} role="menu">
                {links.map((link) => (
                    <li key={link.route} className="w-full">
                        <button
                            role="menuitem"
                            onClick={() => onLinkClick(link.route)}
                            className={`cursor-target w-full text-left block px-4 py-3 transition-colors focus:outline-none ${activeId === link.route
                                    ? "bg-primary/50 text-primary-foreground"
                                    : "hover:bg-primary/10"
                                }`}
                        >
                            {link.title}
                        </button>
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <div className={`flex ${className}`}>
            {links.map((link) => (
                <Button
         variant="link"
                    key={link.route}
                    onClick={() => onLinkClick(link.route)}
                    className={`cursor-target text-foreground transition-colors px-2 py-1 rounded-md focus:outline-none ${activeId === link.route
                            ? "bg-primary/100 text-primary-foreground"
                            : "hover:bg-primary/70"
                        }`}
                >
                    {link.title}
                </Button>
            ))}
        </div>
    );
};

export default NavLinks;
