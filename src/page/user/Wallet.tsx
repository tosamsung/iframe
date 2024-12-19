import React, { useEffect } from 'react';
// import AuthService from '../../service/AuthService';
// import UserService from '../../service/UserService';
const Wallet: React.FC = () => {
    // const [balance, setBalance] = useState(true);
    // const [isLoading, setIsLoading] = useState(true);
    // const authService = new AuthService();
    // const userService = new UserService()
    // Format the balance with commas
    useEffect(() => {
        // const fetchData = async () => {
        //     const token = WA.player.state.DIGIFORCE_TOKEN as string;
        //     if (token) {
        //         try {
        //             authService.auth(token).then((response: any) => {
        //                 const userId = response.data.id
        //                 userService.getWalletByUserId(userId).then((response: any) => {
        //                     setBalance(response.data)
        //                 })
        //             })
        //         } catch (error) {
        //             console.error('Failed to fetch user details:', error);
        //         } finally {
        //             setIsLoading(false);
        //         }
        //     } else {
        //         setIsLoading(false);
        //     }
        // };
        // fetchData()
    }, [])
    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="bg-white shadow-lg rounded-lg p-2 w-auto text-center">
                {/* <div className="flex justify-center items-center">
                    <span className="text-xl font-bold text-blue-600">{balance.points_balance.toLocaleString('en-US')}</span>
                    <img
                        src={coinIcon}
                        alt="Coin Icon"
                        className="h-8 w-8 object-contain ml-1"
                    />
                </div> */}
            </div>
        </div>
    );
};

export default Wallet;

