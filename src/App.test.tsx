import {
  fireEvent,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import React from 'react'
import App from './App'
import { setupServer } from 'msw/node'
import { rest } from 'msw'

jest.mock('./useSocketIO')

const server = setupServer()

beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'warn',
  })
})
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

function getApp() {
  const a = render(<App />)

  const getTitle = () => a.getAllByRole('textbox')[0] as HTMLInputElement
  const getEditor = () => a.getAllByRole('textbox')[1] as HTMLInputElement
  const getSave = () => a.getByRole('button', { name: 'Save' })
  const getOpen = () => a.getByRole('button', { name: 'Open' })
  const getDelete = () => a.getByRole('button', { name: 'Delete' })
  return { ...a, getTitle, getEditor, getSave, getOpen, getDelete }
}

test('create new document', async () => {
  server.use(
    // get user
    rest.get('/user/me', (_req, res, ctx) => {
      return res(ctx.json({ username: 'you', _id: 'asdf' }))
    }),
    // get user
    rest.get('/user', (_req, res, ctx) => {
      return res(ctx.json([]))
    }),
    // initial listing
    rest.get('/editor', (_req, res, ctx) => {
      return res.once(ctx.json([]))
    }),
    // create new document
    rest.post('/editor', (_req, res, ctx) => {
      return res.once(ctx.json({ insertedId: '123' }))
    }),
    // list documents after creating new document
    rest.get('/editor', (_req, res, ctx) => {
      return res.once(ctx.json([]))
    }),
  )

  const a = getApp()

  fireEvent.change(a.getTitle(), { target: { value: 'My Title' } })
  await waitFor(() => expect(a.getTitle().value).toEqual('My Title'))

  await waitFor(() => expect(a.getEditor()).toBeTruthy())
  fireEvent.change(a.getEditor(), { target: { value: 'My Content' } })
  await waitFor(() => expect(a.getEditor().value).toEqual('My Content'))

  fireEvent.click(a.getSave())
  await waitFor(() => a.getByText('Document saved'))
})

test('open a document and update it', async () => {
  server.use(
    // get user
    rest.get('/user/me', (_req, res, ctx) => {
      return res(ctx.json({ username: 'you', _id: 'asdf' }))
    }),
    // get user
    rest.get('/user', (_req, res, ctx) => {
      return res(ctx.json([]))
    }),
    // initial listing
    rest.get('/editor', (_req, res, ctx) => {
      return res.once(
        ctx.json([
          {
            _id: '123',
            title: 'My Title',
          },
        ]),
      )
    }),

    // open document listings
    rest.get('/editor', (_req, res, ctx) => {
      return res.once(
        ctx.json([
          {
            _id: '123',
            title: 'My Title',
          },
        ]),
      )
    }),

    // get document
    rest.get('/editor/123', (_req, res, ctx) => {
      return res.once(
        ctx.json({
          _id: '123',
          title: 'My Title',
          content: 'My Content',
        }),
      )
    }),

    // update document
    rest.put('/editor', (_req, res) => {
      return res.once()
    }),

    // list documents after update
    rest.get('/editor', (_req, res, ctx) => {
      return res.once(
        ctx.json([
          {
            _id: '123',
            title: 'My Title',
          },
        ]),
      )
    }),
  )

  const a = getApp()

  await waitFor(() => expect(a.getOpen()).toBeTruthy())
  fireEvent.click(a.getOpen())
  await waitFor(() => a.getByRole('dialog'))
  await waitFor(() => a.getByText('My Title'))

  fireEvent.click(a.getByText('My Title'))
  await waitForElementToBeRemoved(a.getByRole('dialog'))

  expect(a.getTitle().value).toEqual('My Title')

  fireEvent.change(a.getTitle(), { target: { value: 'My Updated Title' } })
  await waitFor(() => expect(a.getTitle().value).toEqual('My Updated Title'))

  fireEvent.change(a.getEditor(), { target: { value: 'My Updated Content' } })
  await waitFor(() => expect(a.getEditor().value).toEqual('My Updated Content'))

  fireEvent.click(a.getSave())
  await waitFor(() => a.getByText('Document updated'))
})

test('open a document and delete it', async () => {
  server.use(
    // get user
    rest.get('/user/me', (_req, res, ctx) => {
      return res(ctx.json({ username: 'you', _id: 'asdf' }))
    }),
    // get user
    rest.get('/user', (_req, res, ctx) => {
      return res(ctx.json([]))
    }),
    // initial listing
    rest.get('/editor', (_req, res, ctx) => {
      return res.once(
        ctx.json([
          {
            _id: '123',
            title: 'My Title',
          },
        ]),
      )
    }),

    // open doc listings
    rest.get('/editor', (_req, res, ctx) => {
      return res.once(
        ctx.json([
          {
            _id: '123',
            title: 'My Title',
          },
        ]),
      )
    }),

    // get document
    rest.get('/editor/123', (_req, res, ctx) => {
      return res.once(
        ctx.json({
          _id: '123',
          title: 'My Title',
          content: 'My Content',
        }),
      )
    }),

    // delete document
    rest.delete('/editor/123', (_req, res) => {
      return res.once()
    }),

    // list documents after delete
    rest.get('/editor', (_req, res, ctx) => {
      return res.once(
        ctx.json([
          {
            _id: '123',
            title: 'My Title',
          },
        ]),
      )
    }),
  )

  const a = getApp()

  await waitFor(() => expect(a.getOpen()).toBeTruthy())
  fireEvent.click(a.getOpen())
  await waitFor(() => a.getByRole('dialog'))
  await waitFor(() => a.getByText('My Title'))

  fireEvent.click(a.getByText('My Title'))
  await waitForElementToBeRemoved(a.getByRole('dialog'))

  expect(a.getTitle().value).toEqual('My Title')

  fireEvent.click(a.getDelete())
  await waitFor(() => a.getByText('Document deleted'))
})
