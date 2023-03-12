
import type { AxiosProgressEvent, GenericAbortSignal } from "axios";
import type { ChatMessage } from "chatgpt";
import type { ChatContext } from "utools/types";
import { chatConfig, chatReplyProcess } from "./serve";

export type PartialProgressEvent = Partial<AxiosProgressEvent>

interface requestOptions {
  url: string,
  data?: { prompt: string, options?: Chat.ConversationRequest },
  signal?: GenericAbortSignal,
  onDownloadProgress?: (progressEvent: Partial<AxiosProgressEvent>) => void
}

export interface Response<T = any> {
  data: T
  message: string | null
  status: string
}

const post_chat_process = async (req: requestOptions) => {
  // res.setHeader('Content-type', 'application/octet-stream')
  try {
    const { prompt, options = {} } = req.data as {
      prompt: string; options?: ChatContext
    }
    let firstChunk = true
    let mockEvent: PartialProgressEvent = { event: { target: { responseText: '' } } }
    await chatReplyProcess(prompt, options, (chat: ChatMessage) => {
      // res.write(firstChunk ? JSON.stringify(chat) : `\n${JSON.stringify(chat)}`)
      mockEvent.event.target.responseText = (firstChunk ? JSON.stringify(chat) : `\n${JSON.stringify(chat)}`)
      req.onDownloadProgress!(mockEvent)
      firstChunk = false
    })
  }
  catch (error) {
    console.error(error)
  }
  finally { }
}

const post_config = async (request: requestOptions) => {
  try {
    const response = await chatConfig()
    return response
  }
  catch (error) {
    console.error(error)
  }
}


function post<T = any>(request: requestOptions): Promise<Response<T>> {
  let p
  switch (request.url) {
    case '/chat-process':
      {
        // @ts-ignore
        p = post_chat_process(request)
      }
      break;
    case '/config':
      {
        p = post_config(request)
      }
      break;
  }

  // @ts-ignore
  return p
}



export { post }
