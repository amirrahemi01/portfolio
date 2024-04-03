import React, { useState, useEffect, useRef } from 'react';
import BIRDS from 'vanta/dist/vanta.clouds.min';

const Vanta: React.FC<{}> = () => {
  const [vantaEffect, setVantaEffect] = useState<any>(null); // Adjust type if necessary
  const myRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!vantaEffect && myRef.current) {
      setVantaEffect(BIRDS({
        el: myRef.current
      }));
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div ref={myRef}>
      Foreground content goes here
    </div>
  );
};

export default Vanta;
