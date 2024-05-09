import {useEffect, useState} from "react";
import {Skeleton} from "@/components/ui/skeleton.tsx";


export const HeroUserCity = ({lat, lng}: {lat: number, lng: number}) => {
    const [geolocation, setGeolocation] = useState({
        cidade: 'Fortaleza',
        pais: 'Brasil',
        lat,
        lng
    })

    const [loading, setLoading] = useState(false)

    const getCityFromLatLng = async (lat: number, lng: number) => {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${import.meta.env.PUBLIC_GMAPS_KEY}`)
        const data = await response.json()
        const formattedAddress = data.results.find((result: {[key: string]: unknown}) => {
            if (Array.isArray(result.types)) {
                return result.types.includes('locality')
            }
            return false;
        })
        if (!formattedAddress) return null;
        return {
            cidade: formattedAddress.address_components[0].short_name,
            pais: formattedAddress.address_components[formattedAddress.address_components.length - 1].short_name,
            lat: formattedAddress.geometry.location.lat,
            lng: formattedAddress.geometry.location.lng
        };
    }

    useEffect(() => {
        setLoading(true)
        navigator.geolocation.getCurrentPosition(async (position) => {
            const {latitude, longitude} = position.coords
            const cityData = await getCityFromLatLng(latitude, longitude)
            if (!cityData) return setLoading(false);
            setGeolocation(cityData)
        }, (error) => {
            setLoading(false)
            console.warn('Error getting geolocation: ', error)
        }, {
            enableHighAccuracy: true,
        })
    }, [])

    return (
        <>
            {loading ? (
                <h1 className="text-4xl text-primary font-display mb-4">Saiba o que está acontecendo em
                    <span className="inline-block align-middle">
                        <Skeleton className="w-[200px] h-[40px] inline-block mx-3"/>
                    </span>
                    hoje!
                </h1>
            ) : geolocation.cidade ? (
                <h1 className="text-4xl text-primary font-display mb-4">
                    Saiba o que está acontecendo em <b>{geolocation.cidade}</b> hoje!</h1>
            ) : (
                <h1 className="text-4xl text-primary font-display mb-4">
                    Saiba o que está acontecendo em sua cidade hoje!
                </h1>
            )}
        </>
    );
};