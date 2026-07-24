import { FiMapPin, FiClock, FiArrowUpRight } from "react-icons/fi";
import AddToCalendar from "./AddToCalendar";

export default function LocationCard({
  icon: Icon,
  eyebrow,
  name,
  time,
  address,
  mapUrl,
  event,
}) {
  return (
    <div className="location-card">
      <div className="location-card__icon">
        <Icon aria-hidden="true" />
      </div>
      <p className="eyebrow">{eyebrow}</p>
      <h3 className="location-card__name">{name}</h3>
      <p className="location-card__time">
        <FiClock aria-hidden="true" />
        {time}
      </p>
      {address && <p className="location-card__address">{address}</p>}
      <div className="location-card__actions">
        <a
          className="btn-solid"
          href={mapUrl}
          target="_blank"
          rel="noreferrer"
        >
          <FiMapPin aria-hidden="true" />
          View on Google Maps
          <FiArrowUpRight aria-hidden="true" />
        </a>
        <AddToCalendar event={event} label="Remind Me" />
      </div>
    </div>
  );
}
