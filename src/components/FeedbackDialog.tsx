import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./ui/dialog"; // path to your Dialog
import { Button } from "./ui/button"; // your Button component

const FeedbackDialog = () => {
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Check if feedback has been submitted
  useEffect(() => {
    const saved = localStorage.getItem("feedback-submitted");
    if (saved) setSubmitted(true);
  }, []);

  // Detect scrolling to the last section
  useEffect(() => {
    if (submitted) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const bodyHeight = document.body.scrollHeight;

      // if user reached last section (bottom)
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
    alert("Thank you for your feedback!");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md w-full p-6">
        <DialogHeader>
          <DialogTitle>We value your feedback</DialogTitle>
          <DialogDescription>
            Please leave your thoughts about our website. Your feedback helps
            us improve!
          </DialogDescription>
        </DialogHeader>

        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Write your feedback here..."
          className="w-full mt-4 p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={5}
        />

        <DialogFooter className="mt-4 flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="default" className="cursor-target" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </DialogClose>
          <Button variant="default" className="cursor-target" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackDialog;