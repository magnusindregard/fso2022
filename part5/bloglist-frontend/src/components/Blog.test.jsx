import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect, describe, beforeEach, test, vi } from 'vitest'

describe('<Blog />', () => {
  let container
  const mockLikeHandler = vi.fn()
  const mockDeleteHandler = vi.fn()

  beforeEach(() => {
    const blog = {
      user: 'id12212431',
      likes: 9,
      author: 'Author Authorsen',
      title: 'Testing blog rendering',
      url: 'https://link.no/page',

    }
    container = render(
      <Blog blog={blog} likeHandler={mockLikeHandler} deleteHandler={mockDeleteHandler} loggedInUserId={blog.user} />
    ).container
  })



  test('renders the blog component in collapsed state', () => {

    const title = screen.getByText('Testing blog rendering by Author Authorsen')
    const expandable = container.querySelector('.expandable-content')

    expect(title).toBeDefined()
    expect(expandable).toHaveStyle('display: none')

  })

  test('clicking the expand button expands the expandable', async () => {

    const button = container.querySelector('.expand-button')
    await userEvent.click(button)

    const expandable = container.querySelector('.expandable-content')
    const blogurl = screen.getByText('https://link.no/page')
    const likes = screen.getByText('Likes: 9')

    expect(expandable).toHaveStyle('display: block')
    expect(blogurl).toBeDefined()
    expect(likes).toBeDefined()

  })

  test('clicking like twice calls the handler twice', async () => {

    const button = container.querySelector('.like-button')
    await userEvent.click(button)
    await userEvent.click(button)

    expect(mockLikeHandler.mock.calls).toHaveLength(2)

  })

})