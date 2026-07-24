import { useState, useRef, useEffect } from "react";
import {
  FiChevronDown,
  FiHeart,
} from "react-icons/fi";
import {
  GiChurch,
  GiPartyPopper,
  GiCakeSlice,
  GiCarWheel,
  GiRing,
} from "react-icons/gi";
import { PiChampagneBold } from "react-icons/pi";
import { LuUtensils, LuMusic4, LuCamera, LuUsers } from "react-icons/lu";

import Countdown from "./components/Countdown";
import LocationCard from "./components/LocationCard";
import Timeline from "./components/Timeline";
import Carousel from "./components/Carousel";
import Envelope from "./components/Envelope";
import "./App.css";

// ---- Editable wedding details -------------------------------------------
const COUPLE = { bride: "Klara", groom: "Kerolos" };
const WEDDING_DATE = new Date("2026-11-22T15:30:00");

const CEREMONY = {
  eyebrow: "Wedding Ceremony",
  name: "Church of Archangel Michael in Sheraton",
  time: "3:30 PM",
  address: "كنيسة الملاك ميخائيل- بشيراتون",
  mapUrl: "https://maps.app.goo.gl/pbrzPqCjKhb3zL4y7?g_st=ic",
  event: {
    title: "Kerolos & Klara — Wedding Ceremony",
    description: "Join us as we exchange vows.",
    location: "كنيسة الملاك ميخائيل- بشيراتون",
    start: new Date("2026-11-22T15:30:00"),
    end: new Date("2026-11-22T17:00:00"),
  },
};

const RECEPTION = {
  eyebrow: "Wedding Reception",
  name: "Infantry House",
  time: "7:00 PM",
  address: "دار ضباط المشاه للقوات المسلحه",
  mapUrl: "https://maps.app.goo.gl/ti8kS8U3JVGEmofA7?g_st=ipc",
  event: {
    title: "Kerolos & Klara — Wedding Reception",
    description: "Dinner, dancing and celebration.",
    location: "دار ضباط المشاه للقوات المسلحه",
    start: new Date("2026-11-22T19:00:00"),
    end: new Date("2026-11-22T23:59:00"),
  },
};

const TIMELINE = [
  { time: "2:45 PM", title: "Guests Arrive at Church", icon: LuUsers },
  { time: "3:30 PM", title: "Wedding Ceremony", icon: GiChurch },
  { time: "4:15 PM", title: "Rings & Vows Exchange", icon: GiRing },
  { time: "4:45 PM", title: "Photos with Family & Friends", icon: LuCamera },
  { time: "6:30 PM", title: "Guests Arrive at Hotel", icon: LuUsers },
  { time: "7:00 PM", title: "Reception Begins", icon: PiChampagneBold },
  { time: "8:00 PM", title: "Dinner is Served", icon: LuUtensils },
  { time: "9:30 PM", title: "First Dance & Party", icon: LuMusic4 },
  { time: "11:00 PM", title: "Cake Cutting", icon: GiCakeSlice },
  { time: "12:00 AM", title: "Send-Off", icon: GiCarWheel },
];

const MEMORIES = [
  {
    src: "https://placehold.co/500x650/C77C9E/FBF2E8?text=Photo+1",
    caption: "The day it all began",
  },
  {
    src: "https://placehold.co/500x650/E7B7CC/4A2E3A?text=Photo+2",
    caption: "Every laugh, every little moment",
  },
  {
    src: "https://placehold.co/500x650/4A2E3A/FBF2E8?text=Photo+3",
    caption: "Building a life together",
  },
];
// --------------------------------------------------------------------------

function SectionHeading({ eyebrow, title }) {
  return (
    <div className="section-heading">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
    </div>
  );
}

export default function App() {
  const [invitationOpened, setInvitationOpened] = useState(false);
  const [activeScreen, setActiveScreen] = useState(0);
  const numScreens = 6;
  const isScrolling = useRef(false);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);
  const audioRef = useRef(null);

  const handleEnvelopeOpen = () => {
    if (audioRef.current) {
      const audio = audioRef.current;
      audio.volume = 0.5;
      audio.play().catch(err => console.error("Audio autoplay blocked:", err));

      const duration = 3000;
      const interval = 50;
      const steps = duration / interval;
      const volumeStep = 0.5 / steps;
      let currentStep = 0;

      const fadeInterval = setInterval(() => {
        currentStep++;
        let newVolume = 0.5 + (currentStep * volumeStep);
        if (newVolume >= 1.0) {
          newVolume = 1.0;
          clearInterval(fadeInterval);
        }
        audio.volume = newVolume;
      }, interval);
    }
  };

  const handleWheel = (e) => {
    if (!invitationOpened || isScrolling.current) return;
    
    // Ignore horizontal trackpad scrolls so carousel doesn't trigger vertical slide
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

    // Allow scrolling within tall sections
    const target = e.target.closest('.section, .hero, .footer');
    if (target) {
      const { scrollTop, scrollHeight, clientHeight } = target;
      if (scrollHeight > clientHeight + 2) {
        if (e.deltaY > 0 && scrollTop + clientHeight < scrollHeight - 1) return;
        if (e.deltaY < 0 && scrollTop > 1) return;
      }
    }

    if (e.deltaY > 15) {
      if (activeScreen < numScreens - 1) {
        isScrolling.current = true;
        setActiveScreen(s => s + 1);
        setTimeout(() => isScrolling.current = false, 1000);
      }
    } else if (e.deltaY < -15) {
      if (activeScreen > 0) {
        isScrolling.current = true;
        setActiveScreen(s => s - 1);
        setTimeout(() => isScrolling.current = false, 1000);
      }
    }
  };

  const touchStartScrollTop = useRef(0);
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
    const target = e.target.closest('.section, .hero, .footer');
    if (target) {
      touchStartScrollTop.current = target.scrollTop;
    } else {
      touchStartScrollTop.current = 0;
    }
  };

  const handleTouchEnd = (e) => {
    if (!invitationOpened || isScrolling.current) return;
    const touchEndY = e.changedTouches[0].clientY;
    const touchEndX = e.changedTouches[0].clientX;
    const diffY = touchStartY.current - touchEndY;
    const diffX = touchStartX.current - touchEndX;

    if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 40) {
      // Allow scrolling within tall sections
      const target = e.target.closest('.section, .hero, .footer');
      if (target) {
        const { scrollHeight, clientHeight } = target;
        if (scrollHeight > clientHeight + 2) {
          if (diffY > 0 && touchStartScrollTop.current + clientHeight < scrollHeight - 1) return; // Swiping up (scrolling down)
          if (diffY < 0 && touchStartScrollTop.current > 1) return; // Swiping down (scrolling up)
        }
      }

      if (diffY > 0 && activeScreen < numScreens - 1) {
        isScrolling.current = true;
        setActiveScreen(s => s + 1);
        setTimeout(() => isScrolling.current = false, 1000);
      } else if (diffY < 0 && activeScreen > 0) {
        isScrolling.current = true;
        setActiveScreen(s => s - 1);
        setTimeout(() => isScrolling.current = false, 1000);
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!invitationOpened || isScrolling.current) return;
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        if (activeScreen < numScreens - 1) {
          isScrolling.current = true;
          setActiveScreen(s => s + 1);
          setTimeout(() => isScrolling.current = false, 1000);
        }
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        if (activeScreen > 0) {
          isScrolling.current = true;
          setActiveScreen(s => s - 1);
          setTimeout(() => isScrolling.current = false, 1000);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [invitationOpened, activeScreen]);

  return (
    <div 
      className="page presentation-mode"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <audio 
        ref={audioRef} 
        src="/lana_song.mp4" 
        loop
      />

      {!invitationOpened && (
        <Envelope 
          onOpen={handleEnvelopeOpen}
          onComplete={() => setInvitationOpened(true)} 
        />
      )}
      
      <div 
        className="fullpage-container" 
        style={{ transform: `translateY(-${activeScreen * 100}dvh)` }}
      >
        {/* Slide 0: HERO */}
        <section className="hero">
          <div className="hero__frame">
            <p className="hero__welcome">Welcome to Our Big Day</p>
            <h1 className="hero__names">
              {COUPLE.groom}
              <span className="hero__amp">
                <FiHeart aria-hidden="true" />
              </span>
              {COUPLE.bride}
            </h1>
            <p className="hero__date">November 22, 2026</p>
            <Countdown target={WEDDING_DATE} />
          </div>
          <div className="hero__scroll" aria-hidden="true">
            <FiChevronDown />
          </div>
        </section>

        {/* Slide 1: MEMORIES */}
        <section className="section memories">
          <SectionHeading eyebrow="A Peek Into Us" title="Our Memories Together" />
          <p className="section-intro">
            From random coffee dates to late-night talks, every moment led us
            here. Here are a few we hold close to our hearts.
          </p>
          <Carousel items={MEMORIES} />
        </section>

        {/* Slide 2: CEREMONY */}
        <section className="section band">
          <SectionHeading eyebrow="Please Join Us" title="Wedding Ceremony" />
          <LocationCard icon={GiChurch} {...CEREMONY} />
        </section>

        {/* Slide 3: RECEPTION */}
        <section className="section">
          <SectionHeading eyebrow="Let's Celebrate" title="Wedding Reception" />
          <LocationCard icon={GiPartyPopper} {...RECEPTION} />
        </section>

        {/* Slide 4: TIMELINE */}
        <section className="section band">
          <SectionHeading eyebrow="The Full Schedule" title="Order of the Day" />
          <Timeline items={TIMELINE} />
        </section>

        {/* Slide 5: FOOTER */}
        <footer className="footer">
          <p>With love, {COUPLE.groom} &amp; {COUPLE.bride}</p>
          <p className="footer__sub">We can't wait to celebrate with you.</p>
        </footer>
      </div>
    </div>
  );
}
