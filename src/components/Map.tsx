import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import type { Place } from '../api/Place';
import type { Map as LeafletMap } from 'leaflet';
import { useEffect, useRef } from 'react';

// this interface specifies the types of props to be passed
interface MapProps {
    place: Place | null;
}
export default function Map({ place }: MapProps) {
    
    const mapRef = useRef<LeafletMap | null>(null);

    useEffect(() => {
        if (mapRef.current && place) {
            mapRef.current.flyTo([place.latitude, place.longitude]);
        }
    }, [place])
    return (
        <MapContainer 
            ref = { mapRef }
            center = {[40.7, -74]}
            zoom={12}
            scrollWheelZoom
            className='h-full'
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png  " />
            {place && <Marker position={[place.latitude, place.longitude]} />}
        </MapContainer>
    )
}