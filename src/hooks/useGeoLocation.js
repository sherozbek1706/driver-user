import { useEffect, useState } from "react";

export const useGeoLocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
  });

  const onSuccess = (location) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      error,
    });
  };

  useEffect(() => {
    onError({
      code: 0,
      message: "Geolocation not supported",
    });

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return location;
};
