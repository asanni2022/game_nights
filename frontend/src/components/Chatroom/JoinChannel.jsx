// will need to set up a function that when a user accepts a "group friend request" then first we create a channel for the group and then we add that member to it.
                    
                    // const groupChannel = client.channel('messaging', {
                        //     name: 'group_name Chatroom'
                        //   });
                    // channel.addMembers([user.id])

import { useChatContext } from "stream-chat-react"



// will need to pass in the name or the id
const joinChannel = async(name) => {
    const {client} = useChatContext();
    const response = await client.queryChannels();
    const filteredChannel = response.filter((c)=> c.name === name);
    filteredChannel.addMembers([client.user.id])
}

export default joinChannel


// Join channel:
// ~41:00 in the video
// const joinChannel = (id) => {
//     const channel = channels.find( c=> c.id ===id)
//     channel.addMembers([client.user.id])
// }