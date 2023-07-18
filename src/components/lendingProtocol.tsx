import { useState } from 'react';

interface LendingProtocolProps {
    onDeposit: (amount: number) => void;
    onBorrow: (amount: number) => void;
}

const LendingProtocol: React.FC<LendingProtocolProps> = ({ onDeposit, onBorrow }) => {
    const [depositAmount, setDepositAmount] = useState(0);
    const [borrowAmount, setBorrowAmount] = useState(0);

    return (
        <div>
            <h2>Lending Protocol</h2>
            <div>
                <h3>Deposit</h3>
                <input
                    type="number"
                    value={depositAmount}
                    onChange={e => setDepositAmount(Number(e.target.value))}
                />
                <button onClick={() => onDeposit(depositAmount)}>Deposit</button>
            </div>
            <div>
                <h3>Borrow</h3>
                <input
                    type="number"
                    value={borrowAmount}
                    onChange={e => setBorrowAmount(Number(e.target.value))}
                />
                <button onClick={() => onBorrow(borrowAmount)}>Borrow</button>
            </div>
        </div>
    );
};

export default LendingProtocol;
