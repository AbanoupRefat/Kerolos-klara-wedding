export default function Timeline({ items }) {
  return (
    <ol className="timeline">
      {items.map((item, i) => (
        <li className="timeline__item" key={i}>
          <div className="timeline__marker">
            <item.icon aria-hidden="true" />
          </div>
          <div className="timeline__body">
            <span className="timeline__time">{item.time}</span>
            <h4 className="timeline__title">{item.title}</h4>
            {item.note && <p className="timeline__note">{item.note}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}
