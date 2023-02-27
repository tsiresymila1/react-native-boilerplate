export type MessageDataType = {
    conversationId?: string | number,
    content?: string,
    files: MesssageFile[]
}

export type MesssageFile = {
    uri?: string,
    type?: string,
    name?: string

}