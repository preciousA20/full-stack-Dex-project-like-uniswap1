"use client"
import React, {useEffect, useState} from 'react'
import { ethers } from 'ethers';
import { contractABI } from '../lib/constant';
import { client } from '../lib/sanityClient';
import { useRouter } from 'next/navigation';
export const TransactionContext = React.createContext()

let eth;
// if(typeof window !== undefined){
//     eth = window.ethereum;
// }


export const TransactionProvider = ({children}) => {
    const router = useRouter()

     const [currentAccount, setCurrentAccount] = React.useState('')
     const [loading, setLoading] = useState(false)
     const [formData, setFormData] = React.useState({
        addressTo: '',
        amount: ''
     })

     const checkIfWalletConneted = async()=>{
        const accounts = await window.ethereum.request({
            method: "eth_accounts"
        })
        if(accounts.length > 0){
            setCurrentAccount(accounts[0])
        }
     }

     useEffect(()=>{
        checkIfWalletConneted()
     },[])

     const connectWallet = async() =>{
        if(!window.ethereum) return alert("Please install metamask")
        
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts"
            })

            if(accounts.length > 0){
                //console.log(accounts[0])
                setCurrentAccount(accounts[0])
            }
    
    }

    const contractAddress = '0x5fc5332208Df0C5b6A77ed5e3c97190019525565'

    const getEthereumContract = () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, contractABI, signer)
        return contract 
    }  
    
    
    // Database 

    const saveTransaction = async (
        txHash,
        amount,
        fromAddress = currentAccount,
        toAddress,
      ) => {
        const txDoc = {
          _type: 'transactions',
          _id: txHash,
          fromAddress: fromAddress,
          toAddress: toAddress,
          timestamp: new Date(Date.now()).toISOString(),
          txHash: txHash,
          amount: parseFloat(amount),
        }
        
        
        await client.createIfNotExists(txDoc)
    
        await client.patch(currentAccount).setIfMissing({ transactions: [] }).insert('after', 'transactions[-1]', [
            {
              _key: txHash,
              _ref: txHash,
              _type: 'reference',
            }, 
          ]).commit()
    
        return
      }


    const sendTransaction = async()=>{
        try {
            const {addressTo, amount} = formData 
            const transactionContract = getEthereumContract()

            const parsedAmount = ethers.utils.parseEther(amount)

            await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [
                  {
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x7EF40', // 520000 Gwei
                    value: parsedAmount._hex,
                  },
                ],
              })

            const transactionHash = await transactionContract.PublishTransaction(
                addressTo,
                parsedAmount,
                `Transferring ETH from ${currentAccount} to ${addressTo}`,
                'TRANSFER'
            )
            setLoading(true)
            await transactionHash.wait()

            await saveTransaction(
                transactionHash.hash,
                amount,
                currentAccount,
                addressTo,
            )
            setLoading(false)
        } catch (error) {
            if(error){
                console.log(error.message)
            }
            setLoading(false)
        }
    }

    const handleChange = (e, name)=>[
        setFormData((prevState)=> ({...prevState, [name]: e.target.value}))
    ]


    // automatically saving a user upon logging
    /**
   * Create user profile in Sanity
   */
  useEffect(() => {
    if (!currentAccount) return
    ;(async () => {
      const userDoc = {
        _type: 'users',
        _id: currentAccount,
        userName: 'Unnamed',
        address: currentAccount,
      }

      await client.createIfNotExists(userDoc)
    })()
  }, [currentAccount])


  // spinner modal

  useEffect(()=>{

    if(loading){
      router.push(`/?loading=${currentAccount}`)
    }else{
      router.push('/')
    }
  },[loading])
     
  return (
    <TransactionContext.Provider value={{
        currentAccount, 
        connectWallet,
        sendTransaction,
        handleChange,
        formData,
        loading
    }}>
        {children}
    </TransactionContext.Provider>
  )
}

