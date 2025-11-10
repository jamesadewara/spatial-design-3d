import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./ui/dialog";
import { Button } from "./ui/button";

const FeedbackDialog = () => {
  const [open, setOpen] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const maxLength = 250; // character limit

  useEffect(() => {
    const saved = localStorage.getItem("feedback-submitted");
    if (saved) setSubmitted(true);
  }, []);

  useEffect(() => {
    if (submitted) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const bodyHeight = document.body.scrollHeight;

      if (scrollTop + windowHeight >= bodyHeight - 10) {
        setOpen(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [submitted]);

  const handleSubmit = () => {
    if (feedback.trim() === "") return;

    localStorage.setItem("feedback-submitted", "true");
    localStorage.setItem("feedback-value", feedback);
    setOpen(false);
    setSubmitted(true);

    const message = encodeURIComponent(
      `Hey! I just visited your website and here’s my feedback:\n\n"${feedback}"`
    );

    // Your WhatsApp number without "+"
    const whatsappURL = `https://wa.me/2349138113769?text=${message}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md w-full p-6">
        <DialogHeader>
          <DialogTitle>We value your feedback</DialogTitle>
          <DialogDescription>
            Please share your thoughts about our website. Max {maxLength} characters.
          </DialogDescription>
        </DialogHeader>

        <textarea
          value={feedback}
          onChange={(e) => {
            if (e.target.value.length <= maxLength) setFeedback(e.target.value);
          }}
          placeholder="Write your feedback here..."
          className="w-full mt-4 p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={5}
        />

        <p className="text-sm text-gray-500 mt-1 text-right">
          {feedback.length}/{maxLength}
        </p>

        <DialogFooter className="mt-4 flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </DialogClose>
          <Button variant="default" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackDialog;
