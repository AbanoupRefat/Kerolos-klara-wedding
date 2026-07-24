import { useState, useRef, useEffect } from "react";
import { FiCalendar, FiDownload } from "react-icons/fi";
import { FaApple, FaGoogle } from "react-icons/fa";
import { downloadICS, googleCalendarUrl } from "../utils/calendar";

export default function AddToCalendar({ event, label = "Add to Calendar" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="add-to-cal" ref={ref}>
      <button
        type="button"
        className="btn-outline"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <FiCalendar aria-hidden="true" />
        {label}
      </button>
      {open && (
        <div className="add-to-cal__menu" role="menu">
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              downloadICS(event);
              setOpen(false);
            }}
          >
            <FaApple aria-hidden="true" />
            <span>
              iPhone / Outlook <em>(.ics file)</em>
            </span>
            <FiDownload aria-hidden="true" className="add-to-cal__dl" />
          </button>
          <a
            role="menuitem"
            href={googleCalendarUrl(event)}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
          >
            <FaGoogle aria-hidden="true" />
            <span>Google / Android</span>
          </a>
        </div>
      )}
    </div>
  );
}
