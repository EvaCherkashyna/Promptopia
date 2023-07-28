"use client"
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null)
  const [toggleDropdown, setToggleDropdown] = useState(false)

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders()
      setProviders(response)
    }
    
    setUpProviders();
  }, [])
  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          alt="Promptopia Logo"
          width={30}
          height={30}
          className='object-container'
          src="/assets/images/logo.svg" />
        <p className='logo_text'>Promptopia</p>
      </Link>
      <div className='sm:flex hidden'>
        {session?.user
          ? (
            <div className='flex gap-3 md:gap-5'>
              <Link href="/create-prompt" className='black_btn'>Create Post</Link>
              <button className='outline_btn' type='button' onClick={signOut}>
                Sign Out
              </button>
              <Link href="/profile">
                <Image src="/assets/images/logo.svg"
                  width={37}
                  height={37}
                  alt='profile'

                />
              </Link>
            </div>
          ) :
          (<>
            {providers
              && Object.values(providers).map((provider) => <button type="button" key={provider.name}
                onClick={() => signIn(provider.id)}
                className='black_btn'
              >Sign In</button>)
            }
          </>)
        }
      </div>
      <div className="sm:hidden flex relative">
        {session?.user ?
          (<div className='flex'>
            <Image src="/assets/images/logo.svg"
              width={37}
              height={37}
              alt='profile'
              onClick={() => setToggleDropdown(prev => !prev)}
            />
            {toggleDropdown ? (
              <div className="dropdown">
                <Link href='/profile' className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >My Profile</Link>
                <Link href='/create-prompt' className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >Create Prompt</Link>
                <button
                  className='mt-5 w-full black_btn'
                  onClick={() => {
                    setToggleDropdown(false)
                    signOut();
                  }}>Sign Out</button>
              </div>) : null}
          </div>) : (<>
            {providers
              && Object.values(providers).map((provider) => <button type="button" key={provider.name}
                onClick={() => signIn(provider.id)}
                className='black_btn'
              >Sign In</button>)
            }
          </>)}
      </div>
    </nav>
  )
}

export default Nav