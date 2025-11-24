import useGoogleMaps from "../../hooks/useGoogleMaps";
import { DirectionsRenderer, GoogleMap, Marker } from "@react-google-maps/api";
import { useContext, useState } from "react";
import { TrackingContext } from "../../context/TrackingContext";
import Loader from "../common/Loader";
import OnTrackingList from "../dialogs/OnTrackingList";
import MapWrapper from "../common/MapWrapper";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

const MapSection = () => {
  const { trackingItemsList } = useContext(TrackingContext)!;

  const {
    isLoaded,
    userLocation,
    markers,
    directions,
    mapRef,
    onLoadingErr,
    handleMarkerDragEnd,
  } = useGoogleMaps({ journeys: trackingItemsList });

  const [zoom, setZoom] = useState<number>(12);

  if (onLoadingErr !== "")
    return (
      <MapWrapper>
        <div className="w-full h-full flex justify-center items-center flex-1">
          <AnimatePresence>
         
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 p-2 bg-red-100 border border-red-300 rounded-lg"
            >
              <AlertCircle className="w-5 h-5 text-red-500" />
              <span className="text-sm text-red-600">{onLoadingErr}</span>
            </motion.div>
     
        </AnimatePresence>
        </div>
        <div className="absolute bottom-10 left-0 right-0 flex justify-center z-20">
          <OnTrackingList />
        </div>
      </MapWrapper>
    );
  if (!isLoaded) return <Loader />;
  if (!userLocation) return <Loader />;

  return (
    <MapWrapper>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={userLocation}
        zoom={zoom}
        onLoad={(map) => {
          mapRef.current = map;
        }}
        onZoomChanged={() => {
          if (mapRef.current) setZoom(mapRef.current.getZoom() || 12);
        }}
      >
        <Marker position={userLocation} title="Tu ubicación" />
        {markers.map((m, idx) => (
          <Marker
            key={idx}
            position={m.position}
            title={m.trade_name}
            draggable
            onDragEnd={(e) => handleMarkerDragEnd(idx, e)}
          />
        ))}
        {directions && <DirectionsRenderer directions={directions} />}

        {/* Botón flotante por encima del mapa */}
        <div className="absolute bottom-24 left-0 right-0 flex justify-center z-20">
          <OnTrackingList />
        </div>
      </GoogleMap>
    </MapWrapper>
  );
};

export default MapSection;
