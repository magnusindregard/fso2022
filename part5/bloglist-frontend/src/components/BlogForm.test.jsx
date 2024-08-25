import React from 'react'
import '@testing-library/jest-dom'
import { getByRole, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import { expect, test, vi } from 'vitest'

test('clicking the blog submit button calls the event handler', async () => {

  const mockBlogSubmitHandler = vi.fn()

  render(
    <BlogForm blogSubmitHandler={mockBlogSubmitHandler} />
  )

  const titleInput = screen.getByRole('textbox', { name: 'Title' })
  const authorInput = screen.getByRole('textbox', { name: 'Author' })
  const urlInput = screen.getByRole('textbox', { name: 'URL' })
  const button = screen.getByRole('button')

  await userEvent.type(titleInput, 'New blog title')
  await userEvent.type(authorInput, 'New author')
  await userEvent.type(urlInput, 'New url')

  await userEvent.click(button)

  expect(mockBlogSubmitHandler.mock.calls).toHaveLength(1)
  expect(mockBlogSubmitHandler.mock.calls[0][0].title).toBe('New blog title')
  expect(mockBlogSubmitHandler.mock.calls[0][0].author).toBe('New author')
  expect(mockBlogSubmitHandler.mock.calls[0][0].url).toBe('New url')

})