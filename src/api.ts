import {
  CreateDocumentData,
  CreateDocumentVariables,
  CREATE_DOCUMENT,
} from './gql/create-document'
import {
  DocumentData,
  GetDocumentData,
  GetDocumentVariables,
  GET_DOCUMENT,
} from './gql/get-document'
import {
  DocumentsData,
  GetDocumentsData,
  GET_DOCUMENTS,
} from './gql/get-documents'
import {
  RemoveDocumentData,
  RemoveDocumentVariables,
  REMOVE_DOCUMENT,
} from './gql/remove-document'
import {
  UpdateDocumentData,
  UpdateDocumentVariables,
  UPDATE_DOCUMENT,
} from './gql/update-document'
import { snap } from './state'
import { SavedDoc, UnsavedDoc, User } from './types'

const headers = {
  'Content-Type': 'application/json',
}

function client() {
  const client = snap().gqlClient
  if (!client) throw Error()
  return client
}

async function resolve(p: Response) {
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

export async function create(body: UnsavedDoc): Promise<string | undefined> {
  const ret = await client().mutate<
    CreateDocumentData,
    CreateDocumentVariables
  >({
    mutation: CREATE_DOCUMENT,
    variables: {
      title: body.title,
      content: body.content,
      type: body.type,
      comments: body.comments,
    },
  })

  return ret?.data?.createDocument.id
}

export async function update(body: SavedDoc) {
  await client().mutate<UpdateDocumentData, UpdateDocumentVariables>({
    mutation: UPDATE_DOCUMENT,
    variables: body,
  })
}

export async function getAll(): Promise<DocumentsData[]> {
  return client()
    .query<GetDocumentsData>({ query: GET_DOCUMENTS })
    .then((d) => d.data?.documents ?? [])
}

export async function getOne(id: string): Promise<DocumentData | undefined> {
  return client()
    .query<GetDocumentData, GetDocumentVariables>({
      query: GET_DOCUMENT,
      variables: { id },
    })
    .then((r) => r.data.document)
}

export async function deleteOne(id: string) {
  await client().mutate<RemoveDocumentData, RemoveDocumentVariables>({
    mutation: REMOVE_DOCUMENT,
    variables: { id },
  })
}

export async function signIn(user: { username: string; password: string }) {
  const body = JSON.stringify(user)
  return fetch('/auth/login', {
    method: 'post',
    body,
    headers,
  })
}

export async function signOut() {
  return fetch('/auth/logout', {
    headers,
  })
}

export async function getUser(): Promise<User> {
  return fetch('/auth/profile', { headers }).then(resolve)
}

export async function getAsPDF(doc: string): Promise<Blob> {
  const body = JSON.stringify({ content: doc })
  const res = await fetch('/api/pdf', { method: 'post', headers, body })
  return await res.blob()
}

export async function execjs(code: string): Promise<string> {
  const body = JSON.stringify({ code: Buffer.from(code).toString('base64') })
  const res = await fetch('/api/execjs', { method: 'post', headers, body })
  const ret = await res.json()
  return Buffer.from(ret.data, 'base64').toString('utf-8')
}
