import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import OwnerContext from '../context/UserContext';

const Header: React.FC = () => {
  const context = useContext(OwnerContext);

  // Handle header visibility
  const closeMenu = () => {
    WA.player.state.saveVariable("openListCrops", false)
    WA.player.state.saveVariable("openConfirmPlant", false)

  };



  return (
    <header className="bg-green-600 text-white py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Green Sky Garden</h1>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link className="text-white hover:text-gray-300" to={`/${context?.id}/crop`}>
                  Cây trồng
                </Link>
              </li>
            </ul>
          </nav>
          {/* Close button */}
          <button
            className=" bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
            onClick={closeMenu}
          >
            X
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
