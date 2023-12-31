'use client'
import React, { useState, useEffect } from 'react'
import { PromptCard, PromptCardList } from '@components'

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([])
  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
  }
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json()
      setPosts(data)
    }
    fetchPosts()
  }, []);

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input type='text' placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>
      <PromptCardList
        data={posts}
        handleTagClick={() => { }}
      />
    </section>
  )
}

export default Feed
