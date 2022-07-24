import { useState } from "react";
import { AlertSuccess } from "../Alerts";

type ModalProps = {
    children?: React.ReactNode;
    classProp?: string;
    closeModal: () => void;
}

const Submit = ({ closeModal, classProp }: ModalProps) => {
    const [currentStep, setCurrentStep] = useState(1);

    const handleFinishReport = () => {
        AlertSuccess({
            title: 'Success',
            description: 'Report sent successfully!'
        });
        closeModal();
    }

    return (
        <div
            className={`w-screen h-screen top-0 left-0 bottom-0 right-0 fixed bg-[rgba(0,0,0,.78)] m-0 items-center justify-center ${classProp}`}
            onClick={() => closeModal()}
        >
            <div
                className='sm:w-96 w-72 min-h-80 h-auto bg-[#222] text-white p-4 rounded-lg'
                onClick={e => {
                    e.stopPropagation();
                }}
            >
                <h1 className="text-xl">Report post</h1>

                <div className='min-h-60 w-full my-5'>
                </div>

                <div className='flex justify-end w-full'>
                    <button
                        className='mx-5 text-gray-400 cursor-pointer'
                        onClick={() => closeModal()}
                    >
                        CANCEL
                    </button>
                
                    {currentStep === 1 && 
                    <button
                        className='mx-5 text-blue-400 cursor-pointer'
                        onClick={() => setCurrentStep(2)}
                    >
                        SEGUINTE
                    </button>
                    }
                    {currentStep === 2 &&
                    <button
                        className='mx-5 text-blue-400 cursor-pointer'
                        onClick={handleFinishReport}
                    >
                        REPORT
                    </button>
                    }
                </div>
            </div>
        </div>
    );
}

export default Submit;
