import { UnsavedDoc, SavedDoc } from './types'

// const url = process?.env?.NODE_ENV === 'test' ? '/editor' : 'http://localhost:1234/editor'
const url =
  process?.env?.NODE_ENV === 'test'
    ? '/editor'
    : 'http://167.99.246.158:1234/editor'
// const url = 'http://167.99.246.158:1234/editor'
// const url = 'https://jsramverk-editor-rigi21.azurewebsites.net/editor'

export async function create(body: UnsavedDoc): Promise<string> {
  const ret = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  }).then((r) => r.json())

  return ret.insertedId
}

export async function update(body: SavedDoc) {
  await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
}

export async function getAll(): Promise<SavedDoc[]> {
  return fetch(url).then((r) => r.json())
}

export async function getOne(id: string): Promise<SavedDoc> {
  return fetch(url + '/' + id).then((r) => r.json())
}

export async function deleteOne(id: string) {
  await fetch(url + '/' + id, { method: 'DELETE' })
}
