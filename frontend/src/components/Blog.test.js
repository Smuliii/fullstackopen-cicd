import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import Blog from './Blog'

describe('Blog', () => {
  const blog = {
    id: 1,
    title: 'Test blog post',
    author: 'John Doe',
  }
  let mockStore
  let mockHandler
  let component
  let store

  beforeAll(() => {
    mockStore = configureStore()
    store = mockStore({})
  })

  beforeEach(() => {
    mockHandler = jest.fn()
    component = render(
      <Provider store={store}>
        <Blog blog={blog} handleBlogLike={mockHandler} />
      </Provider>
    )
  })

  test('should have title', () => {
    const title = component.container.querySelector('.blog-title')
    expect(title).toHaveTextContent('Test blog post')
  })

  test('should have author', () => {
    const author = component.container.querySelector('.blog-author')
    expect(author).toHaveTextContent('John Doe')
  })

  test('should call like button handler as many time as button is clicked', () => {
    const like = component.container.querySelector('.blog-like')
    fireEvent.click(like)
    fireEvent.click(like)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
