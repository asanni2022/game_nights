import DeleteEventButton from "./DeleteEventButton"
import LeaveEventButton from "./LeaveEventButton"
import JoinEventButton from "./JoinEventButton"
import InviteButton from "./InviteEventButton"


function EventDetailButtons({user, eventDetail, setDeleteChannelInformation, setJoinEventInformation, setLeaveChannelInformation, attending}) {

    if (eventDetail.owner_id === user.pk) {
        return(
            <>
              <DeleteEventButton setDeleteChannelInformation={setDeleteChannelInformation} eventDetail={eventDetail}/>
              <InviteButton eventDetail={eventDetail} />
            </>
        )

    }
    else {
        // if user is not the event onwer they can leave
        if (attending) {
          return(
              <LeaveEventButton setLeaveChannelInformation={setLeaveChannelInformation} eventDetail={eventDetail}/>
          )}
        else {
          return(
              <JoinEventButton eventDetail={eventDetail} setJoinEventInformation={setJoinEventInformation}/>
          )}
    }

}

export default EventDetailButtons