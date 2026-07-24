import { useState } from "react";
import { FiSend } from "react-icons/fi";
import "./Guestbook.css";

export default function Guestbook() {
  const [formData, setFormData] = useState({ name: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;
    
    setStatus("loading");

    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxnHHw3fhpKvm5uf4rwelIBYiagXfqs0XCL18oIS8-6AnDARX_vedw86aNHKrRSfBjI/exec";

    try {
      if (GOOGLE_SCRIPT_URL === "YOUR_GOOGLE_SCRIPT_URL_HERE") {
        // Simulate a network request for now if the URL is not set
        await new Promise(resolve => setTimeout(resolve, 1500));
        setStatus("success");
        return;
      }

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Important for Google Apps Script to avoid CORS errors
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // no-cors mode returns an opaque response, so we just assume success if it didn't throw an error.
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div className="guestbook-container">
      {status === "success" ? (
        <div className="guestbook-success">
          <h3>Thank You!</h3>
          <p>Your message has been sent to Kerolos and Klara.</p>
        </div>
      ) : (
        <form className="guestbook-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="guestName">Your Name</label>
            <input
              id="guestName"
              type="text"
              placeholder=""
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              disabled={status === "loading"}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="guestMessage">Message</label>
            <textarea
              id="guestMessage"
              placeholder="Leave a lovely message..."
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              disabled={status === "loading"}
            />
          </div>

          {status === "error" && (
            <p className="form-error">Something went wrong. Please try again.</p>
          )}

          <button 
            type="submit" 
            className="btn-solid submit-btn" 
            disabled={status === "loading"}
          >
            {status === "loading" ? "Sending..." : (
              <>
                <FiSend aria-hidden="true" />
                Send Message
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
