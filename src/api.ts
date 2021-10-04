import { SavedDoc, UnsavedDoc, User } from './types'

const cookie = {
  credentials: 'include',
} as const

async function tmpName(p: Response) {
  if (p.status === 204) return
  if (p.status < 400) {
    try {
      return await p.json()
    } catch {
      try {
        return await p.text()
      } catch {
        // terrible passport endpoints
      }
    }
  } else {
    throw Error(`Sub-400 StatusCode: ${p.status}`)
  }
}

export async function create(body: UnsavedDoc): Promise<string> {
  const ret = await fetch('/editor', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json', ...cookie },
  }).then(tmpName)

  return ret.insertedId
}

export async function update(body: SavedDoc) {
  await fetch('/editor', {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json', ...cookie },
  }).then(tmpName)
}

export async function getAll(): Promise<SavedDoc[]> {
  return fetch('/editor', { ...cookie }).then(tmpName)
}

export async function getOne(id: string): Promise<SavedDoc> {
  return fetch('/editor/' + id, { ...cookie }).then(tmpName)
}

export async function deleteOne(id: string) {
  await fetch('/editor/' + id, {
    method: 'DELETE',
    ...cookie,
  }).then(tmpName)
}

export async function signUp(user: { username: string; password: string }) {
  const body = new URLSearchParams(user)
  return fetch('/user', {
    method: 'POST',
    body,
  }).then(tmpName)
}

export async function signIn(user: { username: string; password: string }) {
  const body = new URLSearchParams(user)
  return fetch('/login', {
    method: 'POST',
    body,
    ...cookie,
  }).then(tmpName)
}

export async function signOut() {
  return fetch('/logout', {
    ...cookie,
  }).then(tmpName)
}

export async function getUsers(): Promise<User[]> {
  return fetch('/user', { ...cookie }).then(tmpName)
}

export async function getUser(): Promise<User> {
  return fetch('/user/me', { ...cookie }).then(tmpName)
}
