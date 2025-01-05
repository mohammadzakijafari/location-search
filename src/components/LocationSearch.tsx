import { Fragment, useState } from 'react';
import type { Place } from '../api/Place';
import { search } from '../api/search';

// defining interface for onClick Search for location
interface LocationSearchProps {
    onPlaceClick: (place: Place) => void;
}
export default function LocationSearch({ onPlaceClick }: LocationSearchProps) {

    // initializing state variable for place to get data from user
    const [places, setPlaces] = useState<Place[]>([]);
    // state variable for input value
    const [term, setTerm] = useState('');

    // handling form submit
    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = await search(term);
        setPlaces(result);
    }
    
    return (
        <div className="">
            <form onSubmit={handleFormSubmit}>
                <label className='font-bold' htmlFor='term'> Search </label>
                <input 
                    id='term' 
                    className='border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 px-4 py-2 w-full'
                    value={term}
                    onChange={e => setTerm(e.target.value)}
                />
            </form>

            <h1 className='font-bold mt-6'> Found Locations </h1>
            <div className='grid grid-cols-[1fr_40px] gap-2 mt-2 items-center'>
                {
                    places.map((place) => {
                        return <Fragment key={place.id}>
                            <p className='text-sm'> { place.name } </p>
                            <button className='bg-blue-500 text-white text-sm font-bold py-1 px-1 rounded'
                            onClick={() => onPlaceClick(place)}
                            >
                                Go
                            </button>
                            <div className='border-b w-full col-span-2'></div>
                        </Fragment>
                    })
                }
            </div>
        </div>
    )
}