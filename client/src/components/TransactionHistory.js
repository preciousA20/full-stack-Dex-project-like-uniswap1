"use client"
import {useEffect, useState, useContext} from 'react'
import { client } from '@/lib/sanityClient'
import { TransactionContext } from '@/context/TransactionContext'
import Image from 'next/image'
import { FiArrowUpRight } from 'react-icons/fi'
import Link from 'next/link'

const style = {
  wrapper: `h-full text-white select-none h-full w-screen flex-1 pt-14 flex items-end justify-end pb-12 overflow-scroll px-8`,
  txHistoryItem: `bg-[#191a10] rounded-lg px-4 py-2 my-2 flex items-center justify-end`,
  txDetails: `flex items-center`,
 toAddress: `text-[#f48700] mx-2`,
 txTimestamp: `mx-2`,
 etherscanLink: `flex items-center text-[#2172e5]`
}

const TransactionHistory = () => {
  const [transactionHistory, setTransactionHistory] = useState([])
  const {loading, currentAccount} = useContext(TransactionContext)

  useEffect(() => {
    ;(async () => {
      if (!loading && currentAccount) {
        const query = `
          *[_type=="users" && _id == "${currentAccount}"] {
            "transactionList": transactions[]->{amount, toAddress, timestamp, txHash}|order(timestamp desc)[0..5]
          }
        `

        const clientRes = await client.fetch(query)
        // console.log(clientRes)
        console.log(clientRes[0].transactionList)
        setTransactionHistory(clientRes[0].transactionList)
      }
    })()
  }, [loading, currentAccount])


  // return (
  //   <div className={style.wrapper}>
  //       <div>
  //         {transactionHistory && transactionHistory?.map((transaction, index)=>{
  //           <div className={style.txHistoryItem} key={index}>
  //             <div className={style.txDetails}>
  //               <Image src="/eth.png" height={20} width={15} alt='ethereum'></Image>
  //               {transaction.amount} = sent to {" "}
  //               <span className={style.toAddress}>
  //                 {transaction.toAddress.substring(0, 6)}...
  //               </span>
  //             </div>{" "}
              
  //             on 
  //             <div className={style.txTimestamp}>
  //               {new Date(transaction.timestamp).toLocaleString('en-US', {
  //                 timeZone: "PST",
  //                 hour12: true,
  //                 timeStyle: 'short',
  //                 dateStyle: 'long'
  //               })}
  //             </div>
  //             <div className={style.etherscanLink}>
  //                 <Link href={`https://sepolia.etherscan.io/tx/${transaction.txHash}`} 
  //                   target='_blank'
  //                   ref='noreferrer'
  //                   className={style.etherscanLink}
  //                 >
  //                 View on etherscan
  //                 <FiArrowUpRight />
  //                 </Link>
  //             </div>
  //           </div>
  //         })}
  //       </div>
  //   </div>
  // )

  return(
    <div className={style.wrapper}>
      <div>
        {transactionHistory &&
          transactionHistory?.map((transaction, index) => (
            <div className={style.txHistoryItem} key={index}>
              <div className={style.txDetails}>
                <Image src='/eth.png' height={20} width={15} alt='eth' />
                {transaction.amount} Ξ sent to{' '}
                <span className={style.toAddress}>
                  {transaction.toAddress.substring(0, 6)}...
                </span>
              </div>{' '}
              on{' '}
              <div className={style.txTimestamp}>
                {new Date(transaction.timestamp).toLocaleString('en-US', {
                  timeZone: 'PST',
                  hour12: true,
                  timeStyle: 'short',
                  dateStyle: 'long',
                })}
              </div>
              <div className={style.etherscanLink}>
                <a
                  href={`https://sepolia.etherscan.io/tx/${transaction.txHash}`}
                  target='_blank'
                  rel='noreferrer'
                  className={style.etherscanLink}
                >
                  View on Etherscan
                  <FiArrowUpRight />
                </a>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default TransactionHistory