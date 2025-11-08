import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog"; // Path to your Dialog component
import { Button } from "./ui/button";

type Action = {
  label: string;
  onClick: () => void;
};

type LogoProps = {
  src?: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  defaultSize?: string; // e.g., "w-16 h-16"
  actions?: Action[];
  description?: string;
  title?: string;
};
const Logo: React.FC<LogoProps> = ({
  src = "/logo.webp",
  alt = "Logo",
  className = "",
  style,
  defaultSize = "w-16 h-16",
  actions: userActions,
  title = "Image Options",
  description = "Choose an action for this image.",
}) => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleContextMenu = (event: React.MouseEvent<HTMLImageElement>) => {
    event.preventDefault();
    setPosition({ x: event.clientX, y: event.clientY });
    setOpen(true);
  };

  // Define default actions here where setOpen exists
  const actions: Action[] = userActions ?? [
    { label: "Reload", onClick: () => window.location.reload() },
    {
      label: "Contact Developer",
      onClick: () =>
        window.open("mailto:developer@example.com", "_blank"),
    },
    { label: "Cancel", onClick: () => setOpen(false) },
  ];

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={`user-select-none cursor-target ${defaultSize} ${className}`}
        style={style}
        onContextMenu={handleContextMenu}
        draggable={false}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="max-w-xs p-4"
          style={{
            left: position.x,
            top: position.y,
            position: "fixed",
            transform: "none", // override default Dialog centering
          }}
        >
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <div className="flex flex-col gap-3 w-full">
              {actions.map((action) => (
                <Button
                  key={action.label}
                  onClick={() => {
                    action.onClick();
                    setOpen(false);
                  }}
                  variant="outline"
                  className="w-full cursor-target"
                >
                  {action.label}
                </Button>
              ))}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Logo;