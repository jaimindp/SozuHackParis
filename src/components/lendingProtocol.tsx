import { useEffect, useState } from 'react';
import {client} from '../wagmi'
import { ethers } from 'ethers';
// import {useAccount} from 'wagmi'


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
    EURS: '0x7132369e65791D4955990581d932FCaA0176871A',
};
const prices = {
    "DAI": 1.0,
    "LINK": 7.42,
    "USDC": 1.0,
    "WBTC": 20733.55,
    "WETH": 1215.86,
    "USDT": 1.0,
    "AAVE": 71.14,
    "EURS": 1.0,
}

const LendingProtocol: React.FC<LendingProtocolProps> = ({ onDeposit, onBorrow, under }) => {
    const [depositAmount, setDepositAmount] = useState('');
    const [borrowAmount, setBorrowAmount] = useState('');
    const [depositToken, setDepositToken] = useState(Object.keys(pools)[0]);
    const [borrowToken, setBorrowToken] = useState(Object.keys(pools)[0]);
    const [collateral, setCollateral] = useState(0);


    useEffect(() => {
        if (collateral > 0){
        setCollateral(depositAmount)
        }
    }, [depositAmount, borrowAmount, depositToken, borrowToken]);

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
    function formatNumberAsDollars(number: number): string {
        const formattedNumber = number.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });
        return formattedNumber;
      }


    return (
        <div>
            <div>
                {under ? 
                    <h1>UnderCat</h1>
                :
                <h1> OverCat </h1> 
                }
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
                &nbsp; &nbsp; &nbsp; &nbsp;
                {/* {under ?  : }  */}
                { depositAmount > 0 ? `${formatNumberAsDollars(depositAmount*prices[depositToken])}` : <div></div> }
                 {/* <button onClick={() => handleDeposit(depositToken, depositAmount)}>Deposit</button> */}
            </div>

            <div>
                <h3>Borrow Up To {`${(depositAmount*prices[depositToken]/prices[borrowToken] * (under ? 2 : 1 ))} ${borrowToken}`}</h3>
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
                <div></div>
                <br></br>
                <br></br>
                <a href={`https://explorer.testnet.mantle.xyz/address/${pools[depositToken]}`} target="_blank">
                    Click to see live lending market contract
                </a>
                <br></br>
                <br></br>
                <a href={`https://explorer.testnet.mantle.xyz/address/${pools[borrowToken]}`} target="_blank">
                    Click to see live borrow market contract
                </a>
            </div>
            {/* {depositAmount > 0 ? <div>Max borrow is {depositAmount*prices[depositToken])}</div> : <div></div>} */}
        </div>
    );
};

export default LendingProtocol;
