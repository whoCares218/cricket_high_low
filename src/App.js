import React, { useState } from 'react';

function DarkSeason2() {
  const [visibleVideo, setVisibleVideo] = useState(null);

  const toggleVideo = (episode) => {
    setVisibleVideo(prev => (prev === episode ? null : episode));
  };

  return (
    <div>
      <h1
        style={{ cursor: 'pointer', color: 'black' }}
        onClick={() => toggleVideo('ep1')}
      >
        DARK S2 EP1
      </h1>
      {visibleVideo === 'ep1' && (
        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden" }}>
          <iframe
            src="https://geo.dailymotion.com/player.html?video=x81y39i"
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              left: 0,
              top: 0,
              overflow: "hidden",
              border: "none"
            }}
            allowFullScreen
            title="DARK S2 EP1"
            allow="web-share"
          ></iframe>
        </div>
      )}

      <h1
        style={{ cursor: 'pointer', color: 'black' }}
        onClick={() => toggleVideo('ep2')}
      >
        DARK S2 EP2
      </h1>
      {visibleVideo === 'ep2' && (
        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden" }}>
          <iframe
            src="https://geo.dailymotion.com/player.html?video=x81y46f"
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              left: 0,
              top: 0,
              overflow: "hidden",
              border: "none"
            }}
            allowFullScreen
            title="DARK S2 EP2"
            allow="web-share"
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default DarkSeason2;
