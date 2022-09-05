import { TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { LugarType } from "../../types";
import { AlertError, AlertSuccess } from "../Alerts";

type Props = {
    lugares: LugarType[];
    price: number;
    setOpen: (value: boolean) => void;
}

const SelectPlace = (prop: Props) => {
    console.log(prop.lugares);
    const [selectedPlaces, setSelectedPlaces] = useState<string[]>([]);
    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("0");

    const handleSelectPlace = (place: string, estado: string) => {
        if (estado === "1") return;
        
        if(selectedPlaces.includes(place)) {
            setSelectedPlaces(selectedPlaces.filter(p => p !== place));
        } else {
            setSelectedPlaces([...selectedPlaces, place]);
        }
    }

    const handleReserve = () => {
        // Converter selectedPlaces para string única
        const places = selectedPlaces.join(",");
        
        const data = new FormData();
        data.append('lugares', places);
        data.append('nome', name);
        data.append('telefone', phone);

        console.log(data.values());

        axios({
            method: 'POST',
            data: data,
            url: 'http://192.168.43.35/cineticket/reservas/store',
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then(function (response) {
            //handle success
            AlertSuccess({
                title: 'Success',
                description: 'Report sent successfully!'
            });
            console.log(response);
          }).catch(function (response) {
            //handle error
            console.log(response);
        });
        prop.setOpen(false);
    }
    
    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-y-5">
            <div className="flex gap-x-5 mb-5">
                <div className="flex items-center gap-x-3">
                    <p>Disponível:</p>
                    <div className="bg-[#555] w-3 h-3 rounded-full shadow-xl" />
                </div>
                <div className="flex items-center gap-x-3">
                    <p>Ocupado:</p>
                    <div className="bg-[#C00] w-3 h-3 rounded-full shadow-xl" />
                </div>
                <div className="flex items-center gap-x-3">
                    <p>Selecionado:</p>
                    <div className="bg-[#090] w-3 h-3 rounded-full shadow-xl" />
                </div>
            </div>
            <div className={`grid grid-cols-[repeat(6,30px)] grid-rows-[repeat(6,30px)] gap-4`}>
                {
                    prop.lugares.map((lugar, index) => (
                        <div
                            key={index}
                            className={`
                                w-full h-full flex items-center justify-center
                                rounded-md text-white
                                ${lugar.ESTADO === '1' ? 'bg-[#C00]' : 'cursor-pointer hover:scale-105 duration-300 ' + (selectedPlaces.includes(lugar.ID_DISPONIVEL) ? 'bg-[#090]' : 'bg-[#555]')}
                            `}
                            onClick={() => handleSelectPlace(lugar.ID_DISPONIVEL, lugar.ESTADO)}
                        >
                            {index}
                        </div>
                    ))
                }
            </div>
            
            <TextField
                name="fullName"
                label="Nome"
                className='my-2 w-full'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <TextField
                name="fullName"
                label="Phone number"
                className='my-2 w-full'
                type='number'
                value={parseInt(phone)}
                onChange={(e) => setPhone(e.target.value.toString())}
            />

            {selectedPlaces.length > 0 && phone !== "" && name !== "" ? 
                (
                    <button
                        className='px-2 py-1 w-full mt-6 origin-bottom bg-[#B81D24] hover:bg-[#980D14] hover:scale-105 duration-500 transition-all text-white rounded-md'
                        type='submit'
                        onClick={handleReserve}
                    >
                        Reserve por {selectedPlaces.length * prop.price} kz
                    </button>
                )
                : null
            }
        </div>
    );
}

export default SelectPlace;
