import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { BrowserRouter as Router } from 'react-router-dom'
import Blogs from './Blogs'

describe('Blogs', () => {
  const blogs = [{
    id: 1,
    title: 'Test blog post',
    author: 'John Doe',
  }]
  const user = {
    username: 'johndoe'
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
        <Router>
          <Blogs blogs={blogs} user={user} createNewBlog={mockHandler} />
        </Router>
      </Provider>
    )
  })

  test('should not display togglable content by default', () => {
    const content = component.container.querySelector('.togglable-content')
    expect(content).toHaveStyle({ display: 'none' })
  })

  test('should display togglable content after show button is clicked', () => {
    const content = component.container.querySelector('.togglable-content')
    const show = component.container.querySelector('.togglable-show')
    fireEvent.click(show)
    expect(content).not.toHaveStyle({ display: 'none' })
  })
})
