import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import React from "react";
import {Skeleton} from "@/components/ui/skeleton";

export const GMapsWrapper = ({lat, lng}: {lat: number, lng: number}) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.PUBLIC_GMAPS_KEY
    })

    const onLoad = React.useCallback((map: google.maps.Map) => {
        if (!lat || !lng) return;
        const bounds = new window.google.maps.LatLngBounds({
            lat,
            lng: lng,
        });
        map.fitBounds(bounds);
        const listener = google.maps.event.addListener(map, "idle", function() {
            map.setZoom(13);
            google.maps.event.removeListener(listener);
            map.setOptions({
                styles: [
                    {
                        featureType: "poi.business",
                        stylers: [
                            { visibility: "off" }
                        ],
                    },
                    {
                        featureType: "poi.medical",
                        stylers: [
                            { visibility: "off" }
                        ],
                    },
                    {
                        featureType: "poi.school",
                        stylers: [
                            { visibility: "off" }
                        ],
                    },
                    {
                        featureType: "poi.place_of_worship",
                        stylers: [
                            { visibility: "off" }
                        ],
                    },
                    {
                        featureType: "poi.government",
                        stylers: [
                            { visibility: "off" }
                        ],
                    },
                ],
                disableDefaultUI: true,
            })
        });

        google.maps.event.addListener(map, "click", function() {
            map.setOptions({
                disableDefaultUI: false,
            })
        })
    }, [])

    const onUnmount = React.useCallback(() => {
    }, [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={{
                height: "100%",
                width: "100%",
                borderRadius: "20px"
            }}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            { /* Child components, such as markers, info windows, etc. */ }
            <></>
        </GoogleMap>
    ) : <Skeleton className="w-[90%] h-[70%] rounded-2xl" />
};