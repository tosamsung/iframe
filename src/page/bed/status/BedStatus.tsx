import React from 'react';
import farmer from "../../../assets/gif/farmer.gif"
const BedStatus: React.FC = () => {

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="w-auto text-center scale-[1]">
                <div className="flex justify-center items-center ">
                    <img
                        src={farmer}
                        alt="Coin Icon"
                        className="object-contain"
                    />
                </div>
            </div>
        </div>
    );
};

export default BedStatus;

