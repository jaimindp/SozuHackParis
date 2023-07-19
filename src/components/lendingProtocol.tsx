import { useState } from 'react';
import {client} from '../wagmi'

interface LendingProtocolProps {
    onDeposit: (token: string, amount: number) => void;
    onBorrow: (token: string, amount: number) => void;
}

const pools = {
    DAI: '0xE65c264C8D490A1ca917887D71AD2134A99EF104',
    LINK: '0xeb127461e94aB8F9b09C9eEBD4EF58b53e7238A4',
    USDC: '0xfEe2E901863D42BC0ac96739b19EF6a21d376f4C',
    WBTC: '0xe4bA81ab21D8aA65f97C3FE92D4994109B71508e',
    WETH: '0x97029bA8d8360336dD28EB1cc784Ff4feEFD9275',
    USDT: '0x01724CBc82b4B038219006982FDB7838739FbDe7',
    AAVE: '0xCCd32D14f2337F80216C47A199A8F6168F2E34af',
    EURS: '0x7132369e65791D4955990581d932FCaA0176871A'
};

const LendingProtocol: React.FC<LendingProtocolProps> = ({ onDeposit, onBorrow }) => {
    const [depositAmount, setDepositAmount] = useState(0);
    const [borrowAmount, setBorrowAmount] = useState(0);
    const [depositToken, setDepositToken] = useState(Object.keys(pools)[0]);
    const [borrowToken, setBorrowToken] = useState(Object.keys(pools)[0]);
    const handleDeposit = async (token: string, amount: number) => {
        try {
            await client.connect();
            const signer = client.getSigner();
    
            // Transaction parameters
            const txParams = {
                to: pools[token], // The recipient is the smart contract of the selected pool
                value: ethers.utils.parseEther(amount.toString()), // Convert amount to Wei
                gasPrice: ethers.utils.parseUnits('10', 'gwei'), // Gas price
            };
    
            // Send the transaction
            const txResponse = await signer.sendTransaction(txParams);
            const txReceipt = await txResponse.wait();
    
            // Log the transaction receipt
            console.log(txReceipt);
        } catch (error) {
            console.error("An error occurred: ", error);
        }
    };


    return (
        <div>
            <h2>Lending Protocol</h2>
            <div>
                <h3>Deposit</h3>
                <select value={depositToken} onChange={e => setDepositToken(e.target.value)}>
                    {Object.keys(pools).map(token => (
                        <option key={token} value={token}>{token}</option>
                    ))}
                </select>
                &nbsp;
                <input
                    type="number"
                    value={depositAmount}
                    onChange={e => setDepositAmount(Number(e.target.value))}
                />
                &nbsp;
                <button onClick={() => onDeposit(depositToken, depositAmount)}>Deposit</button>
                <button onClick={() => handleDeposit(depositToken, depositAmount)}>Deposit</button>

            </div>
            <div>
                <h3>Borrow</h3>
                <select value={borrowToken} onChange={e => setBorrowToken(e.target.value)}>
                    {Object.keys(pools).map(token => (
                        <option key={token} value={token}>{token}</option>
                    ))}
                </select>
                &nbsp;
                <input
                    type="number"
                    value={borrowAmount}
                    onChange={e => setBorrowAmount(Number(e.target.value))}
                />
                &nbsp;
                <button onClick={() => onBorrow(borrowToken, borrowAmount)}>Borrow</button>
            </div>
        </div>
    );
};

export default LendingProtocol;
