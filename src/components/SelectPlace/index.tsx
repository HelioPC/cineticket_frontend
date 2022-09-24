import { TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKENDADDRESS } from "../../data/dummy";
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
    const [phone, setPhone] = useState<string>("9");
    const [allFields, setAllFields] = useState(true);

    useEffect(() => {
        if(name === '' || name.length < 2 || phone.length !== 9) setAllFields(true);
        else setAllFields(false);
    }, [name, phone, selectedPlaces]);

    const handleSelectPlace = (place: string, estado: string) => {
        if (estado === "1") return;
        
        if(selectedPlaces.includes(place)) {
            setSelectedPlaces(selectedPlaces.filter(p => p !== place));
        } else {
            setSelectedPlaces([...selectedPlaces, place]);
        }
    }

    const handleReserve = () => {
        if(allFields) {
            return;
        }
        
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
            url: `${BACKENDADDRESS}cineticket/reservas/store`,
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then(function (response) {
            //handle success
            console.log(response);
            if(response.data.status === 'sucesso') {
                AlertSuccess({
                    title: 'Successo',
                    description: `Reserva efetuada com sucesso ✅`,
                    confirm: () => window.location.reload(),
                    link: `${BACKENDADDRESS}cineticket/recibo/${response.data.codigo}/`,
                    message: 'Baixe o seu recibo'
                });
            } else {
                AlertError({
                    title: 'Erro',
                    description: 'Falha na requisição com Cineticket API ⛔️',
                    confirm: () => window.location.reload()
                });
            }
            console.log(response);
          })
          .catch(function (response) {
            //handle error
            AlertError({
                title: 'Erro',
                description: 'Erro inesperado 🥲',
                confirm: () => window.location.reload()
            });
            console.log(response);
          });
        prop.setOpen(false);
    }

    const handleTamanho = (e: any) => {
        const newValue = Math.min(Math.max(e.target.value, 0), 999999999)
        setPhone(previousValue => newValue+'');
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
                            {index+1}
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
                onChange={handleTamanho}
            />

            {selectedPlaces.length > 0 && phone !== "" && name !== "" ? 
                (
                    <button
                        className={`
                            px-2 py-1 w-full mt-6 origin-bottom
                            duration-500 transition-all text-white rounded-md
                            ${
                                allFields ?
                                'bg-[#AAA] cursor-not-allowed':
                                'bg-[#B81D24] hover:bg-[#980D14] hover:scale-105'

                            }
                        `}
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
