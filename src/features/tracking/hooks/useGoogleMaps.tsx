import { useLoadScript } from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import { Journey } from "@/types/journey";
import { StartGeocoding } from "../services/tracking_service";

interface MarkerData {
  position: google.maps.LatLngLiteral;
  trade_name: string;
  address: string;
}

interface UseGoogleMapsProps {
  journeys: Journey[];
}

const useGoogleMaps = ({ journeys }: UseGoogleMapsProps) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: `${import.meta.env.VITE_GOOGLE_MAP_API_KEY}`,
  }); 

  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [failedAddresses, setFailedAddresses] = useState<string[]>([]);
  const mapRef = useRef<google.maps.Map | null>(null);
  const [onLoadingErr, setOnLoadingErr] = useState<string>("")

  // Obtener ubicación del usuario
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => {
          switch (err.code) {
            case err.PERMISSION_DENIED:
              setOnLoadingErr("Usted denegó el permiso de ubicación.")
              break;
            case err.POSITION_UNAVAILABLE:
              setOnLoadingErr("La información de ubicación no está disponible.");
              break;
            case err.TIMEOUT:
              setOnLoadingErr("La solicitud de ubicación expiró.");
              break;
            default:
             setOnLoadingErr(`Error desconocido: ${err}`);
          }
        }
      );
    }
  }, []);


  // Geocodificar los journeys con reintento
  useEffect(() => {
    if (!isLoaded || journeys.length === 0) return;

    // const geocoder = new google.maps.Geocoder();
    const failed: string[] = [];

    const geocodeJourney = async (address: string, city: string) => {
      try {
        let geocodeRes = await StartGeocoding(address, city);
        return geocodeRes.lat && geocodeRes.lng
          ? { lat: geocodeRes.lat, lng: geocodeRes.lng }
          : null;
      } catch (error) {
        console.error("Error fetching coordinates:", error);
        return null;
      }
    };

    const promises = journeys.map((j) =>
      geocodeJourney(j.address, "Mercedes").then((pos) =>
        pos
          ? { position: pos, trade_name: j.trade_name, address: j.address }
          : null
      )
    );

    Promise.all(promises).then((res) => {
      const validMarkers = res.filter((m) => m !== null) as MarkerData[];
      setMarkers(validMarkers);
      setFailedAddresses(failed);
    });
  }, [journeys, isLoaded]);

  // Generar ruta optimizada
  const calculateRoute = () => {
    if (!userLocation || markers.length === 0) return;

    const validMarkers = markers.filter(
      (m) =>
        m.position &&
        typeof m.position.lat === "number" &&
        typeof m.position.lng === "number"
    );

    if (validMarkers.length === 0) return;

    const directionsService = new google.maps.DirectionsService();
    const waypoints = validMarkers.map((m) => ({
      location: m.position,
      stopover: true,
    }));

    directionsService.route(
      {
        origin: userLocation,
        destination: userLocation,
        waypoints,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
        } else {
          console.error("Error generando ruta:", status);
          alert(
            "No se pudo generar la ruta. Verifica que las direcciones sean correctas y estén dentro de un área accesible por carretera."
          );
        }
      }
    );
  };

  // Actualizar ruta al mover un marcador
  const handleMarkerDragEnd = (index: number, e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;
    const newMarkers = [...markers];
    newMarkers[index].position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    setMarkers(newMarkers);
  };

  // Calcular ruta automáticamente cuando los marcadores o la ubicación cambian
  useEffect(() => {
    calculateRoute();
  }, [markers, userLocation]);

  return {
    isLoaded,
    userLocation,
    markers,
    directions,
    failedAddresses,
    mapRef,
    calculateRoute,
    handleMarkerDragEnd,
    onLoadingErr
  };
};

export default useGoogleMaps;

