"use client"
import React,{useState, useEffect, useContext} from 'react'
import Image from 'next/image'
import { FiArrowUpRight} from 'react-icons/fi'
import {AiOutlineDown} from 'react-icons/ai'
import { HiOutlineDotsVertical} from 'react-icons/hi'
import Link from 'next/link'
import { TransactionContext } from '@/context/TransactionContext'
// import ethLogo from '../public/eth.png'

const Header = () => {
  const {connectWallet, currentAccount} = useContext(TransactionContext)
    const [selectedNav, setSelectedNav] = useState("swap")

    const style = {
        wrapper: `p-4 w-screen flex justify-between items-center`,
        headerLogo: `flex w-1/4 items-center justify-start`,
        nav: `flex-1 flex justify-center items-center`,
        navItemsContainer: `flex bg-[#191B1F] rounded-3xl`,
        navItem: `px-4 py-2 m-1 flex items-center text-lg font-semibold text-[0.9rem] cursor-pointer rounded-3xl`,
        activeNavItem: `bg-[#20242A]`,
        buttonsContainer: `flex w-1/4 justify-end items-center`,
        button: `flex items-center bg-[#191B1F] rounded-2xl mx-2 text-[0.9rem] font-semibold cursor-pointer`,
        buttonPadding: `p-2`,
        buttonTextContainer: `h-8 flex items-center`,
        buttonIconContainer: `flex items-center justify-center w-8 h-8`,
        buttonAccent: `bg-[#172A42] border border-[#163256] hover:border-[#234169] h-full rounded-2xl flex items-center justify-center text-[#4F90EA]`,
      }

  return (
    <div className={style.wrapper}>
    <div className={style.headerLogo}>
      <Image src='/uniswap.png' alt='uniswap' height={40} width={40} />
    </div>
    <div className={style.nav}>
      <div className={style.navItemsContainer}>
        <div
          onClick={() => setSelectedNav('swap')}
          className={`${style.navItem} ${
            selectedNav === 'swap' && style.activeNavItem
          }`}
        >
          Swap
        </div>
        <div
          onClick={() => setSelectedNav('pool')}
          className={`${style.navItem} ${
            selectedNav === 'pool' && style.activeNavItem
          }`}
        >
          Pool
        </div>
        <div
          onClick={() => setSelectedNav('vote')}
          className={`${style.navItem} ${
            selectedNav === 'vote' && style.activeNavItem
          }`}
        >
          Vote
        </div>
        <Link
          href='https://info.uniswap.org/#/'
          target='_blank'
          rel='noreferrer'
        >
          <div className={style.navItem}>
            Charts <FiArrowUpRight />
          </div>
        </Link>
      </div>
    </div>
    <div className={style.buttonsContainer}>
      <div className={`${style.button} ${style.buttonPadding}`}>
        <div className={style.buttonIconContainer}>
          <Image src='/eth.png' alt='eth logo' height={20} width={20} />
        </div>
        <p>Ethereum</p>
        <div className={style.buttonIconContainer}>
          <AiOutlineDown />
        </div>
      </div>
      
        <div className={`${style.button} ${style.buttonPadding}`}>
          <div className={style.buttonTextContainer}></div>
        </div>
     
        <div
          onClick={() => connectWallet()}
          className={`${style.button} ${style.buttonPadding}`}
        >
          <div onClick={()=>connectWallet()} className={`${style.buttonAccent} ${style.buttonPadding}`}>
            {!currentAccount ? ("connect wallet") : currentAccount.slice(0, 4)+ "..."+currentAccount.slice(-4)}
          </div>
        </div>
    
      <div className={`${style.button} ${style.buttonPadding}`}>
        <div className={`${style.buttonIconContainer} mx-2`}>
          <HiOutlineDotsVertical />
        </div>
      </div>
    </div>
  </div>
  )
}

export default Header