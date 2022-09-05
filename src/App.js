import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './App.css';
import AttackerContract from './artifacts/contracts/AttackerContract.sol/AttackerContract.json'

const defaultContractAddress = '0x';
const contractAddress = '0x.....';

function App() {

  const [isVictimContractAddressOK, setIsVictimContractAddressOK] = useState(false);
  const [victimContractAddress, setVictimContractAddress] = useState(defaultContractAddress);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  useEffect(() => {
  }, [])

  async function isConnected() {
    return typeof window.ethereum !== 'undefined'; // connecté à Metamask
  }
 
  async function requestAccount() {
    await window.ethereum.request({methode: 'eth_requestAccounts'});
  }
  
  function getProvider() {
    return new ethers.providers.Web3Provider(window.ethereum);
  }
  
  function getContractByProvider() {
    const provider = getProvider();
    return new ethers.Contract(contractAddress, AttackerContract.abi, provider);
  }
  
  function setVictimAddress(e) {

    const addressValue = e.target.value ?? '';

    setError('');
    setSuccess('');

    if (addressValue.trim().length !== 42) {
      setError("L'adresse n'est pas valide");
      setVictimContractAddress(defaultContractAddress);
      setIsVictimContractAddressOK(false);
      return;
    }

    setVictimContractAddress(addressValue);
    setIsVictimContractAddressOK(true);
  }

  async function setVictimContract() {
  
    if (!isConnected()) {
      setError('You are not connected');
      return;
    }

    const contract = getContractByProvider();
  
    setError('');
    setSuccess('');

    try {
      await contract.setVictimContract(victimContractAddress);
    }
    catch(err) {
      setError(err);
    }
  }
  
  async function attack() {
  
    if (!isConnected()) {
      return;
    }
    
    const contract = getContractByProvider();
    setError('');
    setSuccess('');
  
    try {
      await contract.attack();
      setSuccess('Attaque réussi');
    }
    catch(err) {
      setError(err);
    }
  }

  return (
    <div className="App">
      <div className="container">
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <h2>Adresse <span className="address">{victimContractAddress}</span></h2>

        <div className="victimContract">
          <h3>Changer d'adresse de contract</h3>
          <input type="text" placeholder="Adresse de contract" onChange={setVictimAddress} />
          <button className="setVictim" disabled={!isVictimContractAddressOK} onClick={setVictimContract}>Mettre à jour</button>
        </div>
        <br />
        <button className="attack" disabled={!isVictimContractAddressOK} onClick={attack}>Attaquer</button>

      </div>
    </div>
  );
}

export default App;
