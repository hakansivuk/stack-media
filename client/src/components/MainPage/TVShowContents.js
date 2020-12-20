import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Container, Divider } from "semantic-ui-react";

import Media from "../Media/Media";

export default function TVShowContents() {
  const [tvShowInformation, setTVShowInformation] = useState([]);

  useEffect(() => {
    // TODO fetch movies, then setTVShowInformation accordingly wait hakan for the new query! (cevat will do it next monday, if your not patient, you can do it urself)
    setTVShowInformation(["Talha", "Hakan", "Cevat", "Yusuf"]);
  }, []);

  return (
    <Container>
      <h1 className="text-center">TV Shows</h1>
      <div className="MovieGrid">
        {tvShowInformation.map((tvShowArg, index) => (
          <Media
            key={index}
            mediaType={1}
            mediaName={tvShowArg}
            pageType={1}
          ></Media>
        ))}
      </div>
    </Container>
  );
}
